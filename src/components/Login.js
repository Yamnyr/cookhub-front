import React, {useEffect, useState} from 'react';
import { TextField, Button, Typography } from '@mui/material';
import {useMyContext} from "./TokenProvider";

export default function Login() {

    const { token, addToken } = useMyContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

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
            // Ici, vous pouvez gérer la réponse de la requête, par exemple, stocker le token dans le local storage
            console.log('Token:', data.token);
            addToken(data.token);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <div className={"cadreForm"}>
                <Typography variant="h5">Connexion</Typography>
                <form onSubmit={handleSubmit}>
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
                        Se connecter
                    </Button>
                </form>
                {errorMessage && <Typography variant="body1" color="error">{errorMessage}</Typography>}
            </div>
        </>
    );
}
