const { response } = require( 'express' );
const Mensaje = require( '../models/mensaje' );


const obtenerChat = async ( req, res = response ) => {

    const myUid = req.uid;
    const { de: mensajesDe } = req.params;

    try {

        const last30 = await Mensaje.find( {
            $or: [
                { de: myUid, para: mensajesDe },
                { de: mensajesDe, para: myUid },
            ]
        } )
            .sort( { createdAt: 'desc' } )
            .limit( 30 );

        return res.json( {
            ok: true,
            mensajes: last30
        } );

    } catch ( error ) {

        console.log( error );

        return res.status( 500 ).json( {
            ok: false,
            msg: 'Hable con el administrador'
        } );

    }

};

module.exports = {
    obtenerChat
};