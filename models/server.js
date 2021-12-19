const express = require( 'express' );
const http = require( 'http' );
const socketio = require( 'socket.io' );
const path = require( 'path' );
const cors = require( 'cors' );

const Sockets = require( './sockets' );
const { dbConnection } = require( '../database/config' );

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Conectar a DB
        dbConnection();

        // Http Server
        this.server = http.createServer( this.app );

        // Configuraciones de sockets
        this.io = socketio( this.server );

        // Middlewares
        this.middlewares();

        // Conexion sockets
        this.sockets();

    }

    middlewares() {

        // Desplegar directorio publico
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        // CORS
        this.app.use( cors() );

        // Parseo del body
        this.app.use( express.json() );

        // Endpoints
        this.app.use( '/api/login', require( '../router/auth' ) );
        this.app.use( '/api/mensajes', require( '../router/mensajes' ) );

    }

    sockets() {
        // Conexion de un cliente
        new Sockets( this.io );
    }

    listen() {

        this.server.listen( this.port, () => {
            console.log( 'Server corriendo en puerto:', this.port );
        } );

    }

}

module.exports = Server;