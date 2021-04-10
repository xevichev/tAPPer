const express = require('express');
const app = express();
const morgan = require('morgan'); //modul per veure per consola totes les peticions que es fan al nostre servidor.
const path = require('path'); // metode per trobar direccions del arxius. utilitzat a staticfiles
const dotenv= require('dotenv').config();

const {moongose}=require('./database');



//Setting---

app.set('port', process.env.PORT || 3000); // configuro app, li dono com a valor del port el que ens doni el servei de la nube. O sino al port 3000
                            //'port' seria una variable i lo que hi ha a la dreta de la coma seria el valor d'aquesta.

//Middlewares ----(funcions que s'executen abans de les rutes)

app.use(morgan('dev')); //a morgan se li passa paramatre dev perque ens surti info en format text.

app.use(express.json());//cada cop que una dada arribi al nostre servidor passara per aquesta funcio  i si es json podrem accedir a ella.

//Routes---
app.use('/api/recetas',require('./routes/recetas.routes')); //el prefeix ens serveix perque la resposta no sigui al arrel sino a localhost:3000/api/recetas.
app.use('/api/ingredientes', require('./routes/ingredientes.routes'));
//Static files --- 
console.log(__dirname);   //dirname em diu TOTA la ruta desde el sistema fins on esta el arxiu.
console.log(path.join(__dirname, 'public'));// amb path.join aconseguim la ruta desde sistema fins la carpeta public.
app.use(express.static(path.join(__dirname, 'public'))); //expres: mi carpeta estatic esta en esta direccion.

//Starting the server---
app.listen(app.get('port'), () =>{    //aqui estem utilitzant la "variable" port i es reemplaza
    console.log(`server on port ${app.get('port')}`);
});