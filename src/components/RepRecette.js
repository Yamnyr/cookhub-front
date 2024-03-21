import React, { useState, useEffect } from 'react';
import Recette from './Recette';
import { MenuItem, Select, TextField } from "@mui/material";

export default function RepRecette() {
    const [recettes, setRecettes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/recette/getall')
            .then(response => response.json())
            .then(data => {
                setRecettes(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
        fetch('http://localhost:8000/region/getall')
            .then(response => response.json())
            .then(data => {
                setRegions(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };

    // Filtrer les recettes en fonction du terme de recherche et de la région sélectionnée
    const filteredRecettes = recettes.filter(recette =>
        recette.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (region === '' || recette.id_region === region)
    );

    return (
        <>
            <div className='accueil'>
                <h1>Bienvenue sur CookHub</h1>
                <p>CookHub est une plateforme en ligne dédiée à la cuisine et au partage de recettes entre passionnés.</p>
                <p>Sur CookHub, vous pouvez découvrir une multitude de recettes provenant de cuisiniers amateurs et professionnels du monde entier.</p>
                <p>Grâce à son aspect communautaire, les membres peuvent partager leurs propres créations culinaires, échanger des astuces et des conseils, ainsi que commenter et évaluer les recettes des autres.</p>
                <p>Que vous soyez un novice en cuisine ou un chef expérimenté, CookHub est l'endroit parfait pour explorer de nouvelles saveurs et inspirations culinaires.</p>
            </div>

            <div>
                <TextField
                    fullWidth={true}
                    placeholder="Rechercher une recette par son nom..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <Select
                    fullWidth={true}
                    label="Région"
                    variant="outlined"
                    className={"textField"}
                    value={region}
                    onChange={handleRegionChange}
                >
                    <MenuItem value="">Toutes les régions</MenuItem>
                    {regions.map((region) => (
                        <MenuItem key={region.id} value={region.id}>{region.nom}</MenuItem>
                    ))}
                </Select>
                <div className={"liste-recette"}>
                    {filteredRecettes.map(recette => (
                        <Recette key={recette.id} data={recette} />
                    ))}
                </div>
            </div>
        </>
    );
}
