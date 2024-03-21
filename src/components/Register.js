// import React, { useState, useEffect } from "react";
// import { Button, TextField } from "@mui/material";
// import AddIcon from '@mui/icons-material/Add';
//
// export default function Register() {
//   const [input, setInput] = useState(""); // State pour stocker la valeur de l'input
//   const [users, setUsers] = useState(() => {
//       const storedUsers = localStorage.getItem("users");
//       return storedUsers ? JSON.parse(storedUsers) : [];
//   });
//
//   useEffect(() => {
//     localStorage.setItem("users", JSON.stringify(users));
// }, [users]);
// // met a jour le local storage des todos des que le usestate de to do est mis a jour
//
// const handleInputChange = (event) => {
//     setInput(event.target.value);                 // Mettre à jour la valeur de l'input
// };
//
//   const addUser = () => {
//     if (input.trim() !== "") {
//         setUsers([...users, input]);        // Ajouter le contenu de l'input aux todos
//         setInput("");                       // Effacer l'input après l'ajout
//     }
// };
//   return (
//     <>
//         <div className={"container"}>
//             <h1>Inscription</h1>
//             <div className={"input"}>
//               <p>Nom :</p>
//                 <TextField
//                     className={"textfield"}
//                     // color={"noe"}
//                     focused
//                     fullWidth
//                     id="outlined-basic"
//                     // label="Outlined"
//                     // variant="outlined"
//                     value={input}
//
//                     onChange={handleInputChange} // Utiliser la fonction de gestionnaire d'événements pour mettre à jour l'input
//                     inputProps={{ style: { color: '#edf2f4' } }}
//                 />
//                 <p>Prenom :</p>
//                 <TextField
//                     className={"textfield"}
//                     // color={"noe"}
//                     focused
//                     fullWidth
//                     id="outlined-basic"
//                     // label="Outlined"
//                     // variant="outlined"
//                     value={input}
//
//                     onChange={handleInputChange} // Utiliser la fonction de gestionnaire d'événements pour mettre à jour l'input
//                     inputProps={{ style: { color: '#edf2f4' } }}
//                 />
//                 <p>Email :</p>
//                 <TextField
//                     className={"textfield"}
//                     // color={"noe"}
//                     focused
//                     fullWidth
//                     id="outlined-basic"
//                     // label="Outlined"
//                     // variant="outlined"
//                     value={input}
//
//                     onChange={handleInputChange} // Utiliser la fonction de gestionnaire d'événements pour mettre à jour l'input
//                     inputProps={{ style: { color: '#edf2f4' } }}
//                 />
//                 <p>Mot de passe :</p>
//                 <TextField
//                     className={"textfield"}
//                     // color={"noe"}
//                     focused
//                     fullWidth
//                     id="outlined-basic"
//                     // label="Outlined"
//                     // variant="outlined"
//                     value={input}
//
//                     onChange={handleInputChange} // Utiliser la fonction de gestionnaire d'événements pour mettre à jour l'input
//                     inputProps={{ style: { color: '#edf2f4' } }}
//                 />
//                 <Button
//                     className={"valid"}
//                     variant="contained"
//                     onClick={addUser} // Utiliser la fonction d'ajout de todo
//                 ><AddIcon />
//                     s'inscrire
//                 </Button>
//             </div>
//         </div>
//     </>
//   )
// }

import React, {useEffect, useState} from 'react';
import { TextField, Button, Typography } from '@mui/material';
import {useMyContext} from "./TokenProvider";

export default function Register() {

    const { token, addToken } = useMyContext();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/utilisateur/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nom, prenom, email, mdp: password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            console.log('Token:', data.token);
            addToken(data.token);
            // Optionnel : vous pouvez gérer la réponse, par exemple, rediriger vers une page de connexion
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <div className={"cadreForm"}>
                <Typography variant="h5">Inscription</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth={true}
                        label="Nom"
                        variant="outlined"
                        className={"textField"}
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                    <TextField
                        fullWidth={true}
                        label="Prénom"
                        variant="outlined"
                        className={"textField"}
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                    <TextField
                        fullWidth={true}
                        label="Email"
                        variant="outlined"
                        className={"textField"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth={true}
                        label="Mot de passe"
                        type="password"
                        variant="outlined"
                        className={"textField"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth={true}
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={"button"}
                    >
                        S'inscrire
                    </Button>
                </form>
                {errorMessage && <Typography variant="body1" color="error">{errorMessage}</Typography>}
            </div>
        </>
    );
}
