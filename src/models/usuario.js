const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required:[true, "El nombre es obligatio"]
    },
    correo:{
        type:String,
        required:[true, "El correo es obligatorio"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required:true
    },
    google:{
        type:Boolean,
        default:false
    },
    estado:{
        type:Boolean,
        default:true
    },
    status: {
        type:String,
        default:"active"
    }
})

//modifica el objeto para hacer el return de __V y password
UsuarioSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id
    return usuario
}

module.exports = model('Usuario',UsuarioSchema)