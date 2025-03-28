
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, MenuItem, Select } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function AjoutRecette() {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [preparation, setPreparation] = useState('');
    const [ingrediants, setIngrediants] = useState('');
    const [image, setImage] = useState('');
    const [typePlat, setTypePlat] = useState('');
    const [region, setRegion] = useState('');
    const [regions, setRegions] = useState([]);
    const [typesPlat, setTypesPlat] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const storedToken = localStorage.getItem("token");
    const token = (JSON.parse(storedToken));


    useEffect(() => {
        //verifie que l'utilisateur est bien connecté avec un token valide
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

        //récupère la liste de toutes les region de la bdd pour plus tard en faire un menu deroulabt dans le rendu
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


        //récupère la liste de toutes les types de plat  de la bdd pour plus tard en faire un menu deroulabt dans le rendu
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


    //envoi un requete à l'api qui rajoute une recette à la bdd
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
                    image: image,
                    id_typeplat: typePlat,
                    id_region: region
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            // Ici, vous pouvez gérer la réponse de la requête, par exemple, afficher un message de succès
            // console.log('Recette ajoutée avec succès');

            navigate('/recettes');
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
                    <TextField
                        focused
                        fullWidth={true}
                        label="Image"
                        multiline
                        rows={4}
                        variant="outlined"
                        className={"textField"}
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <Select
                        focused
                        fullWidth={true}
                        label="Région"
                        variant="outlined"
                        className={"textField"}
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    >
                        {regions.map((region) => (
                            <MenuItem key={region.id} value={region.id} className='menuRegion'>{region.nom}</MenuItem>
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
                            <MenuItem key={typePlat.id} value={typePlat.id} className='menuType'>{typePlat.nom}</MenuItem>
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
