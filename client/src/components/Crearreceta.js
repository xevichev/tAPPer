import { useEffect, useState } from "react";



const crearReceta= ()=> {
    
    let[state, setState]=useState({
        nombre:"",
        vegano:"",
        vegetariano:"",
        duracion:"",
        procedimiento:"",
        dificultad:"",
        raciones:"",
        microondas:"",
        ingredientes:[]
    });

    let[opcionIngredientes, setOpcionIngredientes]=useState([]);

    let[ingredienteSeleccionados, setIngredienteSeleccionados]= useState({
        ingrediente:"",
        cantidad:""
    });

    const fetchIngredientes = () =>{
        fetch('http://localhost:5000/api/ingredientes')
            .then(res=>res.json())
            .then(data=>{
                setOpcionIngredientes(data);
            })};
    
    useEffect(()=>{
    fetchIngredientes()
    },[])

    const agregarReceta = (e)=>{
        fetch('http://localhost:5000/api/recetas/nueva-receta', {
                  method: 'POST',
                  body: JSON.stringify(state), 
                  headers: {
                      'Accept': 'application/json',                               
                      'Content-Type': 'application/json'                          
                  }
              })
              .then(res=> res.json())
              .then(data => {
                  console.log(data)
                  M.toast({html:"Receta guardada"});
                  setState({
                    ...state,
                    nombre:"",
                    vegano:"",
                    vegetariano:"",
                    duracion:"",
                    procedimiento:"",
                    dificultad:"",
                    raciones:"",
                    microondas:"",
                    ingredientes:""
                  })
                  .catch(err=>console.error(err));
                })
                e.preventDefault();
                
    };

    const handleChange = (e) => {
          
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }
    const handleIngredienteSeleccionado= (e) =>{

        const {name, value} = e.target;
        setIngredienteSeleccionados({
            ...ingredienteSeleccionados,
            [name]: value
        })
                
       
    }

    let [listaProvisional, setListaProvisional] =useState([]);

    const añadirIngrediente= e =>{
        // Añadir if para gestionar si el elemento seleccionado esta vacio.
        setListaProvisional(listaProvisional => [...listaProvisional, ingredienteSeleccionados])
        
        setIngredienteSeleccionados({
            ingrediente:"",
            cantidad:""            
            })
        
       
    }

    const borrarIngrediente= (id)=>{
        const ingredientesDeLaLista = listaProvisional.filter((ingrediente) => ingrediente.ingrediente != id);
        setListaProvisional(ingredientesDeLaLista)  
    }

return (
    <div className="crearReceta">

        <div className="row" className="container" style={{marginBottom:"10px", marginTop:"20px"}}>
            <form className="col s12" onSubmit={agregarReceta}>
                <div className="row" >
                <div className="nombre"  className="input-field col s6" >
                    <span>¿Como se llama la receta?</span>
                    <input 
                        name="nombre"
                        placeholder="Nombre"
                        type="text"
                        onChange={handleChange}                    
                    >
                    </input>
                </div> 
                </div>   
               
                <div className="row" className="vegana">
                    <div className="input-field col s6">
                    <span>¿Es una receta vegana?</span>
                    <p>
                    <label>
                    <input type="radio" name="vegano" id="veganoSi" value={true} onChange={handleChange}/>
                    <span>Si</span>
                    </label>
                    </p>
                    <p>               
                    <label>                      
                    <input type="radio" name="vegano" id="veganoNo" value={false} onChange={handleChange}/>
                    <span>No</span>
                    </label>                    
                    </p>
                    </div>
                </div>
                <div className="vegetariana">
                    <span>¿Es una receta vegetariana?</span> 
                    <p>
                    <label htmlFor="vegetarianoSi">
                    <input type="radio" name="vegetariano" id="vegetarianoSi" value= {true} onChange={handleChange}/>
                    <span>Si</span>
                    </label>      
                    </p>           
                    
                    <p>
                    <label htmlFor="vegetarianoNo">
                    <input type="radio" name="vegetariano" id="vegetarianoNo" value={false} onChange={handleChange}/>
                    <span>No</span>
                    </label>  
                    </p>
                </div>              
                <div className="row">
                    <div className="input-field col s4">            
                    <span>¿Cuantos minutos tardas en prepararla? </span>
                    <input name="duracion" type="number" placeholder="Minutos" onChange={handleChange}/>
                    </div>   
                </div>  

                <div className="Dificultad">
                    <span>¿Que dificultad tiene? </span>
                
                    
                    <p>
                    <label htmlFor="dificultadFacil">
                    <input type="radio" name="dificultad" id="dificultadFacil" value="1" onChange={handleChange}/>
                    <span>Fácil</span></label>
                    </p>
                    <p>
                    <label htmlFor="dificultadMedia">
                    <input type="radio" name="dificultad" id="dificultadMedia" value="2"onChange={handleChange}/>
                    <span>Media</span></label>
                    </p>
                    <p>
                    <label htmlFor="dificultadDificil">
                    <input type="radio" name="dificultad" id="dificultadDificil" value="3" onChange={handleChange}/>
                    <span>Difícil</span></label>
                    </p>
                </div>
                    

                <div className="ingredientes">
                    <div className="row">

                    <div className="input-field col s2">
                        <span>Ingredientes necesarios:</span>
                    </div>  

                    <div className = "input-field col s6">
                                      
                    
                    <select onChange={handleIngredienteSeleccionado} name="ingrediente">
                        {opcionIngredientes.map(ingrediente=> {
                           return(<option key={ingrediente._id} value={ingrediente._id}>{ingrediente.name}  
                           {/* como sacar dos values, id y ingrediente */}
                           </option>)}                       
                        )}
                    </select>
                    
                    </div>

                    <div className = "input-field col s4">
                    <input onChange={handleIngredienteSeleccionado} type="number" name="cantidad"/>
                    <label htmlFor="cantidad">{ingredienteSeleccionados.ingrediente && opcionIngredientes.find(ingrediente => ingrediente._id == ingredienteSeleccionados.ingrediente).medida}</label>
                    </div>
                    </div>
                    <div className="row">
                    <button onClick={añadirIngrediente}>Añadir Ingrediente</button> 
                    </div>
                    

                    <table>
                        <thead>
                            <tr>
                            <th>Ingrediente</th>
                            <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaProvisional.map(ingrediente=>{
                                return(<tr key={ingrediente.ingrediente}>
                                    <td>{ingrediente.ingrediente}</td>
                                    <td>{ingrediente.cantidad}</td>
                                    <td>
                                        <button onClick={()=>borrarIngrediente(ingrediente.ingrediente)}>Borrar ingrediente</button> 
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="procedimiento">
                    <span>Prodecidimento: </span> <br></br>
                    <textarea name="procedimiento" placeholder="Describe los pasos para cocinar la receta" style={{height:"150px"}} onChange={handleChange}>

                    </textarea>

                </div>
                <div className="microondas">
                    <span>¿Necesita microondas antes de comer?</span> 
                    <p>
                    <label htmlFor="microSi">
                    <input type="radio" name="microondas" id="microSi" value="Si"onChange={handleChange}/>
                    <span>Si</span></label>
                    </p>                
                    <p>
                    <label htmlFor="microNo">
                    <input type="radio" name="microondas" id="microNo" value="No"onChange={handleChange}/>
                    <span>No es necesario</span></label> 
                    </p>
                </div>

                <div className="raciones">
                    <span>Número de raciones: </span>
                    <input type="number" name="raciones" placeholder="Nº de raciones" onChange={handleChange}/>
                </div>
                
                <button className="btn waves-effect waves-light" type="submit" name="action">Crear Receta
                </button>

                

            </form>
        </div>
      
    </div>

);
    
};

export default crearReceta;