import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from "@mui/material/CardActions";
import Commentaires from "./Commentaires";
import {Grid} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";

function ShowRecette() {
    const { id } = useParams();
    const [recette, setRecette] = useState(null);
    const [utilisateur, setUtilisateur] = useState(null);
    const [region, setRegion] = useState(null);
    const [favorited, setFavorited] = useState(false);
    // const [follow, setFollow] = useState(false);
    const storedToken = localStorage.getItem("token");
    const token = (JSON.parse(storedToken));

    const [type, setType] = useState(null);


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

    useEffect(() => {
        fetch('http://localhost:8000/recette/favoris',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
            .then(response => response.json())
            .then(data => {
                // Extraire les identifiants des favoris
                const favorisIds = data.map(favori => favori.id_recette);
                console.log(id)
                console.log(favorisIds)

                console.log(favorited)
                if (favorisIds.includes(id)) {
                    setFavorited(true); // Si oui, marquer comme favori
                }
                console.log(favorited)
            //TODO://????
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const handleAddToFavorites = async () => {
        const storedToken = localStorage.getItem("token");
        const token = JSON.parse(storedToken);

        try {
            const response = await fetch(`http://localhost:8000/recette/${id}/favori`, {
                method: 'GET',
                headers: {
                    'Authorization': token
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            setFavorited(!favorited);
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    useEffect(() => {
        if (recette && recette.id_region) {
            fetch(`http://localhost:8000/region/getbyid/${recette.id_region}`)
                .then(response => response.json())
                .then(data => {
                    setRegion(data);
                })
                .catch(error => {
                    console.error('Error fetching region data:', error);
                });
        }

        if (recette && recette.id_typeplat) {
            fetch(`http://localhost:8000/typeplat/getbyid/${recette.id_typeplat}`)
                .then(response => response.json())
                .then(data => {
                    setType(data);
                })
                .catch(error => {
                    console.error('Error fetching region data:', error);
                });
        }



        if (recette && recette.id_auteur) {
            fetch(`http://localhost:8000/utilisateur/getbyid/${recette.id_auteur}`)
                .then(response => response.json())
                .then(data => {
                    setUtilisateur(data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [recette]);

    if (!recette) {
        return <div>Chargement en cours...</div>;
    }

    const formattedDate = new Date(recette.createdAt).toISOString().split('T')[0];

    return (
        <div className={"container"}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height={"500px"}
                            // className={classes.image}
                            image={recette.image} // Remplacez recipe.image par l'URL de votre image
                            alt={recette.nom} // Remplacez recipe.nom par le nom de votre recette
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} >
                    <Card className={"info"}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                <h3>
                                    {recette.nom}
                                    <IconButton onClick={handleAddToFavorites}>
                                    <FavoriteIcon fontSize="large" color={favorited ? 'secondary' : 'primary'} />
                                    </IconButton>
                                </h3>
                                {utilisateur && (
                                    <p>
                                        {/*{utilisateur.nom} {utilisateur.prenom}*/}
                                        {formattedDate} Créé par :  {utilisateur.nom} {utilisateur.prenom}
                                    </p>
                                )}
                                {/*<IconButton onClick={handleFollow}>*/}
                                {/*    <FavoriteIcon fontSize="large" color={follow ? 'secondary' : 'primary'} />*/}
                                {/*</IconButton>*/}
                            </Typography>

                            <Typography variant="body2" color="textSecondary">
                                <p>{recette.ingrediants}</p>
                                <p>{recette.preparation}</p>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Commentaires data = {recette.id}/>
            </Grid>
        </div>
    );
}

export default ShowRecette;
