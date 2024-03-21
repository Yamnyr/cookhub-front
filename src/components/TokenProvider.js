import React, { createContext, useContext, useState, useEffect } from "react";

export const MyContext = createContext({});
export function TokenProvider({ children }) {
    const [token, setToken] = useState([]);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(JSON.parse(storedToken));
        }
    }, []);

    const addToken = (newToken) => {
        setToken(newToken)
        localStorage.setItem("token", JSON.stringify(newToken));
        // const existingItemIndex = cart.findIndex(item => item.name === newItem.name);

        // if (existingItemIndex !== -1) {
        //     const updatedCart = [...cart];
        //     updatedCart[existingItemIndex].quantity += 1;
        //     setCart(updatedCart);
        //     localStorage.setItem("cart", JSON.stringify(updatedCart));
        // } else {
        //     const newCartItem = { ...newItem, quantity: 1 };
        //     setCart(prevCart => [...prevCart, newCartItem]);
        //     localStorage.setItem("cart", JSON.stringify([...cart, newCartItem]));
        // }
    };


    // const addToCart = (newItem) => {
    //     const existingItemIndex = cart.findIndex(item => item.name === newItem.name);
    //
    //     if (existingItemIndex !== -1) {
    //         const updatedCart = [...cart];
    //         updatedCart[existingItemIndex].quantity += 1;
    //         setCart(updatedCart);
    //         localStorage.setItem("cart", JSON.stringify(updatedCart));
    //     } else {
    //         const newCartItem = { ...newItem, quantity: 1 };
    //         setCart(prevCart => [...prevCart, newCartItem]);
    //         localStorage.setItem("cart", JSON.stringify([...cart, newCartItem]));
    //     }
    // };
    //
    // const removeFromCart = (itemToRemove) => {
    //     const updatedCart = cart.filter(item => item.name !== itemToRemove.name);
    //     setCart(updatedCart);
    //     localStorage.setItem("cart", JSON.stringify(updatedCart));
    // };
    //
    // const subtractFromCart = (itemToSubtract) => {
    //     const existingItemIndex = cart.findIndex(item => item.name === itemToSubtract.name);
    //
    //     if (existingItemIndex !== -1) {
    //         const updatedCart = [...cart];
    //         updatedCart[existingItemIndex].quantity -= 1;
    //         if (updatedCart[existingItemIndex].quantity <= 0) {
    //             updatedCart.splice(existingItemIndex, 1); // Remove item if quantity becomes zero
    //         }
    //         setCart(updatedCart);
    //         localStorage.setItem("cart", JSON.stringify(updatedCart));
    //     }
    // }


    return (
        <MyContext.Provider value={{ token, addToken }}>
            {children}
        </MyContext.Provider>
    );
}

export const useMyContext = () => useContext(MyContext);
