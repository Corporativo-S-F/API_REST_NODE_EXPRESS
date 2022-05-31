const {response, request} = require('express');


const usuariosGet = (req = request,res=response)=>{

    const {page=1,limit=5} = req.query;

    res.json({
        msg:'get API',
        page,
        limit
    })
}

const usuariosPost = (req = request,res=response)=>{

    const {nombre, edad} = req.body;

    res.json({
        msg:'post API',
        nombre,
        edad
    })
}

const usuariosPut = (req = request,res=response)=>{

    const id = req.params.id

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