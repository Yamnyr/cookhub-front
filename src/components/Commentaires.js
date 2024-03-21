import React from 'react'
import { useState, useEffect } from 'react'
import { Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {MdDelete} from "react-icons/md";


export default function Commentaires({ data }) {

    const [input, setInput] = useState("");
    const [commentaires, setCommentaires] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/recette/${data}/commentaires`)
            .then(response => response.json())
            .then(data => {
                setCommentaires(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleInputChange = (event) => {
        setInput(event.target.value);                 // Mettre à jour la valeur de l'input
    };

    const addCommentaire = () => {
        if (input.trim() !== "") {
            console.log('commentaire ajouté')// Effacer l'input après l'ajout
        }
    };

    const removeCommentaire = (indexToRemove) => {
        // Retrouve le to do dans la liste des todos via l'index et l'extrait de la liste des todos avec filter
        const updatedCommentaires = commentaires.filter((_, index) => index !== indexToRemove);
        setCommentaires(updatedCommentaires);
    };

    return (
        <>
            <div className={"container"}>
                <h1>Commentaires</h1>
                <div className={"input"}>
                    <TextField
                        className={"textfield"}
                        // color={"noe"}
                        focused
                        fullWidth
                        id="outlined-basic"
                        // label="Outlined"
                        // variant="outlined"
                        value={input}

                        onChange={handleInputChange} // Utiliser la fonction de gestionnaire d'événements pour mettre à jour l'input
                        inputProps={{ style: { color: '#edf2f4' } }}
                    />
                    <Button
                        className={"valid"}
                        variant="contained"
                        onClick={addCommentaire} // Utiliser la fonction d'ajout de todo
                    ><AddIcon />
                        ajouter
                    </Button>
                </div>


                <div>
                    {commentaires.map((commentaire, index) => (
                        <div className="row" key={index}>
                            <div key={index}>{commentaire.message}</div>
                            <Button
                                className={"delete"}
                                variant="contained"
                                onClick={() => removeCommentaire(index)} // Utiliser la fonction de suppression de commentaire
                            >
                                <MdDelete />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
