var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require('socket.io');

server.on('request', app);

var io = socketio(server);

var draws = {};
var chatHistory = {}

var chatBot = {
    log: function(roomName) {
        io.to(roo)
    }
}
io.on('connection', function(socket) {

    console.log(socket.id, 'connected');

    socket.on('join awesome room', function(roomName) {
        var chatBot = {

                log: function() {
                    var date = Date.now()
                    this.bot(date)
                },
                bot: function(msg) {
                    io.to(roomName).emit('someone sent a message', socket.id, msg)
                }
            }
            //joining the room
        socket.join(roomName);
        if (!chatHistory[roomName]) chatHistory[roomName] = []
        else socket.emit('chat', chatHistory[roomName])
            //whiteboard things
        if (!draws[roomName]) {
            draws[roomName] = [];
        } else {
            socket.emit('board', draws[roomName]);
        }

        socket.on('imDrawing', function(start, end, color) {
            draws[roomName].push({
                start: start,
                end: end,
                color: color
            });
            socket.broadcast.to(roomName).emit('collaboratorDraw', start, end, color);
        });

        //chat things
        socket.on('im sending a message', function(chat) {
            if (chat[0] === '!') {
                chatBot[chat.slice(1)]()
            } else {
                chatHistory[roomName].push(chat)
                io.to(roomName).emit('someone sent a message', socket.id, chat);
            }
        });
    });

});

server.listen(1337, function() {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});