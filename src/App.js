import './App.css';
import {Route, Routes} from "react-router-dom";

import NavBar from './components/NavBar';
import Footer from "./components/Footer";

import RepRecette from './components/RepRecette'
import Recette from './components/Recette'
import AjoutRecette from './components/AjoutRecette'

import Login from './components/Login'
import Register from './components/Register'

import Profil from './components/Profil'
import MesRecettes from './components/MesRecettes'
import FavRecette from './components/FavRecette'
import FavUser from './components/FavUser'



function App() {
  return (
    <div className="App">

            <NavBar></NavBar>
            <div className={"content"}>
                <Routes>
                    <Route path="/" element={<RepRecette></RepRecette>}/>
                    <Route path="/recette/:id" element={<Recette></Recette>}/>
                    <Route path="/ajoutrecette" element={<AjoutRecette></AjoutRecette>}/>

                    <Route path="/login" element={<Login></Login>}/>
                    <Route path="/register" element={<Register></Register>}/>

                    <Route path="/profil" element={<Profil></Profil>}/>
                    <Route path="/mesrecettes" element={<MesRecettes></MesRecettes>}/>
                    <Route path="/favrecettes" element={<FavRecette></FavRecette>}/>
                    <Route path="/favuser" element={<FavUser></FavUser>}/>
                </Routes>

                <Footer></Footer>
            </div>

    </div>
  );
}

export default App;