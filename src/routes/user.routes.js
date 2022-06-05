const {Router} = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosDelete, usuariosPut, usuariosPost, usuariosGetById } = require('../controllers/users.controllers');
const { esRoleValido, emailExiste, existeUsuarioPorId, cambiarRolEliminado } = require('../helpers/db-validate');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);
router.get('/:id', usuariosGetById);

router.post('/',[
    check('correo',"El correo no es válido").isEmail(),
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('password',"La contraseña es obligatorio").not().isEmpty(),
    check('password',"La contraseña debe tener más de 8 caracteres").isLength({min:8}),
    //check('rol',"No es un Rol válido").isIn(["ADMIN_ROLE","USER_ROLE"]),
    check('rol').custom((rol)=>esRoleValido(rol)),
    check('correo').custom((correo)=>emailExiste(correo)),
    validarCampos
], usuariosPost);

router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.delete('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;