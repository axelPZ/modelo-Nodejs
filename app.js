
// importaciones
require('dotenv').config();
const Server = require('./models/server');

// instancia de mi servidor
const server = new Server();



server.listen();