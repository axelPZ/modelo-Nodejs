const Role = require('../models/role');
const User = require('../models/user');


// VALIDAR EL ROLE
const isValidRole = async( role = '' ) =>  {
    const existeRol = await Role.findOne({ role }); 
    
    if(!existeRol){
            throw new Error(`El rol ${role} no es valido. O, no a sido agregado.`);
    }
}

// VALIDAR SI EXISTE EL CORREO
const emailExists = async( email = '' ) => {

    const existEmail = await User.findOne({ email });
    if( existEmail ){
        throw new Error(`El Correo: ${ email }, ya existe!`);
    }
}

// VERIFICAR SI EXISTE EL USUARIO
const userExist = async( id = '' ) => {
    
    const user = await User.findById( id );
    const mensaje = `No existe el usuario con el id: ${ id }`
    if( !user ){
        throw new Error( mensaje );

    }else {
        if( !user.estado ){
            throw new Error( mensaje );
        }
    }
}


module.exports = {
    isValidRole,
    emailExists,
    userExist
}