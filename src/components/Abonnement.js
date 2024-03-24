import React from 'react'
import { useState, useEffect } from 'react'
import Recette from './Recette';
import {useNavigate} from "react-router-dom";


export default function Abonnement() {
    const storedToken = localStorage.getItem("token");
    const token = JSON.parse(storedToken);
    const [recettes, setRecettes] = useState([]);
    const navigate = useNavigate();

    // apres avoir verifié que l'utilisateur est connecté récupère la liste des recettes créées par les utilisateurs à qui l'utilisateur connecté s'est abonné
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
                    fetch('http://localhost:8000/recette/follow', {
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
    //boucle sur la liste des recettes récupérées
    return (
        <>
            <h1>Mes abonnements</h1>
            <div className={"liste-recette"}>
                {Array.isArray(recettes) && recettes.map(recette => (
                    <Recette key={recette.id} data={recette} />
                ))}
            </div>
        </>
    );
}