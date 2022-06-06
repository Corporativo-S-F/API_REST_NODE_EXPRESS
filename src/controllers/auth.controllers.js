const {response, json} = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res=response)=>{
    const {id_token}=req.body;
    try{
        const {nombre, img, correo} = await googleVerify(id_token)

        let usuario = await Usuario.findOne({correo})
        if(!usuario){
            const data = {
                nombre,
                correo,
                password:":p",
                img,
                google:true,
                rol:"FREE_ROLE"
            };

            usuario = new Usuario(data)
            await usuario.save()
        }

        //Si el usuario en BD
        if(!usuario.estado){
            return res.status(401).json({
                msg:"estado en false - usuario bloqueado"
            })
        }

        //generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
    }catch(err){
        
        console.log(err)
        res.status(400).json({
            ok:false,
            msg:"El token no se pudo verificar"
        })
    }
}

module.exports = {
    authPost,
    googleSignIn
}