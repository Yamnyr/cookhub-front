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
    };


    return (
        <MyContext.Provider value={{ token, addToken }}>
            {children}
        </MyContext.Provider>
    );
}

export const useMyContext = () => useContext(MyContext);
