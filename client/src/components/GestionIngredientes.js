import { useEffect, useState } from "react";
const GestionIngredientes= ()=>{

    let [ state, setState ]= useState({
      name: "",
      medida:"",
      KCal:"",
      ingredientes:[],
      _id:""
      })
    
    
      
    
    
      const agregarIngrediente = e => {
          if (state._id) {
              fetch(`http://localhost:5000/api/ingredientes/${state._id}`, {
                  method: 'PUT',
                  body:JSON.stringify(state),                              //no se actualiza "uncaught (in promise)"
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  }
              })
              .then(res => res.json())                                        //me falta escribir el m.toast, resetear estado y hacer get para que me salga por tabla
              .then(data=> {console.log(data)
                  setState({
                    ...state,
                    name:"",
                    medida:"",
                    KCal:"" 
                  })
                  fetchIngredientes();
              });
              
          } else{
              fetch('http://localhost:5000/api/ingredientes/nuevo-ingrediente', {
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
                  M.toast({html:"Ingrediente guardado"});
                  setState({
                    ...state,
                    name:"",
                    medida:"",
                    KCal:"" 
                  })
                  fetchIngredientes();
                  
              }) 
                  .catch(err=>console.error(err));    
          }
          e.preventDefault();
    
      };
    
      const deleteIngrediente = (id) => {
          if (confirm("Seguro que quieres eliminar ingrediente?")) {
              
              fetch('/api/ingredientes/' + id, {
              method: "DELETE",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
              })
              .then(res=> res.json())
              .then(data=> {
              console.log(data)
              M.toast({html:"ingrediente eliminado"})
              fetchIngredientes();    
              });}
            
      };
    
      const editarIngrediente= (id) => {
          fetch(`http://localhost:5000/api/ingredientes/${id}`)
          .then(res=> res.json())
          .then(data=> {
              console.log(data)
              setState({ 
                  ...state,                      // aqui faig que s'ompli el formulari amb les dades del ingredient, actualitzant l'estat
                  name:data.name,
                  medida: data.medida,
                  KCal:data.KCal,
                  _id:data._id
              })        
              }
          )
      };
    
      const handleChange = (e) => {
          
          const { name, value } = e.target;
          setState({
              ...state,
              [name]: value
          })
      }
    
     useEffect(()=>{
       fetchIngredientes()
      },[])
     
      const fetchIngredientes = () =>{
              fetch('http://localhost:5000/api/ingredientes')
                  .then(res=>res.json())
                  .then(data=>{
                      
                      setState({
                        ...state,
                        ingredientes:data
                      })
                      console.log(state.ingredientes)
                  
                  })
      };
    
      return (
              <div>
            {/* //    
            //       <nav className="light-blue">
            //           <div className="container">
            //               <a className="brand-logo" href="/">tapper</a>
            //           </div>
            //       </nav> */}
                  <div className="container">
                      <div className="row">
                          <div className="col s5">
                              <div className="card" style={{margin:"50px"}} >
                                  <div className="card-content">
                                      <form onSubmit={agregarIngrediente}>
                                          <div className="row">
                                              <div className="input-field col s12">
                                                  <input name="name" type="text" onChange={handleChange} placeholder= "nombre de ingrediente" value={state.name}/>
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="input-field col s12">
                                                  <input name="medida" onChange={handleChange} type="text" placeholder= "unidad de medida" value={state.medida}/>
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="input-field col s12">
                                                  <input name="KCal" onChange={handleChange}  type="text" placeholder= "Kcal (cada 100 gramos)" value={state.KCal} />
                                              </div>
                                          </div>
                                          <button className="btn light-blue">Agregar</button>
                                      </form>
                                      
                                  </div>
                              </div>
    
                          </div>
                          <div className="col s8" style={{margin:"10px"}}>
                              <table>
                                  <thead>
                                      <tr>
                                          <th>Ingrediente</th>
                                          <th>Medida</th>
                                          <th>Kcal(cada 100g)</th>
                                      </tr>  
                                  </thead>
                                  <tbody>
                                      {
                                          state.ingredientes.map(
                                              ingrediente => {
                                                  return ( 
                                                      <tr key={ingrediente._id} >
                                                          <td>{ingrediente.name}</td>
                                                          <td>{ingrediente.medida}</td>
                                                          <td>{ingrediente.KCal}</td>
                                                          <td>
                                                              <button className="btn light-blue" onClick= {()=> editarIngrediente(ingrediente._id)} >
                                                                  <i className="material-icons">edit</i>   
                                                              </button>
                                                              <button style={{margin:"5px"}} className="btn light-blue" onClick={ ()=> deleteIngrediente(ingrediente._id)}>
                                                                  <i className="material-icons">delete</i> 
                                                              </button>
                                                          </td>
                                                      </tr>
                                                  )
                                              }
                                          )
                                      }
                                  </tbody>
                              </table>
    
                          </div>
                      </div>
    
                  </div>
              </div>
          )
      };

export default GestionIngredientes;