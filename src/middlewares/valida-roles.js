const {response} = require('express')

const esAdminRole = (req, res=response, next)=>{

    if(!req.userauth){
        return res.status(500).json({
            msg:"Se requiere varificar el role - token no validado"
        })
    }

    const {rol, nombre} = req.userauth;

    if(rol!=='ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no es administrador - Sin autorización`
        })
    }

    next()
}

const rolesPermitidos = (...roles)=>{

    return (req, res=response, next) => {
        if(!req.userauth){
            return res.status(500).json({
                msg:"Se requiere varificar el role - token no validado"
            })
        }
        if(!roles.includes(req.userauth.rol)){
            return res.status(401).json({
                msg:"El rol del usuario no es valido"
            })
        }
        next()
    }
}

module.exports = {
    esAdminRole,
    rolesPermitidos
}