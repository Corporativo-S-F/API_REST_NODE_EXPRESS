const {Schema, model} = require('mongoose');

const RolesSchema = Schema({
    rol:{
        type: String,
        required:[true, "El nombre del Rol es obligatorio"]
    },
})



module.exports = model('Rol',RolesSchema)