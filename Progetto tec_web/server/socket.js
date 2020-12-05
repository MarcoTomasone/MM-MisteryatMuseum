const { Socket } = require("socket.io");

module.exports = function(io) {
    
    const socketDictionary = {};
    let counter = 0;
    
    io.on('connection', socket => {
       
        socket.on('new-user', data => {
            socketDictionary[data.playerID + counter] = socket.id;
            counter = counter + 1;
        })

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