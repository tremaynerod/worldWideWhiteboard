var socket = io(location.origin);

socket.on('connect', function() {

    socket.emit('join awesome room', location.pathname.slice(1) || 'default');

    socket.on('board', function(draws) {
        draws.forEach(function(draw) {
            whiteboard.draw(draw.start, draw.end, draw.color);
        });
    });

    whiteboard.on('draw', function(start, end, color) {
        socket.emit('imDrawing', start, end, color);
    });

    socket.on('collaboratorDraw', function(start, end, color) {
        whiteboard.draw(start, end, color);
    });
    socket.on('chat', function(chats) {
        chats.forEach(function(chat) {
            $('#messages').append($('<li>').text(chat))
        })
    })
    socket.on('someone sent a message', function(user, chat) {
        console.log('hello')
        // message = user + '[' + date + ']:' + message
        $('#messages').append($('<li>').text(chat))
    })

});