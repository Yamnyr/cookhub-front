import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FaRegEye } from "react-icons/fa";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import {useEffect, useState} from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;

  return <IconButton {...other} />;
        })(({ theme, expand }) => ({
          transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
          marginLeft: 'auto',
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
          }),
        }));



export default function Recette({ data }) {
  const [expanded, setExpanded] = React.useState(false);
  const [favorited, setFavorited] = useState(false);
  const [favoris, setFavoris] = useState([]);
  const { id, nom, preparation, ingrediants, id_auteur, id_typeplat, id_region } = data;

  const storedToken = localStorage.getItem("token");
  const token = (JSON.parse(storedToken));

  const formattedIngredients = Object.keys(ingrediants).map(key => (
    <Typography key={key} variant="body2" color="text.secondary">
      {key}: {ingrediants[key]}
    </Typography>
  ));

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
                setFavoris(favorisIds);
                console.log(favorisIds)
                // Vérifier si l'ID de la recette est présent dans la liste des favoris
                if (favorisIds.includes(id)) {
                    setFavorited(true); // Si oui, marquer comme favori
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleAddToFavorites = async () => {
        const storedToken = localStorage.getItem("token");

        const token = (JSON.parse(storedToken));
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


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        
        action={
          <IconButton aria-label="settings">
            
            <MoreVertIcon />
          </IconButton>
        }
        title={nom}
        subheader={`September 14, 2016 Créé par : ${id_auteur}`}
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <p>{id_region} | {id_typeplat}</p>
          {formattedIngredients}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <IconButton onClick={handleAddToFavorites}>
              <FavoriteIcon color={favorited ? 'secondary' : 'action'} />
              {/*<h6>{favorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}</h6>*/}
          </IconButton>
        <Link to={`/showrecette/${id}`} className='plusdetails'>
          <IconButton>
            <h6>Détails</h6>
            <FaRegEye />
          </IconButton>
        </Link>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Preparation:</Typography>
          <Typography paragraph>
            {preparation}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}