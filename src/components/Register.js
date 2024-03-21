import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function Register() {
  const [input, setInput] = useState(""); // State pour stocker la valeur de l'input
  const [users, setUsers] = useState(() => {
      const storedUsers = localStorage.getItem("users");
      return storedUsers ? JSON.parse(storedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
}, [users]);
// met a jour le local storage des todos des que le usestate de to do est mis a jour

const handleInputChange = (event) => {
    setInput(event.target.value);                 // Mettre à jour la valeur de l'input
};

  const addUser = () => {
    if (input.trim() !== "") {
        setUsers([...users, input]);        // Ajouter le contenu de l'input aux todos
        setInput("");                       // Effacer l'input après l'ajout
    }
};
  return (
    <>
        <div className={"container"}>
            <h1>Inscription</h1>
            <div className={"input"}>
              <p>Nom :</p>
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
                <p>Prenom :</p>
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
                <p>Email :</p>
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
                <p>Mot de passe :</p>
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
                    onClick={addUser} // Utiliser la fonction d'ajout de todo
                ><AddIcon />
                    s'inscrire
                </Button>
            </div>
        </div>
    </>
  )
}
