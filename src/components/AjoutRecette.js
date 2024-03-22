
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, MenuItem, Select } from '@mui/material';
import { useMyContext } from "./TokenProvider";

export default function AjoutRecette() {
    // const { token } = useMyContext();
    const [nom, setNom] = useState('');
    const [preparation, setPreparation] = useState('');
    const [ingrediants, setIngrediants] = useState('');
    const [typePlat, setTypePlat] = useState('');
    const [region, setRegion] = useState('');
    const [regions, setRegions] = useState([]);
    const [typesPlat, setTypesPlat] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const storedToken = localStorage.getItem("token");
    const token = (JSON.parse(storedToken));

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await fetch('http://localhost:8000/region/getall', {
                    method: 'GET',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }

                const regionsData = await response.json();
                setRegions(regionsData);
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        const fetchTypesPlat = async () => {
            try {
                const response = await fetch('http://localhost:8000/typeplat/getall', {
                    method: 'GET',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }

                const typesPlatData = await response.json();
                setTypesPlat(typesPlatData);
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        fetchRegions();
        fetchTypesPlat();
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/recette/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    nom,
                    preparation,
                    ingrediants,
                    id_typeplat: typePlat,
                    id_region: region
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            // Ici, vous pouvez gérer la réponse de la requête, par exemple, afficher un message de succès
            console.log('Recette ajoutée avec succès');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <div className={"cadreForm"}>
                <Typography className={"h5"} variant="h3 white">Ajouter une recette</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        focused
                        fullWidth={true}
                        label="Nom de la recette"
                        variant="outlined"
                        className={"textField"}
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                    <TextField
                        focused
                        fullWidth={true}
                        label="Préparation"
                        multiline
                        rows={4}
                        variant="outlined"
                        className={"textField"}
                        value={preparation}
                        onChange={(e) => setPreparation(e.target.value)}
                    />
                    <TextField
                        focused
                        fullWidth={true}
                        label="Ingrédients"
                        multiline
                        rows={4}
                        variant="outlined"
                        className={"textField"}
                        value={ingrediants}
                        onChange={(e) => setIngrediants(e.target.value)}
                    />
                    <Select
                        fullWidth={true}
                        label="Région"
                        variant="outlined"
                        className={"textField"}
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    >
                        {regions.map((region) => (
                            <MenuItem key={region.id} value={region.id}>{region.nom}</MenuItem>
                        ))}
                    </Select>
                    <Select
                        focused
                        fullWidth={true}
                        label="Type de plat"
                        variant="outlined"
                        className={"textField"}
                        value={typePlat}
                        onChange={(e) => setTypePlat(e.target.value)}
                    >
                        {typesPlat.map((typePlat) => (
                            <MenuItem key={typePlat.id} value={typePlat.id}>{typePlat.nom}</MenuItem>
                        ))}
                    </Select>
                    <Button
                        fullWidth={true}
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className={"button"}
                    >
                        Ajouter la recette
                    </Button>
                </form>
                {errorMessage && <Typography variant="body1" color="error">{errorMessage}</Typography>}
            </div>
        </>
    );
}
