
import axios from "axios";
import React, { useState, useHistory } from "react";
import { withRouter } from "react-router-dom";

const Login = (props)=>{

    let [state,setState] = useState({
        email:"",
        password:""
    })

    let [error, setError] = useState(false);

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    const logearUsuario = async e =>{
     try {const response = await axios.post('http://localhost:5000/api/users/login', state)
        console.log(response.data);
    
        localStorage.setItem('token', response.data.token)
        props.history.push('/');}     
    
    catch (err) {
        console.log(errores)
        setError(true)}

    }


return(
    <div>
        <h4>Introduce tus datos</h4>
            <div className="row">
            
            <form className="col 12" onSubmit={logearUsuario} > 
            
                <div className= "input-field  col s6">
              
                <input placeholder="E-mail" type="email" name="email"onChange={handleChange} ></input>
                <input placeholder="Constraseña" type="password" name="password"onChange={handleChange} ></input>
                </div>

                <button type="submit" >Iniciar Sesión</button>
            </form>
            

            </div>
    </div>
)

}


export default withRouter(Login);


