import axios from "axios";
import React, { useState, useHistory } from "react";


const Inscribirse =()=> {
    
    let [state,setState] = useState({
        username:"",
        email:"",
        password:""
    })

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    
    const registrarUsuario= async e =>{
        

        await axios.post('http://localhost:5000/api/users/signup',state)
        .then(res=>console.log(res))
        .catch(err=>console.error(err))
        e.preventDefault();

    }
    
    
    return(
        <div>
            <h3>Registrate!</h3>
            <div className="row">
            
            <form className="col 12"  onSubmit={registrarUsuario}>

                <div className= "input-field  col s6">
                <input placeholder="Nombre de usuario" type="text" name="username"onChange={handleChange} ></input>
                <input placeholder="E-mail" type="email" name="email"onChange={handleChange} ></input>
                <input placeholder="Constraseña" type="password" name="password"onChange={handleChange} ></input>
                </div>

                <button type="submit">Registrar</button>
            </form>
            

            </div>

        </div>
    )
    
}

export default Inscribirse;