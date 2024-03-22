import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

export default function Commentaire({ data }) {
    const { id, message, note, id_utilisateur, createdAt } = data;
    const [utilisateur, setUtilisateur] = useState(null);

    useEffect(() => {
        const fetchUtilisateur = async () => {
            try {
                const response = await fetch(`http://localhost:8000/utilisateur/getbyid/${id_utilisateur}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch utilisateur');
                }
                const utilisateurData = await response.json();
                setUtilisateur(utilisateurData);
            } catch (error) {
                console.error('Error fetching utilisateur:', error);
            }
        };

        fetchUtilisateur();
    }, [id_utilisateur]);

    return (
        <div className="row commentaire">
            <div>
                <Rating name="read-only" value={note}
                    size="large" readOnly />
                {utilisateur && <h3>{utilisateur.nom} {utilisateur.prenom}</h3>}
                {message}
            </div>
        </div>
    );
}
