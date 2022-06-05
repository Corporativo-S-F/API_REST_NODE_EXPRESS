const {response, request} = require('express');

const Rol = require('../models/roles')


const rolGet = async (req = request,res=response)=>{

    const rol = await Rol.find()

    res.json({
        rol
    })
}

const rolPost = async (req = request,res=response)=>{

    const {rol} = req.body; 
    const rolreg = new Rol({rol});

    //encriptar la contraseña
    await rolreg.save();//guarda el registro si cumple con todos los campos

    res.json({
        msg:'post API',
        rolreg
    })
}

const rolPut = async (req = request,res=response)=>{

    const id = req.params.id
    const body = req.body;

    const rol = await Rol.findByIdAndUpdate(id, body);

    res.json({
        rol
    })
}

const rolDelete = async (req = request,res=response)=>{
    
    const {id} = req.params

    //borrar el registro fisicamente
    const rol = await Rol.findByIdAndDelete(id);

    res.json({
        id,
    })
}


module.exports={
    rolDelete,
    rolGet,
    rolPost,
    rolPut
}