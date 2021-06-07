const mongoose = require('mongoose');


const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false

        });

        console.log('Base de datos corriendo...');
    }catch( error ){

        throw new Error('error a la hora de iniciar la base de datos');
    }
}

module.exports = dbConnection;