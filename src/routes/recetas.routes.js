const { Router } = require('express');
const express = require('express');

const router = express.Router(); // el metode router ens retorna un objecte per  guardar rutes.

const Receta = require('../models/receta');

router.get('/', async (req,res)=>{ //mitjançant el metode  get quan arribi una petició al '/' (es la ruta incial o principal) es respongui amb el que vulguem, ara per exemple un json
    const receta= await Receta.find();
    console.log(receta);//array de momento vacio, se puede ver en api/recetas
    res.json(receta);
});

router.get('/:id', async (req, res) => {
    const filterReceta = await Receta.findById(req.params.id);
    res.json(filterReceta);     //que quieren decir estas lineas?
});

router.post('/nueva-receta', (req, res) => {  // SUBIR
    const newReceta = new Receta({
        
        name: req.body.name,
        vegetariano: req.body.vegetariano,
        vegano:req.body.vegano,
        duracion:req.body.duracion,
        procedimiento:req.body.procedimiento,
        dificultad:req.body.dificultad,
        raciones:req.body.raciones,
        microondas: req.body.microondas,
        ingredientes: req.body.ingredientes,
    })
    
    newReceta.save().then(receta => res.json(receta)); //que quieren decir estas lineas?
});

router.put('/:id', async(req, res)=>{   //PUT = ACTUALIZAR
    const newReceta = new Receta({

        name: req.body.name,
        vegetariano: req.body.vegetariano,
        vegano:req.body.vegano,
        duracion:req.body.duracion,
        procedimiento:req.body.procedimiento,
        dificultad:req.body.dificultad,
        raciones:req.body.raciones,
        microondas: req.body.microondas,
        ingredientes: req.body.ingredientes,

    })
    await Receta.findByIdAndUpdate(req.params.id, newReceta). then(receta => res.json(receta)); //que quieren decir estas lineas?
    
});

router.delete('/:id', async(req, res)=> {              //BORRAR
    await Receta.findByIdAndDelete(req.params.id);
    res.json({status: "receta eliminada"});
})


module.exports= router;


