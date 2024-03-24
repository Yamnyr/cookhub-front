import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Commentaires from "./Commentaires";
import { Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function ShowRecette() {
    const navigate = useNavigate(); // Utiliser useNavigate pour la redirection
    const { id } = useParams();
    const [recette, setRecette] = useState(null);
    const [utilisateur, setUtilisateur] = useState(null);
    const [region, setRegion] = useState(null);
    const [favorited, setFavorited] = useState(false);
    const [follow, setFollow] = useState(false);
    const storedToken = localStorage.getItem("token");
    const token = (JSON.parse(storedToken));

    const [type, setType] = useState(null);

    //recupère les infos de la recette selectionné
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


    //Récupère via l'api la liste des recettes en que l'utilisateur connecté a mis en favoris pour, par la suite les comparer avec là recette actuelle
    // et donc set ou non la variable d'état (Favorited) qui permet d'afficher ou non un coeur vert (en favoris) ou un coeur s gris (pas en favoris)
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
                const favorisIds = data.map(favori => favori.id_recette.toString()); // Convertir en chaînes de caractères si nécessaire
                // console.log(id, favorisIds);

                if (favorisIds.includes(id.toString())) { // Assurez-vous que id et favorisIds ont le même type de données
                    setFavorited(true); // Si oui, marquer comme favori
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    useEffect(() => {
        fetch('http://localhost:8000/recette/follow', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
            .then(response => response.json())
            .then(data => {
                const followIds = data.map(follow => follow.id_abonnement.toString()); // Convertir en chaînes de caractères si nécessaire
                console.log(id, followIds);

                if (followIds.includes(id.toString())) { // Assurez-vous que id et favorisIds ont le même type de données
                    setFollow(true); // Si oui, marquer comme favori
                }
            })
            .catch(error => {
                // console.error('Error fetching data:', error);
            });
    }, []);


    //requete api supprimant la recette dans le cas ou l'utilisateur est bien le propriétaire de cette recette
    const deleteRecette = async () => {
        const storedToken = localStorage.getItem("token");
        const token = (JSON.parse(storedToken));
        try {
            const response = await fetch(`http://localhost:8000/recette/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            navigate('/recettes')

        } catch (error) {
            console.error('Error deleting recette:', error);
        }
    };

    //ajoute la recette aux favoris de l'utilisateur

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


    //ajoute l'auteyr de la recette aux abonnements de l'utilisateur
    const handleFollow = async () => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            // Gérer le cas où l'utilisateur n'est pas connecté
            return;
        }

        const token = JSON.parse(storedToken);

        try {
            const response = await fetch(`http://localhost:8000/utilisateur/${recette.id_auteur}/suivre`, {
                method: 'GET',
                headers: {
                    'Authorization': token
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            setFollow(!follow);
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    //recupère la region de la recette pour afficher son nom dans le rendu
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


        //recupère le type de plat de la recette pour afficher son nom dans le rendu
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



        //recupère l'auteur de la recette pour afficher son nom et son prenom dans le rendu
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
                                {recette.nom}
                                <IconButton onClick={handleAddToFavorites}>
                                    <FavoriteIcon fontSize="large" color={favorited ? 'secondary' : ''} />
                                </IconButton>
                                <IconButton onClick={deleteRecette}>
                                    <DeleteIcon fontSize="large" />
                                </IconButton>
                            </Typography>

                            <Typography variant="subtitle1" color="textSecondary">
                                {region ? region.nom : ''} | {type ? type.nom : ''}
                                {utilisateur && (
                                    <>
                                        <br />
                                        {formattedDate} Créé par :  {utilisateur.nom} {utilisateur.prenom}
                                    </>
                                )}
                                <IconButton onClick={handleFollow}>
                                    <PersonAddIcon fontSize="large" color={follow ? 'secondary' : ''} />
                                </IconButton>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {recette.ingrediants}
                                <br />
                                {recette.preparation}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Commentaires data={recette.id} />
            </Grid>
        </div>
    );
}

export default ShowRecette;
