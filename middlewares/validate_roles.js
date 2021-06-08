const { response } = require('express');



//verificar si el role es administrador
const isAdminRole = ( req, res = response, next ) => {

    if( !req.user ){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin valdar el token primero'
        });
    }

    // destructuramos el usuario que se a guardodo en la req al validar el jwt
    const { role, name} = req.user;

    if( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${ name }, usuario sin permisos, para ejecutuar esta tarea `
        });
    }
    
    next();
}


//verificar si el role es de dos tipos

const hasRole = ( ...roles ) => {

    //retorno un funcion con los req y el res
    return (req, res = response, next ) => {

        if( !req.user ){
            return res.status(500).json({
                msg: 'Se quier verificar el role sin valdar el token primero'
            });
        }

        //validar si el role del usuario esta incluido en el role que emos descrito
        if(!roles.includes( req.user.role )){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }
        next();
    }
}


module.exports = {
    isAdminRole,
    hasRole
}