import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'; // Importez useParams pour récupérer les paramètres de l'URL
import { useMyContext } from "./TokenProvider";

export default function EditRecette() {
    const navigate = useNavigate();

    const storedToken = localStorage.getItem("token");
    const token = (JSON.parse(storedToken));
    const { id } = useParams(); // Récupérez l'ID de la recette depuis les paramètres de l'URL
    const [recette, setRecette] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    // Charge les détails de la recette à modifier lors du premier rendu
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

                }
            } catch (error) {
                setErrorMessage(error.message);
            }
        }
        check()
        const fetchRecette = async () => {
            try {
                const response = await fetch(`http://localhost:8000/recette/getById/${id}`, { // Utilisez l'ID de la recette dans l'URL de l'API
                    method: 'GET',
                    headers: {
                        'Authorization': token
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }

                const recetteData = await response.json();
                setRecette(recetteData);
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        fetchRecette();
    }, [id, token]); // Ajoutez id comme dépendance

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/recette/${id}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(recette),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            navigate('/recettes'); // retour sur la page 'recettes' avec les modifications apportées
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <div className={"cadreForm"}>
                <Typography className={"h5"} variant="h3 white">modifier dette recette</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        focused
                        fullWidth={true}
                        label="Nom de la recette"
                        variant="outlined"
                        className={"textField"}
                        value={recette.nom || ''}
                        onChange={(e) => setRecette({ ...recette, nom: e.target.value })}
                    />
                    <TextField
                        focused
                        fullWidth={true}
                        label="Préparation"
                        multiline
                        rows={4}
                        variant="outlined"
                        className={"textField"}
                        value={recette.preparation || ''}
                        onChange={(e) => setRecette({ ...recette, preparation: e.target.value })}
                    />
                    <TextField
                        focused
                        fullWidth={true}
                        label="Ingrédients"
                        multiline
                        rows={4}
                        variant="outlined"
                        className={"textField"}
                        value={recette.ingrediants || ''}
                        onChange={(e) => setRecette({ ...recette, ingrediants: e.target.value })}
                    />
                    <Button
                        fullWidth={true}
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className={"button"}
                    >
                        Enregistrer les modifications
                    </Button>
                </form>
                {errorMessage && <Typography variant="body1" color="error">{errorMessage}</Typography>}
            </div>
        </>
    );
}
