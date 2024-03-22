import React from 'react'
import {useState, useEffect} from 'react'
import Recette from './Recette';


export default function MesRecettes() {

    const storedToken = localStorage.getItem("token");

    const token = (JSON.parse(storedToken));
    const [recettes, setRecettes] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/recette/getmyrecette',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
            .then(response => response.json())
            .then(data => {
                setRecettes(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
  return (
      <>
          <h1>Mes recettes</h1>
          <div className={"liste-recette"}>
              {recettes.map(recette => (
                  <Recette key={recette.id} data={recette}/>
              ))}
          </div>
      </>
  )
}
