/**
 * Path: /api/login
 */

const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { newUser, login, renew } = require( '../controllers/auth' );
const { existeEmail } = require( '../helpers/db-validadors' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { validarJWT } = require( '../middlewares/validar-jwt' );

const router = Router();

// Login
router.post( '/', [

    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'password', 'El password es obligatorio' ).notEmpty(),

    validarCampos

], login );

// Crear nuevos usuarios
router.post( '/new', [

    check( 'nombre', 'El nombre es obligatorio' ).notEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'password', 'El password es obligatorio' ).isLength( { min: 6 } ),

    check( 'email' ).custom( existeEmail ),

    validarCampos

], newUser );

// Renovar token
router.post( '/renew', validarJWT, renew );


module.exports = router;