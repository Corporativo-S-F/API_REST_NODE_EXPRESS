const {Router} = require('express')
const {check} = require('express-validator');
const { authPost } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo',"El correo es obligatorio").isEmail(),
    check('password',"La contraseña es obligatoria").not().isEmpty(),
    validarCampos 
], authPost);


module.exports = router;