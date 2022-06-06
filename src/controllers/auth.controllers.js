const {response} = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');

const authPost = async(req, res = response) =>{

    const {correo, password} = req.body;

    try{
        
        //verificar que el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:"Usuario / Password no es correcto"
            })
        }

        //Si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:"No existe el usuario"
            })
        }

        //verificar la contraseña
        const validPass = bcryptjs.compareSync(password, usuario.password);
        if(!validPass){
            return res.status(400).json({
                msg:"Usuario / Password no es correcto"
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);
        

        res.json({
            usuario,
            token
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    } 
}

module.exports = {
    authPost
}