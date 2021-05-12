import{Switch, Route, Link, useHistory} from "react-router-dom";
import { useEffect, useState } from "react";
import CrearReceta from "./components/Crearreceta";
import GestionIngredientes from "./components/GestionIngredientes";
import Home from "./components/Home";
import Header from "./components/Header";

function App(){
  const history = useHistory();


  return (
    <div className="App" >
    <Header/>
    
    <Switch>
        <Route path="/CrearReceta" component={CrearReceta}>
        <CrearReceta />
        </Route>
        <Route path="/"  component={Home} exact={true}>
        <Home />
        </Route>
        <Route path="/GestionIngredientes" component={GestionIngredientes} >
        <GestionIngredientes/>
        </Route>

    </Switch>
    </div>      
      
  )};


export default App;