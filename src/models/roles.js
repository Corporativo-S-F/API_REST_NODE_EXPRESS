const {Schema, model} = require('mongoose');

const RolesSchema = Schema({
    rol:{
        type: String,
        required:[true, "El nombre del Rol es obligatorio"]
    },
})


//modifica el objeto para hacer el return de __V y password
RolesSchema.methods.toJSON = function(){
    const {__v, ...rol} = this.toObject();
    return rol
}

module.exports = model('Rol',RolesSchema)