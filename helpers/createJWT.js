const jwt = require('jsonwebtoken');


const generateJWT = ( uid = '') => {

    return new Promise ( ( resolve, reject ) => {

        const payload = { uid };

        // gennerar el jwt
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '12h'
        }, ( error, token ) => {

            if( error ){
                console.log( error );
                reject( "No se pudo generar el token" )
            }else{
                resolve( token );
            }
        });
    })
}
module.exports = {
    generateJWT
}