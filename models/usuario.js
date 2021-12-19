const { Schema, model } = require( 'mongoose' );

const UsuarioSchema = Schema( {

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },

} );

UsuarioSchema.methods.toJSON = function () {
    const { __v, _id, password, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model( 'Usuario', UsuarioSchema );