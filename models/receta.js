const moongose= require('mongoose');

const { Schema } = moongose;

const recetaSchema= new Schema({           //creem un esquema de les dades que hi pujarem
    name: String,
    vegetariano: Boolean,
    vegano:Boolean,
    duracion:Number,
    procedimiento:String,
    dificultad:Number,
    raciones:Number,
    microondas: String,
    ingredientes: [
        {
            ingrediente: {type: moongose.Schema.Types.ObjectId, 
                ref:"Ingrediente"}, 
            cantidad: Number
        }
                 
        ]
});

module.exports=moongose.model('Receta', recetaSchema)   //aqui es concreta dient el que el nostre model de dades es diras 'receta' y tindra el model recetaschema