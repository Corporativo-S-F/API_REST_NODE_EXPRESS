const {response, request} = require('express');

const Rol = require('../models/roles')


const rolGet = (req = request,res=response)=>{

    const {page=1,limit=5} = req.query;

    res.json({
        msg:'get API',
        page,
        limit
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

const rolPut = (req = request,res=response)=>{

    const id = req.params.id

    res.json({
        msg:'put API',
        id
    })
}

const rolDelete = (req = request,res=response)=>{
    res.json({
        msg:'delete API'
    })
}


module.exports={
    rolDelete,
    rolGet,
    rolPost,
    rolPut
}