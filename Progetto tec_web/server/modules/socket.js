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
                //io.to(socketEvaluator["evaluator0"]).emit('message-from-player', {message : data.message , name :"Player0", id: data.id});
                socket.broadcast.emit('message-from-player', {message : data.message , name :"Card0", id: "Card0"})
            });
            socket.on('send-help-text', data => {
                //socket.broadcast.emit('help-text', {text : data.text , name :"Il fornaio: ", id: data.id});
            });
            socket.on('send-humanEvaluation', data => { 
            });
        }
        else if(type == 'evaluator'){
            const evaluator = socket.handshake.query.id;
            socket.on('new-evaluator', data => {
                socketEvaluator[evaluator] = socket.id;
            });
            socket.on('send-to-player', data => {
                //io.to(socketPlayers[data.id]).emit('message-from-evaluator', {message : data.message , name :"Admin", id: data.id});
                socket.broadcast.emit('message-from-evaluator', {message : data.message , name :"Admin", id: data.id})
            });
        }
    })  
}