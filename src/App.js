import './App.css';
import { Route, Routes } from "react-router-dom";

import NavBar from './components/NavBar';
import Footer from "./components/Footer";

import Accueil from './components/Accueil';

import RepRecette from './components/RepRecette'
import Recette from './components/Recette'
import ShowRecette from './components/showRecette';
import AjoutRecette from './components/AjoutRecette'
import EditRecette from './components/EditRecette'

import Login from './components/Login'
import Register from './components/Register'

// import Profil from './components/Profil'
import MesRecettes from './components/MesRecettes'
import FavRecette from './components/FavRecette'
import Abonnement from './components/Abonnement'
import { TokenProvider } from "./components/TokenProvider";
import { ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FBF5F3',            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#0B7A75',
            light: '#F5EBFF',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#F5EBFF',
        },
    },
});


function App() {
    return (
        <div className="App">

            <ThemeProvider theme={theme}>
                <TokenProvider>
                    <NavBar></NavBar>
                    <div className={"content"}>
                        <Routes>
                            <Route path="/" element={<Accueil></Accueil>} />
                            <Route path="/recettes" element={<RepRecette></RepRecette>} />
                            <Route path="/ajoutrecette" element={<AjoutRecette></AjoutRecette>} />

                            <Route path="/recette/:id" element={<Recette></Recette>} />
                            <Route path="/showrecette/:id" element={<ShowRecette></ShowRecette>} />
                            <Route path="/editrecette/:id" element={<EditRecette></EditRecette>} />

                            <Route path="/login" element={<Login></Login>} />
                            <Route path="/register" element={<Register></Register>} />

                            {/* <Route path="/profil" element={<Profil></Profil>} /> */}
                            <Route path="/mesrecettes" element={<MesRecettes></MesRecettes>} />
                            <Route path="/favrecettes" element={<FavRecette></FavRecette>} />
                            <Route path="/abonnement" element={<Abonnement></Abonnement>} />
                        </Routes>

                    </div>

                    <Footer></Footer>
                </TokenProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;