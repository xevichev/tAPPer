const mongoose= require('mongoose');
require('dotenv').config();

const URI = process.env.URI_MDB;

mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser:true, useCreateIndex:true})

    .then(db => console.log('MongoDB is connected!'))
    .catch(error => console.error(error));

module.exports= mongoose;