import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useMyContext } from './TokenProvider';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

export default function Register() {
    const navigate = useNavigate(); // Utiliser useNavigate pour la redirection
    const { addToken } = useMyContext();
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
            addToken(data.token);
            navigate('/'); // Rediriger vers la page d'accueil après la connexion
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <div className="cadreForm">
                <Typography className={"h5"} variant="h3 white">Inscription</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        focused
                        fullWidth
                        className={"textField"}
                        label="Nom"
                        variant="outlined"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        error={errorMessage.includes('Nom')}
                        helperText={errorMessage.includes('Nom') && errorMessage}
                    />
                    <TextField
                        focused
                        fullWidth
                        className={"textField"}
                        label="Prénom"
                        variant="outlined"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        error={errorMessage.includes('Prénom')}
                        helperText={errorMessage.includes('Prénom') && errorMessage}
                    />
                    <TextField
                        focused
                        fullWidth
                        className={"textField"}
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errorMessage.includes('Email')}
                        helperText={errorMessage.includes('Email') && errorMessage}
                    />
                    <TextField
                        focused
                        fullWidth
                        className={"textField"}
                        label="Mot de passe"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errorMessage.includes('Mot de passe')}
                        helperText={errorMessage.includes('Mot de passe') && errorMessage}
                    />
                    <Button fullWidth type="submit" variant="contained" color="secondary">
                        S'inscrire
                    </Button>
                </form>
                {errorMessage && (
                    <Typography variant="body1" color="error">
                        {errorMessage}
                    </Typography>
                )}
            </div>
        </>
    );
}
