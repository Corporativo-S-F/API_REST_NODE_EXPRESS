const {response, request} = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')


const usuariosGet = async(req = request,res=response)=>{

    const {limit = 10, from=0} = req.query;
    const query  = {estado:true}

    //con promise.all podemos ejecutar promesas de manera simultanea que reduce el tiempo de respuesta a comparaciones de llamar dos promesas por separado
    const [usuarios, total] = await Promise.all([
        Usuario.find(query)
        .skip(Number(isNaN(from)?0:(from<=0?0:from-1)))
        .limit(Number(limit)),
        Usuario.countDocuments(query)
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosGetById = async(req = request,res=response)=>{

    const {id} = req.params
    const usuario = await Usuario.findById(id)

    res.json({
        usuario
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
        usuario
    })
}

const usuariosDelete = async(req = request,res=response)=>{

    const {id} = req.params

    //borrar el registro fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);


    //cambiar el estado del registro
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})

    res.json({
        id,
        "msg":"operación existosa"
    })
}


module.exports={
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPut,
    usuariosGetById
}