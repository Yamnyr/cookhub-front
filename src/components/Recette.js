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
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { red } from "@mui/material/colors";

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
  const { id, nom, image, preparation, ingrediants, id_auteur, id_typeplat, id_region, createdAt } = data;
  const formattedDate = new Date(createdAt).toISOString().split('T')[0];
  const [auteur, setAuteur] = useState(null);
  const [region, setRegion] = useState(null);
  const [type, setType] = useState(null);

  const storedToken = localStorage.getItem("token");
  const token = (JSON.parse(storedToken));

  //component affichant une recette a l'unite ce components est utilisé dans de multiple boucle dès lors qu'il est neccessaire d'afficher une liste de recettes

  useEffect(() => {
    //Récupère via l'api la liste des recettes en que l'utilisateur connecté a mis en favoris pour, par la suite les comparer avec là recette actuelle
    // et donc set ou non la variable d'état (Favorited) qui permet d'afficher ou non un coeur vert (en favoris) ou un coeur s gris (pas en favoris)
    fetch('http://localhost:8000/recette/favoris', {
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
        if (favorisIds.includes(id)) {
          setFavorited(true); // Si oui, marquer comme favori
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {

    if (id_region) {
      //permet de recupérer le nom de la region de la recette
      fetch(`http://localhost:8000/region/getbyid/${id_region}`)
        .then(response => response.json())
        .then(data => {
          setRegion(data);
        })
        .catch(error => {
          console.error('Error fetching region data:', error);
        });
    }

    if (id_typeplat) {
      //permet de recupérer le nom du type de plat de la recette
      fetch(`http://localhost:8000/typeplat/getbyid/${id_typeplat}`)
        .then(response => response.json())
        .then(data => {
          setType(data);
        })
        .catch(error => {
          console.error('Error fetching region data:', error);
        });
    }
    if (id_auteur) {

      //permet de recupérer le nom et le prenom de l'utilisateur ayant créer la recette
      fetch(`http://localhost:8000/utilisateur/getbyid/${id_auteur}`)
        .then(response => response.json())
        .then(data => {
          setAuteur(data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [id_region]);

  //ajoute la reccette au favorui de l'utilisateur
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
    <Card className={"card-dark"} sx={{ width: 300 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {auteur && (
              `${auteur.nom}`
            )}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">

            {/*<MoreVertIcon*/}
            {/*    color='primary'/>*/}
          </IconButton>
        }
        title={nom}
        subheader={auteur && (
          `${formattedDate}  |  ${auteur.nom} ${auteur.prenom}`
        )}

      />
      <CardMedia sx={{ height: 200 }} className='imageCarte'
        component="img"
        image={image}
        alt={data.nom}
      />
      <CardContent>
          <Typography variant="body2" color="text.secondary">
              {region ? region.nom : ''} | {type ? type.nom : ''}

          </Typography>
          <Typography variant="body2" color="text.secondary">

              {ingrediants}
          </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <IconButton onClick={handleAddToFavorites}>
          <FavoriteIcon fontSize="large" color={favorited ? 'secondary' : 'primary'} />
          {/*<h6>{favorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}</h6>*/}
        </IconButton>
        <Link to={`/showrecette/${id}`} className='plusdetails'>
          <IconButton className={"white"}>
            {/* Utilisation de la classe personnalisée pour l'icône */}
            <FaRegEye className="icon-large" />
          </IconButton>
        </Link>
        <Link to={`/editrecette/${id}`} className='plusdetails'>
          <IconButton className={"white"}>
            {/* Utilisation de la classe personnalisée pour l'icône */}
            <BuildCircleIcon className="icon-large" />
          </IconButton>
        </Link>

        <ExpandMore
          color='primary'
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
          <Typography paragraph>Preparation :</Typography>
          <Typography paragraph>
            {preparation}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}