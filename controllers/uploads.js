const { response } = require('express');

// para trabajar con las rutas, NodeJs
const path = require('path');

// para ingresar a cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL);

const User = require('../models/user');

const uptadeImgCloudinary = async(req, res =  response) =>
    {
        //extraigo los datos de la request
        const { id, collection } = req.params;

        let model;
        switch (collection) {
            case 'users':

                model = await User.findById(id);
                if( !model ){
                    return res.status(400).json({
                        msg: `No existe el usuario con el id ${ id }`
                    });
                }
                
                break;
            default:
                res.status(500).json({ msg: 'instruccion no programada aun'});
                break;
        }

        // Limpiar imagenes previas
        if( model.img ){


            //el id de la imagen biene al final del url, necesitamos sacarla y quitarle el .jpg
            //https://res.cloudinary.com/node-restserver/image/upload/v1621287658/ut1lozt5poubexyj6rq0.jpg

            // sacar la url de la imagen desde el modelo
                // creamos un array de la ruta separado por /
                const nameArr = model.img.split('/');

                // obtenemos el ultimo elemento del arreglo
                const name = nameArr[ nameArr.length -1 ];

                // ya teniendo el ultimo elemento del arreglo tengo que quitarle la extensio
                // v1621287658/ut1lozt5poubexyj6rq0.jpg
                
                // obtengo el primer elemeto del arreglo que me crea split 
                const [ public_id ] = name.split('.');
                
                //ahora borrarmos la iimagen de cloudinary
                cloudinary.uploader.destroy( public_id );
        }

        //subir imagen a cloudinary
        const { tempFilePath } = req.files.archivo;

        //de la respuesta destructuro el "secure_url" que es donde se encuentra la imagen en cloudinary
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

        // le agrego ala propiedad del modelo el nombre de la imagen
        model.img = secure_url;

        //guardo o actualizo en la basse de datos la imagen
         model.save();

        res.status(200).json({ 
            msg: 'Imagen actualizada correctamente',
            model
        });
    }

    const getImage = async( req, res = response ) => {

        const { id, collection } = req.params;

        let model;
        switch (collection) {
            case 'users':
                model = await User.findById(id);
                if( !model ){
                    return res.status(400).json({
                        msg: `No existe el usuario con el id ${ id }`
                    });
                }
                break;
            default:
                res.status(500).json({ msg: 'instruccion no programada aun'});
                break;
        }

        // verificamos si existe la image
        if( model.img ){

            const { img } = model;
          res.status(200).json({ 
            model,
            img
          });
           
        }

        // si no existiera la imagen regresamos una por defecto
        const pathImagen = path.join( __dirname, '../assets', 'no-image.png');
        return res.sendFile( pathImagen );
    }

module.exports = {
    uptadeImgCloudinary,
    getImage 
}