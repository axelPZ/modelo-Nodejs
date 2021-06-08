const { response  } = require('express');

//importar los tipos de mongoose
const { ObjectId } = require('mongoose').Types;

//agregar colecciones permitidas para la busqueda
const coleccionesPermitidas = [
    'users',
    'categories',
    'products',
    'roles'
];

const User  = require('../models/user');


//funcion para buscarUsuarios
const searchUser = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino );

    //si lo que nos mandan es un id
    if( esMongoID ) {

        const user = await User.findById( termino );
       return res.json( {
            results: ( user ) ? [ user ] : []
            });
    }

    //si lo queremos buscar por nombre
        const regex = new RegExp( termino, 'i' ); 

        //utilizamos el "$or" que significa o... busamos por el nombre o por el correo
        const users = await User.find({ 
            $or: [{ name: regex }, { email: regex }, { surname: regex }], //$and  = y, $where
            $and: [{ estado: true }]
         });

       //cuantos resultados encuentra
       const total = await User.countDocuments({ $and: [ { name:regex },{ estado: true } ] })
                    
       res.json({
           total,
           results: users
       })
}



const search = ( req, res = response ) => {

    const { coleccion, termino } = req.params;

    //verificar si las coleccion que mandan esta en las permitidas
    if( !coleccionesPermitidas.includes( coleccion )){
        return res.status(400).json({
            msg: `Las coleciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

   switch( coleccion ){
    case 'users':
        searchUser(termino, res);

    break;
    default:
        res.status(500).json({
            msg: 'Busqueda aun no programada'
        });
    break;
   }
}

module.exports = {
    search
}