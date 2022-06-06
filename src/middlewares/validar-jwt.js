const { response } = require("express")
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validarJsonWebToken = async(req, res=response, next) =>{

    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg:"No hay un token en la petición"
        });
    }

    try{

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        
        //obtener el usuario al que pertenece el token
        const usuario = await Usuario.findById(uid)

        //si el usuario no existe
        if(!usuario){
            return res.status(401).json({
                msg:"Token no válido - usuario no existe"
            })
        }

        //verificar el estado del usuario autenticado
        if(!usuario.estado){
            return res.status(401).json({
                msg:"Token no válido - usuario no existe"
            })
        }
        
        req.userauth = usuario
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({
            msg:"Token no válido"
        })
    }

    
}



module.exports = {
    validarJsonWebToken
}