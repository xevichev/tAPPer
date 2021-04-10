const express = require('express');

const router = express.Router(); 

const Ingrediente = require('../models/ingredientes');


router.get('/', async (req,res)=>{ 
    const ingrediente= await Ingrediente.find();
    console.log(ingrediente);
    res.json(ingrediente);
});

router.get('/:id', async (req, res) => {
    const filterIngrediente = await Ingrediente.findById(req.params.id);
    res.json(filterIngrediente);
});


router.post('/nuevo-ingrediente', (req, res) => {
    const newIngrediente = new Ingrediente({
        
        name: req.body.name,
        medida: req.body.medida,
        KCal: req.body.KCal
    })
    newIngrediente.save().then(ingrediente => res.json(ingrediente))
});

router.put('/:id', async (req, res)=> {
    const newIngrediente = new Ingrediente({
        name: req.body.name,
        medida: req.body.medida,
        KCal: req.body.Kcal
    })
    await Ingrediente.findByIdAndUpdate(req.params.id, newIngrediente). then(ingrediente => res.json(ingrediente))
});

router.delete('/:id', async(req, res)=> {              //BORRAR
    await Ingrediente.findByIdAndDelete(req.params.id);
    res.json({status:"Ingrediente eliminado"});
})



module.exports= router;