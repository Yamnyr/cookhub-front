// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { FaRegEye } from "react-icons/fa";
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { Link } from 'react-router-dom';

// export default function Recette({ data }) {

//   const { id, nom, id_typeplat, id_region } = data;

//   return (
//     <div className='recette'>
//       <Card sx={{ maxWidth: 425 }} className='card'>
//         <div className='cardheader'>
//           {nom}
//         </div>
//         {/* <CardMedia className='cardmedia'
//             component="img"
//             height="194"
//             image="/static/images/cards/paella.jpg"
//             alt="image"
//           /> */}
//         <div className='cardcontent'>
//           {id_typeplat} | {id_region}
//         </div>
//         <div className='cardaction'>
// <Link to={'/favrecettes'} className='addfavorite'>
//   <IconButton>
//     <FavoriteIcon />
//     <h6>Ajouter aux favoris</h6>
//   </IconButton>
// </Link>
// <Link to={`/showrecette/${id}`} className='plusdetails'>
//   <IconButton>
//     <h6>Détails</h6>
//     <FaRegEye />
//   </IconButton>
// </Link>
//         </div>
//       </Card>
//     </div>
//   );
// }

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

  const { id, nom, preparation, ingrediants, id_auteur, id_typeplat, id_region } = data;

  const formattedIngredients = Object.keys(ingrediants).map(key => (
    <Typography key={key} variant="body2" color="text.secondary">
      {key}: {ingrediants[key]}
    </Typography>
  ));

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
        <Link to={'/favrecettes'} className='addfavorite'>
          <IconButton>
            <FavoriteIcon />
            <h6>Ajouter aux favoris</h6>
          </IconButton>
        </Link>
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