const app = require('./config/express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('io', io);
const port = process.env.PORT || 3000;

http.listen(port, function(){
    console.log("Servidor Rodando...");
});
