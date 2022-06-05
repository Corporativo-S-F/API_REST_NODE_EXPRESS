const {Router} = require('express');
const { check } = require('express-validator');
const { rolGet, rolDelete, rolPut, rolPost } = require('../controllers/rol.controllers');
const {RolExiste, cambiarRolEliminado, existeRolPorId } = require('../helpers/db-validate');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', rolGet);

router.post('/',[
    check('rol',"El nombre del rol es obligatorio").not().isEmpty(),
    check('rol').custom(RolExiste),
    validarCampos
], rolPost);

router.put('/:id',[
    check('rol',"El nombre del rol es obligatorio").not().isEmpty(),
    validarCampos
], rolPut);

router.delete('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeRolPorId),
    check('id').custom(cambiarRolEliminado),
    validarCampos
], rolDelete);

module.exports = router;