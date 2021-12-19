const bcryptjs = require( 'bcryptjs' );
const { response } = require( 'express' );

const Usuario = require( '../models/usuario' );
const { generarJWT } = require( '../helpers/generate-jwt' );


const newUser = async ( req, res = response ) => {

    const body = req.body;
    const password = body.password;

    try {

        const user = new Usuario( body );

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );

        // Grabar en bd
        await user.save();

        // Generar jwt
        const token = await generarJWT( user.id );

        return res.json( {
            ok: true,
            user,
            token
        } );

    } catch ( error ) {

        console.log( error );

        res.status( 500 ).json( {
            ok: false,
            msg: 'Hable con el administrador'
        } );

    }

};

const login = async ( req, res ) => {

    const { email, password } = req.body;

    try {

        const user = await Usuario.findOne( { email } );

        // Verificar si el correo existe
        if ( !user ) {

            return res.status( 404 ).json( {
                ok: false,
                msg: 'El correo no existe'
            } );

        }

        // Validar password
        const validPassword = bcryptjs.compareSync( password, user.password );

        if ( !validPassword ) {

            return res.status( 404 ).json( {
                ok: false,
                msg: 'Contraseña incorrecta'
            } );

        }

        const token = await generarJWT( user.id );

        return res.json( {
            ok: true,
            user,
            token
        } );

    } catch ( error ) {

        console.log( error );

        res.status( 500 ).json( {
            ok: false,
            msg: 'Hable con el administrador'
        } );

    }

};

const renew = async ( req, res ) => {

    const uid = req.uid;

    try {

        const user = await Usuario.findById( uid );

        const token = await generarJWT( uid );

        return res.json( {
            ok: true,
            user,
            token
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
    newUser,
    login,
    renew
};