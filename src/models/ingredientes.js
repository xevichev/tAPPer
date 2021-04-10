const moongose= require('mongoose');

const { Schema } = moongose;

const ingredienteSchema= new Schema({           //creem un esquema de les dades que hi pujarem
    name: String,
    medida: String,
    KCal: Number //cada 100gramos
});

module.exports=moongose.model('Ingrediente', ingredienteSchema)