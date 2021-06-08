const { Router } = require('express');
const { check } = require('express-validator');

//importar el controlador
const { fileUpload , updateImg, getImg } = require('../controllers/uploads');
const { validCollection } = require('../helpers/db-validation');

//importo el middleware que valida los campos
const { validateFields, validateUploads } = require('../middlewares');

const router = Router();


//subir archivo
router.post( '/',validateUploads, fileUpload  );

//subir o actualizar foto de usuarios o productos
router.put('/:collection/:id',[
        check('id','No es un id de Mongo valido').isMongoId(),
        check('collection').custom( c => validCollection( c , ['users','products'])),//validamos las colecciones que permitiremos, la "c" es la coleccion que nos mandan
        validateUploads,
        validateFields
],updateImg)

//cargar imagen 
router.get('/:collection/:id',[
        check('id','No es un id de Mongo valido').isMongoId(),
        check('collection').custom( c => validCollection( c , ['users','products'])),//validamos las colecciones que permitiremos, la "c" es la coleccion que nos mandan
        validateFields
], getImg)


module.exports = router;