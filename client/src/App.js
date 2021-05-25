import{Switch, Route, Link, useHistory} from "react-router-dom";
import { useEffect, useState } from "react";
import CrearReceta from "./components/Crearreceta";
import GestionIngredientes from "./components/GestionIngredientes";
import Home from "./components/Home";
import Header from "./components/Header";
import Inscribirse from "./components/Inscribirse";
import "./App.css";

function App(){
  const history = useHistory();


  return (
    <div className="App" >
    <Header/>
    
    <Switch>
        <Route path="/CrearReceta" >
        <CrearReceta />
        </Route>
        <Route path="/"  exact={true}>
        <Home />
        </Route>
        <Route path="/GestionIngredientes"  >
        <GestionIngredientes/>
        </Route>
        <Route path="/Inscribirse" >
        <Inscribirse/>
        </Route>

    </Switch>
    </div>      
      
  )};


export default App;