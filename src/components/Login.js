import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useMyContext } from "./TokenProvider";
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

export default function Login() {
    const navigate = useNavigate(); // Utiliser useNavigate pour la redirection
    const { token, addToken } = useMyContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // envoi une requete api qui connecte l'utilisateur et renvoi un token qui est stocké a un context et ainsi au local storage (dans le ficheri local storage)
        try {
            const response = await fetch('http://localhost:8000/utilisateur/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, mdp: password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            console.log('Token:', data.token);
            addToken(data.token);

            navigate('/'); // Rediriger vers la page d'accueil après la connexion
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <div className={"cadreForm"}>
                <Typography className={"h5"} variant="h3 white">Connexion</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        focused
                        fullWidth={true}
                        label="Email"
                        variant="outlined"
                        className={"textField"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        focused
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
                        color="secondary"
                        className={"button"}
                    >
                        Se connecter
                    </Button>
                </form>
                {errorMessage && <Typography variant="body1" color="error">{errorMessage}</Typography>}
            </div>
        </>
    );
}
