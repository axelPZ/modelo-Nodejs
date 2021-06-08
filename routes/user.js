
// IMPORTACIONES
const { Router } = require('express');
const { check } = require('express-validator');
const { getAll, getById, update, create, deleteUser, getParams, updateEmailPassword } = require('../controllers/user');

// VALIDACIONES HELPERS
const { isValidRole, emailExists, userExist } = require('../helpers/db-validation');

// VALIDACION MIDDLEWARES
const { validateFields, validateJWT, isAdminRole, hasRole } = require ('../middlewares');


const router = Router();

// AGREGAR USUARIO
router.post('/',[ 
    check('name', 'El Nombre es obligatorio').not().isEmpty(),
    check( 'email', "El correo no es valido").isEmail(),
    check( 'email').custom( emailExists ),
    check('password', 'El Password debe de ser mas de 6 letras').isLength({ min: 6}),
    check('role').custom( isValidRole ),
    validateFields
],create );

// LLAMAR A TODOS LOS USUARIOS
router.get('/', getAll );

// LLAMAR POR ID EL USUARIO
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( userExist ),
    validateFields
], getById );

// ACTUALIZAR USUARIO
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( userExist ),
    check('role').custom( isValidRole ),
    validateFields
], update );

// ELIMINAR USUARIO
router.delete('/:id', [
    validateJWT,
    // isAdminRole, // se requiere un rol de ADMIN_ROLE
    hasRole( 'ADMIN_ROLE','VENTAS_ROLE' ),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( userExist ),
    validateFields
],deleteUser );

// para obtener varios parametros en la url
router.patch('/', getParams);

// CAMBIAR EMAIL Y PASSWORD
router.put('/email/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( userExist ),
    check( 'email', "El correo no es valido").isEmail(),
    check( 'email').custom( emailExists ),
    check('password', 'El Password debe de ser mas de 6 letras').isLength({ min: 6}),
    validateFields
],updateEmailPassword );


module.exports = router;