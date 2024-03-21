import React from 'react'
import {useState, useEffect} from 'react'
import Recette from './Recette';


export default function MesRecettes() {

    const [recette, setRecette] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/recette/getmyrecette')
            .then(response => response.json())
            .then(data => {
                setRecette(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
  return (
    <>
        MesRecettes
    </>
  )
}
