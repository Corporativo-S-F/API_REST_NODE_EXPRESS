const Rol = require('../models/roles')
const Usuario = require('../models/usuario')

//validar si el rol ya existe en el modelo rol
const RolExiste = async(rol='')=>{
    const existeRol = await Rol.findOne({rol});
    if(existeRol){
        throw new Error(`El rol ${rol} está registrado en la base de datos`)
    }
}

const existeRolPorId = async(id)=>{
    const existeRol = await Rol.findById(id)
    if(!existeRol){
        throw new Error(`El Rol con ID: ${id} no existe`)
    }
}

//validar si el rol no existe del modelo Rol
const esRoleValido = async(rol='')=>{
    const existeRol = await Rol.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }
}

//convertir registros de rol eliminado a rol default
const cambiarRolEliminado = async(id)=>{

    const {rol} = await Rol.findById(id)
    const usuariosConRolAEliminar = await Usuario.find({rol:rol})
    
    for(const usuario in usuariosConRolAEliminar){
        const parametro = "_id"
        const user = usuariosConRolAEliminar[usuario][parametro]
        await Usuario.findByIdAndUpdate(user, {rol:"USER_ROLE"})
    }
    
    
}


//validar si correo existe del modelo usuario
const emailExiste = async (correo = '')=>{
    //verificar si el correo existe
    const existEmail = await Usuario.findOne({correo});
    if(existEmail){
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
}

const existeUsuarioPorId = async(id)=>{
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error(`El usuario con ID: ${id} no existe`)
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    RolExiste,
    existeUsuarioPorId,
    cambiarRolEliminado,
    existeRolPorId
}