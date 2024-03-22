import React from 'react'
import { useState, useEffect } from 'react'
import Recette from './Recette';


export default function FavRecette() {
    const storedToken = localStorage.getItem("token");
    const token = JSON.parse(storedToken);
    const [recettes, setRecettes] = useState([]);

    useEffect(() => {
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