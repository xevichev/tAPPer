
import {Link} from "react-router-dom";
const Header=()=> {
    
return(
<nav>
  <div className="nav-wrapper">
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li><Link to="/" className="brand-logo center">tApper</Link></li>
        <li><Link to="/CrearReceta">Crea tu Receta</Link></li>
        <li><Link to="/GestionIngredientes">API Ingredientes</Link></li>
        <li><Link to="/Inscribirse" >Inscribirse</Link></li>
        <button className="waves-effect waves-light btn" style={{borderColor:"black" , borderWidth:"1px", borderStyle:"solid"}} >Iniciar Sesión</button>
      </ul>
  </div>

</nav>

)};

export default Header;



