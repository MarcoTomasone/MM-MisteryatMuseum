module.exports = function(io) {
    io.on('connection', socket => {
        socket.on('send-chat-message', data => {
            socket.broadcast.emit('chat-message', {message : data.message , name :"Admin", id: data.id});
        })

        socket.on('send-help-text', data => {
            //socket.broadcast.emit('help-text', {text : data.text , name :"Il fornaio: ", id: data.id});
        })

        socket.on('send-humanEvaluation', data => {
            
        })
    })  
}