import React, { Component } from 'react';



class App extends Component{

    constructor(){
        super();
        this.state={
            name: "",
            medida:"",
            KCal:"",
            ingredientes:[],
            _id:""
        };
        this.agregarIngrediente = this.agregarIngrediente.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    agregarIngrediente(e){
        if (this.state._id) {
            fetch(`/api/ingredientes/nuevo-ingrediente${this.state._id}`, {
                method: 'PUT',
                body:JSON.stringify(this.state),                              //no se actualiza "uncaught (in promise)"
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())                                        //me falta escribir el m.toast, resetear estado y hacer get para queme salga por tabla
            .then(data=> console.log(data));
            
        } else{
            fetch('/api/ingredientes/nuevo-ingrediente', {
                method: 'POST',
                body: JSON.stringify(this.state), 
                headers: {
                    'Accept': 'application/json',                               //ALGO NO FUNCIONA CON EL IF. SI LO QUITO ME VA PERFECTO PERO
                    'Content-Type': 'application/json'                          //SINO A VECES NO ACTUALIZA LA LISTA CUANDO AÑADO INGREDIENTE
                }
            })
            .then(res=> res.json())
            .then(data => {
                console.log(data)
                M.toast({html:"Ingrediente guardado"});
                this.setState({name:"", medida:"", KCal:"" })
                this.fetchIngredientes();
                
            }) 
                .catch(err=>console.error(err));    
        }
        e.preventDefault();

    };

    deleteIngrediente(id){
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
            this.fetchIngredientes();    
            });}
          
    };

    editarIngrediente(id){
        fetch(`/api/ingredientes/${id}`)
        .then(res=> res.json())
        .then(data=> {
            console.log(data)
            this.setState({                         // aqui faig que s'ompli el formulari amb les dades del ingredient, actualitzant l'estat
                name:data.name,
                medida: data.medida,
                KCal:data.KCal,
                _id:data._id
            })        
            }
        )
    };

    handleChange(e){
        
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }


    componentDidMount(){
        this.fetchIngredientes();
    }

    fetchIngredientes(){
            fetch('/api/ingredientes')
                .then(res=>res.json())
                .then(data=>{
                    
                    this.setState({ingredientes:data})
                    console.log(this.state.ingredientes)
                
                })
    };

    render() {
        return (
            <div>
                {/* Nav-bar */}
                <nav className="light-blue">
                    <div className="container">
                        <a className="brand-logo" href="/">tAPPer</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card" style={{margin:"50px"}} >
                                <div className="card-content">
                                    <form onSubmit={this.agregarIngrediente}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="name" type="text" onChange={this.handleChange} placeholder= "nombre de ingrediente" value={this.state.name}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="medida" onChange={this.handleChange} type="text" placeholder= "unidad de medida" value={this.state.medida}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="KCal" onChange={this.handleChange}  type="text" placeholder= "Kcal (cada 100 gramos)" value={this.state.KCal} />
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
                                        this.state.ingredientes.map(
                                            ingrediente => {
                                                return ( 
                                                    <tr key={ingrediente._id} >
                                                        <td>{ingrediente.name}</td>
                                                        <td>{ingrediente.medida}</td>
                                                        <td>{ingrediente.KCal}</td>
                                                        <td>
                                                            <button className="btn light-blue" onClick= {()=> this.editarIngrediente(ingrediente._id)} >
                                                                <i className="material-icons">edit</i>   
                                                            </button>
                                                            <button style={{margin:"5px"}} className="btn light-blue" onClick={ ()=> this.deleteIngrediente(ingrediente._id)}>
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
};

export default App;
