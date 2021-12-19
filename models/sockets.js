
class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();

    }

    socketEvents() {

        // On connection
        this.io.on( 'connection', ( socket ) => {

            // TODO: Validar JWT
            // Si el token no es valido desconectar

            // TODO: Saber que usuario esta activo mediante UID

            // TODO: Emitir todos los usuarios conectados

            // TODO: Socket join, uid

            // TODO: Escuchar cuando el cliente manda un mensaje
            // Mensaje-personal

            // TODO: Disconnect
            // Marcar en la db que el usuario se desconecto

        } );

    }

}

module.exports = Sockets;