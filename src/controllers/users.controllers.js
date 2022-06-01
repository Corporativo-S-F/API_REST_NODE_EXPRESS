const {response, request} = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')


const usuariosGet = (req = request,res=response)=>{

    const {page=1,limit=5} = req.query;

    res.json({
        msg:'get API',
        page,
        limit
    })
}

const usuariosPost = async (req = request,res=response)=>{

    const {nombre, correo, password, rol} = req.body; 
    const usuario = new Usuario({nombre, correo, password, rol});
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save();//guarda el registro si cumple con todos los campos

    res.json({
        usuario
    })
}

const usuariosPut = async(req = request,res=response)=>{

    const id = req.params.id
    const {password, google, ...body} = req.body;

    //validar en bd
    if(password){
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(password, salt)   
    }

    const usuario = await Usuario.findByIdAndUpdate(id, body);

    res.json({
        msg:'put API',
        id
    })
}

const usuariosDelete = (req = request,res=response)=>{
    res.json({
        msg:'delete API'
    })
}


module.exports={
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPut
}