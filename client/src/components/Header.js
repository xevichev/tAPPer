
// import CrearReceta from "./Crearreceta";
// import GestionIngredientes from "./GestionIngredientes";
// import Home from "./Home";
import {Link} from "react-router-dom";
const Header=()=> {
    
return(
<nav>
  <div className="nav-wrapper">
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li><Link to="/" class="brand-logo center">tApper</Link></li>
        <li><Link to="/CrearReceta">Crea tu Receta</Link></li>
        <li><Link to="/GestionIngredientes">API Ingredientes</Link></li>
      </ul>
  </div>
</nav>

)};

export default Header;



