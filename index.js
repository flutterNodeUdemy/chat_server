const express = require('express');
const path = require('path');
require('dotenv').config();
const { dbConnection } = require('./database/config');

dbConnection();

const port = process.env.PORT
const app = express();


// habilitar cors
const cors = require("cors");
app.use(cors());

// lectura parseo body

app.use(express.json());

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server, {
    allowEIO3: true, // false by default
    // cors: {
    //     origin: '*',
    // }
});
require('./sockets/socket');




//path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


//rutas 
app.use('/api/login', require('./routes/auth'))
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/mensajes', require('./routes/mensajes'))





server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo puerto... ${port}`);
})