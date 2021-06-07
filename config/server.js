
const express = require('express');
const cors = require('cors');
const dbConnection = require('./config.DB');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // dividir las rutas
        this.paths = {
            user: '/api/users'
        }

        // coneccion a la base de datos
        this.connectarDB();

        // middlewares
        this.middlewares();

        // rutas
        this.routes();

    }

    // conectar DB
    async connectarDB(){
        await dbConnection();
    }


    middlewares(){

        // CORS
        this.app.use( cors() );

        // leer y pasar los datos del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public'));

    }

    routes(){

       this.app.use(this.paths.user, require('../routes/user'));
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor conrriendo en el puerto ' + this.port);
        });
    }
}


module.exports = Server;