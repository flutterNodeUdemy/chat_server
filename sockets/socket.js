const { io } = require('../index');

io.on('connection', client => {
    console.log('cliente conectado');
    client.on('connect', data => {
        console.log('cliente conectado');
    });

    client.on('disconnect', data => {
        console.log('cliente desconectado');
    });



});
