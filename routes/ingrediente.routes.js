const express = require('express');
const { populate } = require('../models/ingrediente');

const router = express.Router(); 

const Ingrediente = require('../models/ingrediente');


router.get('/', async (req,res)=>{ 
    const ingredientes= await Ingrediente.find({});
       
    console.log(ingredientes);
    res.json(ingredientes);
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
    newIngrediente.save()
    res.json({status:"Ingrediente agregado"}); // la segunda parte de la frase?? then ingrediente?

});

router.put('/:id', async (req, res)=> {
    
    await Ingrediente.findByIdAndUpdate(req.params.id, req.body).then(() => res.json({status:"ingrediente actualizado"}))
});

router.delete('/:id', async(req, res)=> {              //BORRAR
    await Ingrediente.findByIdAndDelete(req.params.id);
    res.json({status:"Ingrediente eliminado"});
})



module.exports= router;