import React from 'react'
import { useState, useEffect } from 'react'
import Recette from './Recette';
import { useNavigate } from "react-router-dom";


export default function MesRecettes() {

    const storedToken = localStorage.getItem("token");

    const navigate = useNavigate();
    const token = (JSON.parse(storedToken));
    const [recettes, setRecettes] = useState([])
    useEffect(() => {

        //verifie via l'api que l'utilisateur est bien connecté puis recupère toutes les recettes dont l'utilisateur connecté est l'auteur
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
                    fetch('http://localhost:8000/recette/getmyrecette', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
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
    return (
        <>
            <h1>Mes recettes</h1>
            <div className={"liste-recette"}>
                {recettes.map(recette => (
                    <Recette key={recette.id} data={recette} />
                ))}
            </div>
        </>
    )
}
