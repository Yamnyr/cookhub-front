import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function AjoutRecette() {
  const [input, setInput] = useState(""); // State pour stocker la valeur de l'input
  const [recettes, setRecettes] = useState(() => {
      const storedRecettes = localStorage.getItem("recettes");
      return storedRecettes ? JSON.parse(storedRecettes) : [];
  });
  // State pour stocker la liste des todos (recupère les to do du local storage si le usestate est vide

  useEffect(() => {
      localStorage.setItem("recettes", JSON.stringify(recettes));
  }, [recettes]);
  // met a jour le local storage des todos des que le usestate de to do est mis a jour

  const handleInputChange = (event) => {
      setInput(event.target.value);                 // Mettre à jour la valeur de l'input
  };

  const addRecette = () => {
      if (input.trim() !== "") {
        console.log('recette ajouté')   
        setRecettes([...recettes, input]);        // Ajouter le contenu de l'input aux todos
        setInput("");                       // Effacer l'input après l'ajout
      }
  };
  return (
    <>
        <div className={"container"}>
            <h1>Ajouter une recette</h1>
            <div className={"input"}>
              <p>Nom de la recette :</p>
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
                <p>Ingrediants :</p>
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
                    onClick={addRecette} // Utiliser la fonction d'ajout de todo
                ><AddIcon />
                    ajouter
                </Button>
            </div>
        </div>
    </>
  )
}
