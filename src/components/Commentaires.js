import React, { useState, useEffect } from 'react';
import { Button, Rating, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { MdDelete } from "react-icons/md";
import Typography from "@mui/material/Typography";
import Commentaire from "./Commentaire";
// import { useMyContext } from "./TokenProvider";

export default function Commentaires({ data }) {
    const storedToken = localStorage.getItem("token");
    const token = (JSON.parse(storedToken));
    const [message, setMessage] = useState('');
    const [note, setNote] = useState(0);
    const [commentaires, setCommentaires] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

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
        setMessage(event.target.value);
    };

    const addCommentaire = async () => {
        try {
            const response = await fetch(`http://localhost:8000/recette/${data}/commenter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    message,
                    note
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            // Rafraîchir la liste des commentaires après l'ajout
            fetch(`http://localhost:8000/recette/${data}/commentaires`)
                .then(response => response.json())
                .then(data => {
                    setCommentaires(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

            // Effacer le champ de saisie après l'ajout
            setMessage('');
            setNote(0);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    // const removeCommentaire = async (index) => {
    //     try {
    //         const response = await fetch(`http://localhost:8000/recette/${data}/commentaires/${index}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': token
    //             },
    //         });
    //
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(errorData.message);
    //         }
    //
    //         // Rafraîchir la liste des commentaires après la suppression
    //         fetch(`http://localhost:8000/recette/${data}/commentaires`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 setCommentaires(data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching data:', error);
    //             });
    //     } catch (error) {
    //         setErrorMessage(error.message);
    //     }
    // };

    return (
        <>
            <div className={"container"}>
                <h2 className={"white"}>Ajouter un commentaires</h2>
                <Rating
                    name="size-large"
                    defaultValue={note}
                    size="large"
                    onChange={(event, value) => setNote(value)}
                    sx={{
                        '& .MuiRating-iconEmpty': {
                            color: '#FBF5F3', // Couleur des étoiles vides
                        }, marginBottom: '16px',
                    }}
                />
                <TextField
                    fullWidth={true}
                    placeholder="Ajouter un commentaire."
                    value={message}
                    onChange={handleInputChange}
                    className="ajoutcom"
                    focused
                />
                <Button
                    fullWidth={true}
                    className={"valid"}
                    variant="contained"
                    onClick={addCommentaire}
                    color={"secondary"}
                    size="large"
                >
                    <AddIcon />
                    Ajouter
                </Button>
                <div>
                    <h2 className={"white"}>Les commentaires</h2>
                    {commentaires.map((commentaire, index) => (
                        <Commentaire key={commentaire.id} data={commentaire} />
                    ))}
                </div>
            </div>
        </>
    );
}
