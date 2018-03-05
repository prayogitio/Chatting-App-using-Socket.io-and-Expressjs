var express = require('express');
var app = express();
var path = require('path');
var todoController = require("./controllers/todoController");
var socket = require('socket.io');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static((path.join(__dirname, 'public'))));

todoController(app);

var server = app.listen(process.env.PORT || 8000, function() {
    console.log('server online ...');
});

var io = socket(server);
io.on('connection', function(socket) {
    console.log('Socket Connected...', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});