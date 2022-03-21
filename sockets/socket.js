const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDeconectado, grabarMensaje } = require('./../controllers/socket')

io.on('connection', (client) => {

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    if (!valido) {
        console.log('cliente no valido');
        return client.disconnect();
    }



    usuarioConectado(uid);
    client.join(uid);

    client.on('mensaje-personal', async (payload) => {
        console.log(payload);
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);

    });


    client.on('connect', data => {
        usuarioConectado(uid);
        console.log('cliente conectado');
    });


    client.on('disconnect', data => {
        usuarioDeconectado(uid);
        console.log('cliente desconectado');
    });
});
