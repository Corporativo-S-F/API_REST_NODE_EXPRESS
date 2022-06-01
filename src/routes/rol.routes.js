const {Router} = require('express');
const { check } = require('express-validator');
const { rolGet, rolDelete, rolPut, rolPost } = require('../controllers/rol.controllers');
const {RolExiste } = require('../helpers/db-validate');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', rolGet);

router.post('/',[
    check('rol',"El nombre es obligatorio").not().isEmpty(),
    check('rol').custom(RolExiste),
    validarCampos
], rolPost);

router.put('/:id', rolPut);

router.delete('/', rolDelete);

module.exports = router;