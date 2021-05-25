import react, { useState } from "react";

const Inscribirse =()=> {
    
    let [state,setState] = useState({
        username:"",
        email:"",
        passwrod:""
    })

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }
    
    
    return(
        <div>
            <h3>Registrate!</h3>
            <div className="row">
            
            <form className="col 12">

                <div className= "input-field  col s6">
                <input placeholder="Nombre de usuario" type="text" name="username"onChange={handleChange} ></input>
                <input placeholder="E-mail" type="email" name="email"onChange={handleChange} ></input>
                <input placeholder="Constraseña" type="password" name="password"onChange={handleChange} ></input>
                </div>
            </form>
            

            </div>

        </div>
    )
    
}

export default Inscribirse;