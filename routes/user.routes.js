const {Router} = require('express');
const { usuariosGet, usuariosDelete, usuariosPut, usuariosPost } = require('../controllers/users.controllers');

const router = Router();

router.get('/', usuariosGet);

router.post('/', usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/', usuariosDelete);

module.exports = router;