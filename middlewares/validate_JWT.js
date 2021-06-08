const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require( '../models/user');



const validateJWT = async( req, res = response, next )=> {

    const token = req.header('x-token').trim();

    // verificar si mandan el token
    if( !token ){
        return res.status(401).json({
            msg: 'No har token en la peticion'
        });
    }

    // validar el JWT
    try{
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
     
        // agrego el usuario a la request
       const user = await User.findById( uid );
        if( !user || !user.estado ){
            res.status(401).json({
                msg: `No existe el usuario con el id: ${ uid }`
            });
            return;
        }

        req.user = user;
        next();

    }catch( error ){

        console.log( error );
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validateJWT
}