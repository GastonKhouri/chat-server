/**
 * Path: /api/mensajes
 */

const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { obtenerChat } = require( '../controllers/mensajes' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { validarJWT } = require( '../middlewares/validar-jwt' );


const router = Router();


router.get( '/:de', [

    validarJWT,

    check( 'de', 'No es un uid válido' ).isMongoId(),

    validarCampos

], obtenerChat );


module.exports = router;