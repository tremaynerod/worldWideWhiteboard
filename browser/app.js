// Never seen window.location before?
// This object describes the URL of the page we're on!
var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});
whiteboard.on('draw', function(start,end,strokeColor){
    socket.emit("draw",start, end, strokeColor)
})

socket.on("disconnect", function(){
    console.log(':(')
})


