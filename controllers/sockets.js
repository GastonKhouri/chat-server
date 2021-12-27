const Mensaje = require( '../models/mensaje' );
const Usuario = require( '../models/usuario' );


const usuarioConectado = async ( uid = '' ) => {

    try {

        const usuario = await Usuario.findByIdAndUpdate( uid, { online: true }, { new: true } );
        return usuario;

    } catch ( error ) {

        console.log( error );

    }

};

const usuarioDesconectado = async ( uid = '' ) => {

    try {

        const usuario = await Usuario.findByIdAndUpdate( uid, { online: false }, { new: true } );
        return usuario;

    } catch ( error ) {

        console.log( error );

    }

};

const getUsuarios = async () => {

    try {

        const usuarios = await Usuario.find().sort( '-online' );
        return usuarios;

    } catch ( error ) {

        console.log( error );

    }

};

const grabarMensaje = async ( payload ) => {

    try {

        const mensaje = new Mensaje( payload );
        await mensaje.save();

        return mensaje;

    } catch ( error ) {

        console.log( error );

    }

};

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
    grabarMensaje
};