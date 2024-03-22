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
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
    };
    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };

    // Filtrer les recettes en fonction du terme de recherche et de la région sélectionnée
    const filteredRecettes = recettes.filter(recette =>
        (recette.nom.toLowerCase().includes(searchTerm) || recette.ingrediants.toLowerCase().includes(searchTerm)) &&
        (region === '' || recette.id_region === region)
    );

    return (
        <>
            <div  className={"cadreFilter"}>
                <TextField
                    fullWidth={true}
                    placeholder="Rechercher une recette par son nom / ingrediants"
                    value={searchTerm}
                    onChange={handleSearch}
                    color={"secondary"}
                    sx={{ bgcolor: '#FBF5F3', marginBottom: '20px' }} // Changez 'blue' par la couleur de fond souhaitée
                />

                <Select
                    fullWidth={true}
                    label="Région"
                    variant="outlined"
                    className={"textField"}
                    value={region}
                    onChange={handleRegionChange}
                    color={"secondary"}
                    sx={{ bgcolor: '#FBF5F3'}} // Changez 'blue' par la couleur de fond souhaitée
                >
                    <MenuItem value="" sx={{ bgcolor: '#FBF5F3' }} color="secondary" focused>
                        Toutes les régions
                    </MenuItem>
                    {regions.map((region) => (
                        <MenuItem
                            color="secondary"
                            focused
                            key={region.id}
                            value={region.id}
                            sx={{ bgcolor: '#FBF5F3' }} // Changez 'blue' par la couleur de fond souhaitée
                        >
                            {region.nom}
                        </MenuItem>
                    ))}
                </Select>

            </div>
            <div className={"liste-recette"}>
                {filteredRecettes.map(recette => (
                    <Recette key={recette.id} data={recette} />
                ))}
            </div>
        </>
    );
}
