import React from 'react'
import {useState, useEffect} from 'react'
import Recette from './Recette';


export default function RepRecette() {

  const [recette, setRecette] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/recette/getall')
        .then(response => response.json())
        .then(data => {
            setRecette(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}, []);

console.log(recette)

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
        <Recette data={recette}>
        </Recette>
        </div>
    </>
  )
}
