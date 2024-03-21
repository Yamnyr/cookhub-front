import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from "@mui/material/CardActions";
import Commentaires from "./Commentaires";

function ShowRecette() {
    const { id } = useParams();
    const [recette, setRecette] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/recette/getbyid/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération du recette');
                }
                return response.json();
            })
            .then(data => {
                setRecette(data);
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    }, [id]);

    if (!recette) {
        return <div>Chargement en cours...</div>;
    }

    // Convertir l'objet d'ingrédients en tableau pour le parcourir
    const ingredientList = Object.entries(recette.ingrediants);

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
            <Card sx={{ maxWidth: 500, margin: "auto" }}>
                <CardMedia
                    component="img"
                    alt="Image du recette"
                    width="500"
                    image={recette.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <h3>{recette.nom}</h3>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <ul>
                            {ingredientList.map(([ingredient, quantity]) => (
                                <li key={ingredient}>
                                    {ingredient}: {quantity}
                                </li>
                            ))}
                        </ul>
                    </Typography>
                    <CardActions>
                        <Typography variant="body2" color="text.secondary">
                            <span className={"prixb"}>{recette.prix} </span>
                        </Typography>
                    </CardActions>
                </CardContent>
            </Card>
            <Commentaires data = {recette.id}/>
        </div>
    );
}

export default ShowRecette;
