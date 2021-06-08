const { response } = require('express');

// para trabajar con las rutas, NodeJs
const path = require('path');
// para trabajar con los file, NodeJs
const fs = require('fs');

const  { fileUploads }  = require('../helpers/file-upload');

const User = require('../models/user');

// SUBIR ARCHIVOS
const fileUpload = async (req, res = response ) => {

    try {
    
       // GUARDAR ARCHIVO

        // si queremos especificar la carpeta y las extenciones
            // const name = await fileUploads( req.files, ['txt'], 'textos');

        // si se quiere especificar solo la carpeta y que tomo las extenciones por defecto
            // const name = await fileUploads( req.files, undefined, 'textos');

        const name = await fileUploads(req.files);

        res.status(200).json({
            msg:'archivo subido correctamente',
            name
        });
        
    } catch (msg) {
        res.status(400).json({ msg });
    }
}


// GUARDAR O ACTUALIZAR IMAGEN AL USUARIO
    const updateImg = async(req, res =  response) => {

        const { id, collection } = req.params;
        
        // traemos el modelo segun la coleccion
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
  
              // creamos el path donde se encuentra la imagen anteriror
              const pathImagen = path.join( __dirname, '../uploads', collection, model.img);
  
              //verificamos si existe la imagen
              if( fs.existsSync( pathImagen ) ){
  
                  //borramos la imagen
                  fs.unlinkSync( pathImagen );
              }
          }
  
          //actualizar imagen
          const name = await fileUploads(req.files, undefined, collection);
          model.img = name;
          model.save();
  
          res.status(200).json({ 
              msg: 'Imagen actualizada correctamente',
              model
            });
    }

// MOSTRAR LA IMAGEN
    const getImg = async(req, res = response) => {
        
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

            // __dirname = igual al baseUrl() de php, nos dirigimos a la carpeta "uploads" le decimos que coleccion, y luego el nombre de la imagen
            const pathImagen = path.join( __dirname, '../uploads', collection, model.img);

            //verificamos si existe la imagen
            if( fs.existsSync( pathImagen ) ){
                
                //cargar la imagen
                return res.sendFile( pathImagen );
            }
        }

        // si no existiera la imagen regresamos una por defecto
        const pathImagen = path.join( __dirname, '../assets', 'no-image.png');
        return res.sendFile( pathImagen );
}

module.exports = {
    fileUpload,
    updateImg,
    getImg
}