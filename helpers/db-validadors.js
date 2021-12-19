const Usuario = require( '../models/usuario' );

const existeEmail = async ( email ) => {

    const emailExist = await Usuario.findOne( { email } );

    if ( emailExist ) {
        throw new Error( `El email ${ email } ya está registrado` );
    }

};

module.exports = {
    existeEmail
};