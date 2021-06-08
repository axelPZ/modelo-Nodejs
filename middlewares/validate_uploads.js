const { response, request  } = require('express');

const validateUploads = (req = request, res = response, next) => { 
     //verificar si nos estan mandando un archivo, y en el ultimo si viene el nombre
     if ( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) 
     {
       return res.status(400).json({
           msg: 'no hay archivos para subir'
       });
     }
 
    next();
}

module.exports = {
    validateUploads
}