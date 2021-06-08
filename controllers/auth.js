const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/createJWT');

const User = require('../models/user');



// LOGIN DE USUARIO
const login = async( req, res = response )=> {

    const { email, password } = req.body;

    try{
        // verificar si existe el usuario
        const user = await User.findOne({ email });
        if( !user ){
            res.status(400).json({
                msg: `El usuario con el correo ${ email }, no existe`
            })
            return
        }

        // si el usuario esta activo
        if( !user.estado ){
            res.status(400).json({
                msg: `El usuario con el correo ${ email }, no existe`
            })
            return
        }

        // verificar si las contrasenias coiciden
        const verifyPassword = bcryptjs.compareSync( password, user.password );
        if( !verifyPassword ){
            res.status(400).json({
                msg: `La contrasenia no es correcta`
            });
            return
        }

        // GENERAR EL JWT
        const token = await generateJWT( user._id );

        res.json({
            msg: 'Login ok ',
            token,
            user
        });

    }catch( error){
        console.log( error );
        res.status(500).json({
            msg: 'Algo a salido mal, able con el adminstraodr'
        });

        return 
    }
}

module.exports = {
    login
}