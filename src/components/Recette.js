// import React from 'react'




import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { FaRegEye } from "react-icons/fa";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

export default function Recette({ data }) {

  const { id, nom, preparation, ingredients, id_typeplat, idRegion } = data;

  return (
    <>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Link to={'/favrecettes'}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </Link>
            <Link to={`/showrecette/${id}`} className='plusdetails'>
              <IconButton aria-label="add to favorites" >
                <h6>Plus de détails</h6>
                <FaRegEye />
              </IconButton>
            </Link>
          </CardActions>
        </Card>
    </>
  );
}