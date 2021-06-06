const { Router } = require('express');
const { getAll, getById, update, create, deleteUser, getParams } = require('../controllers/user');

const router = Router();


router.get('/', getAll );

router.post('/', create );

router.get('/:id', getById );

router.put('/:id',update );

router.delete('/:id', deleteUser );

// para obtener varios parametros en la url
router.patch('/', getParams);


module.exports = router;