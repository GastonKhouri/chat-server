const {
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
    grabarMensaje
} = require( '../controllers/sockets' );

const { comprobarJWT } = require( '../helpers/generate-jwt' );

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();

    }

    socketEvents() {

        // On connection
        this.io.on( 'connection', async ( socket ) => {

            // Validar JWT
            // Si el token no es valido desconectar
            const token = socket.handshake.query[ 'x-token' ];

            const [ valido, uid ] = comprobarJWT( token );

            if ( !valido ) {
                console.log( 'Socket no identificado' );
                return socket.disconnect();
            }

            // Saber que usuario esta activo mediante UID
            await usuarioConectado( uid );

            // Emitir todos los usuarios conectados
            this.io.emit( 'lista-usuarios', await getUsuarios() );

            // Unir al usuario a una sala de socket.io
            socket.join( uid );

            // Escuchar cuando el cliente manda un mensaje
            socket.on( 'mensaje-personal', async ( payload ) => {

                const mensaje = await grabarMensaje( payload );
                this.io.to( payload.para ).emit( 'mensaje-personal', mensaje );
                this.io.to( payload.de ).emit( 'mensaje-personal', mensaje );

            } );

            // Disconnect
            // Marcar en la db que el usuario se desconecto
            socket.on( 'disconnect', async () => {

                await usuarioDesconectado( uid );
                this.io.emit( 'lista-usuarios', await getUsuarios() );

            } );

        } );

    }

}

module.exports = Sockets;