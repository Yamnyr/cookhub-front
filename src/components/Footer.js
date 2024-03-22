import React from 'react'
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <div className="container-row">
                <div className="col-md-4">
                    <h3>Liens Utiles</h3>
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/profil">profil</Link></li>
                        <li><Link to="/favrecettes">favrecette</Link></li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <h3>Coordonnées</h3>
                    <p>Adresse: 123 Rue de l'Exemple Test</p>
                    <p>Téléphone: +123 456 789</p>
                    <p>Email: info@example.com</p>
                </div>
                <div className="col-md-4">
                    <h3>Suivez-nous</h3>
                    <ul>
                        <li><a href="https://www.facebook.com/">Facebook</a></li>
                        <li><a href="https://twitter.com/">Twitter</a></li>
                        <li><a href="https://www.instagram.com/">Instagram</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
