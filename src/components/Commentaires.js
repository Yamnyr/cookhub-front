import React, { useState, useEffect } from 'react';
import { Button, Rating, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { MdDelete } from "react-icons/md";
import Typography from "@mui/material/Typography";
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
                <h1>Commentaires</h1>
                <Rating
                    name="size-large"
                    defaultValue={note}
                    size="large"
                    onChange={(event, value) => setNote(value)}
                />
                <TextField
                    fullWidth={true}
                    placeholder="Ajouter un commentaire."
                    value={message}
                    onChange={handleInputChange}
                />
                <Button
                    fullWidth={true}
                    className={"valid"}
                    variant="contained"
                    onClick={addCommentaire}
                >
                    <AddIcon />
                    Ajouter
                </Button>
                <div>
                    {commentaires.map((commentaire, index) => (
                        <div className="row commentaire" key={index}>
                            <div key={index}>
                            <Rating name="read-only" value={commentaire.note} readOnly />
                            <h3>{commentaire.id_utilisateur}</h3>
                                {/*TODO: route recup nom utilisateur*/}
                                {commentaire.message}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
