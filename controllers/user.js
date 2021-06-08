
// IMPORTACIONES
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');


// CREAR USUARIO
const create = async( req = request, res = response ) => {    
    const { name, surname, email, password, role } = req.body;
    const user = new User( { name, surname, email, password, role } );
 
    // encriptar la contrasenia 
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync( password, salt );

    // guardar el la BD
    await user.save();

    res.status(200).json({
        msg: 'post create user',
        user
    });
}


// LLAMAR A TODOS LOS USUARIOS
const getAll = async ( req = request, res = response ) => {
    const { limit = 10, from = 0} = req.query;

    // condiciones para trer el usuario
    const query = {
        estado: true
    }

    // hacer las peticiones a la BD con promesas
    const [ total, users] = await Promise.all([
        User.countDocuments( query ),
        User.find( query ).skip( Number( from ))
                            .limit( Number( limit ))

    ]);

    res.status(200).json({
        total,
        users
    });
}


// LLAMAR USUARIO POR ID
const getById = async ( req = request, res = response ) => {

    const { id } = req.params;
    const user = await User.findById( id );

    res.status(200).json({
        user
    });
}



// ACTUALIZAR EL USUARIO
const update = async( req = request, res = response ) => {

    const { id } = req.params;
    const { _id, password, email, estado, ...info } = req.body;
    
    const user = await User.findByIdAndUpdate(id, info, {new: true});

    res.status(200).json({
        user
            });
}



// ELIMINAR USUARIO
const deleteUser = async( req = request, res = response ) => {
    const { id } = req.params;

    // obtnego el id del usuario que quiere eliminar al usuario que se agrego en la request al validar el JWT
    const  userEliminar  = req.user;

    // eliminar definitivamente el usuario
        //const user = await User.findByIdAndDelete( id );

    // solo cambiarle el estado 
    const userEliminado = await User.findByIdAndUpdate( id, { estado: false} );
    res.status(200).json({
        msg: 'Se a eliminado correctamente el usuario',
        userEliminado,
        userEliminar
    });
}


// CAMBIAR PASSWORD Y EMAIL
const updateEmailPassword = async( req= request, res = response ) => {

    const { id }= req.params;
    let { email, password } = req.body;

     // encriptar la contrasenia 
     const salt = bcryptjs.genSaltSync(10);
     password = bcryptjs.hashSync( password, salt );

    const user = await User.findByIdAndUpdate( id, { email, password }, { new: true } );

    res.status(200).json({
        msg: 'cambiar email and password',
        user
    })
}


// OBTENER VARIOS PARAMETROS DE LA URL
const getParams = async( req = request, res = response ) => {
    const query = req.query;
    res.status(200).json({
        msg: 'delete user or update state users',
        query
    });
}



module.exports = {
    getAll,
    getById,
    update,
    deleteUser,
    create,
    getParams,
    updateEmailPassword
}