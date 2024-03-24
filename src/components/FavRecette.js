import React from 'react'
import { useState, useEffect } from 'react'
import Recette from './Recette';
import { useNavigate } from "react-router-dom";


export default function FavRecette() {
    const storedToken = localStorage.getItem("token");
    const token = JSON.parse(storedToken);
    const [recettes, setRecettes] = useState([]);
    const navigate = useNavigate();


    //Vérifie que l'utilisateur est bien connecté puis récupéré toutes les recettes que l'utilisateur a mises en favoris
    useEffect(() => {
        const check = async () => {
            try {
                const response = await fetch('http://localhost:8000/recette/checkUser', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                });
                console.log(response)
                if (response.status === 401) {
                    navigate("/login");
                }
                else {
                    fetch('http://localhost:8000/recette/favoris', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Fetched data:', data);
                            setRecettes(data);
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                }
            } catch (error) {
            }
        }
        check()

    }, []);

    console.log('Recettes:', recettes);

    return (
        <>
            <h1>Favoris</h1>
            <div className={"liste-recette"}>
                {recettes.map(recette => (
                    <Recette key={recette.id} data={recette.recette} />
                ))}
            </div>
        </>
    );
}