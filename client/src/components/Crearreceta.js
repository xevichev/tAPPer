import { useEffect, useState } from "react";


const crearReceta= ()=> {
    let [nombre, setNombre]= useState("");
    let[duracion, setDuracion]= useState(0);
    let[procedimiento, setProcedimiento] = useState("");
    let[vegano, setVegano] = useState("");
    let[vegetariano, setVegetariano] = useState("");

    let[state, setState]=useState({
        nombre:"",
        vegano:"",
        vegetariano:"",
        duracion:"",
        procedimiento:"",
        dificultad:"",
        raciones:"",
        microondas:"",
        ingredientes:[""]
    });


return (
    <div className="crearReceta">

        <div className="row" className="container">
            <form className="col s7" >
                <div> 
                    <span>¿Como se llama la receta?</span>
                    <input
                        placeholder="Nombre"
                        type="text"                    
                    >
                    </input>
                </div>
                
                <div className="veganoRadio" >
                    
                    <span>¿Es una receta vegana?</span><br></br>
                    <label>Si</label>
                    <input type="radio" name="vegano" id="veganoSi" value="Si"/> <br></br>                  
                    <label>No</label>                        
                    <input type="radio" name="vegano" id="veganoNo" value="No"/>                  
                    
                </div>

                <div className="vegetarianoRadio">

                    <span>Es una receta vegetariana?</span> <br></br>
                    
                    <label for="vegetarianoSi">Si</label>
                    <input type="radio" name="vegetariano" id="vegetarianoSi" value="Si"/><br></br>                 
                    
                    <label for="vegetarianoNo">No</label>
                    <input type="radio" name="vegetariano" id="vegetarianoNo" value="No"/>                
                    

                </div> 

                <div className="duracion">
                    <span>¿Cuantos minutos tardas en prepararla? </span>
                    <input type="number" placeholder="Minutos"/>

                </div>
                <div className="dificultad">
                    <span>¿Que dificultad tiene? </span> <br></br>
                    <label for="dificultadFacil">Fácil</label>
                    <input type="radio" name="dificultadRadio" id="dificultadFacil" value="1" /><br></br>
                    <label for="dificultadMedia">Media</label>
                    <input type="radio" name="dificultadRadio" id="dificultadMedia" value="2"/><br></br>
                    <label for="dificultadDificil">Difícil</label>
                    <input type="radio" name="dificultadRadio" id="dificultadDificil" value="3"/><br></br>

                </div>

                {/* <div className="formIngredientes">
                    <select>
                        <option>{ingredient.id}</option>
                    </select>
                </div> */}

                <div className="procedimiento">
                    <span>Prodecidimento: </span> <br></br>
                    <textarea placeholder="Describe los pasos para cocinar la receta" style={{height:"150px"}}>

                    </textarea>

                </div>
                
                



            </form>
        </div>
      
    </div>

);
    
};

export default crearReceta;