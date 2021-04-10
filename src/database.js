const mongoose= require('mongoose');
require('dotenv').config();

const URI = 'mongodb+srv://xavi-test:Conselldecent1@test.rubzu.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser:true, useCreateIndex:true})

    .then(db => console.log('MongoDB is connected!'))
    .catch(error => console.error(error));

module.exports= mongoose;