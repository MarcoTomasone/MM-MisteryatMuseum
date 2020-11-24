module.exports = function(io) {
    io.on('connection', socket => {
        socket.on('send-chat-message', data => {
            socket.broadcast.emit('chat-message', {message : data.message , name :"Admin", id: data.id});
        })
    })   
}