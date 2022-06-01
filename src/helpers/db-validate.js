const Rol = require('../models/roles')
const Usuario = require('../models/usuario')

//validar si el rol ya existe en el modelo rol
const RolExiste = async(rol='')=>{
    const existeRol = await Rol.findOne({rol});
    if(existeRol){
        throw new Error(`El rol ${rol} está registrado en la base de datos`)
    }
}


//validar si el rol no existe del modelo Rol
const esRoleValido = async(rol='')=>{
    const existeRol = await Rol.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }
}

//validar si correo existe del modelo usuario
const emailExiste = async (correo = '')=>{
    //verificar si el correo existe
    const existEmail = await Usuario.findOne({correo});
    console.log(existEmail)
    if(existEmail){
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    RolExiste
}