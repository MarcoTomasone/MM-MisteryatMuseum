const { Socket } = require("socket.io");

module.exports = function(io) {
    
    const socketPlayers = {};
    const socketEvaluator = {};
    let counter = 0;

    io.on('connection', socket => {
        const type = socket.handshake.query.type;
        if(type == 'player'){
            socket.on('new-player', data => {
                socketPlayers[data.playerID] = socket.id;
            });
            socket.on('send-to-evaluator', data => {
                io.to(socketEvaluator["evaluator0"]).emit('message-from-player', {message : data.message , name :"Player0", id: data.id});
            });
            socket.on('send-help-text', data => {
                //socket.broadcast.emit('help-text', {text : data.text , name :"Il fornaio: ", id: data.id});
            });
            socket.on('send-humanEvaluation', data => { 
            });
        }
        else if(type == 'evaluator'){
            socket.on('new-evaluator', data => {
                socketEvaluator["evaluator" + counter] = socket.id;
                counter = counter + 1;
            });
            socket.on('send-to-player', data => {
                io.to(socketPlayers[data.id]).emit('message-from-evaluator', {message : data.message , name :"Admin", id: data.id});
            });
        }
    })  
}