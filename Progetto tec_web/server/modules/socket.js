const { Socket } = require("socket.io");
const fs = require("fs");

module.exports = function(io) {
    global.arrayMessages = {};
    global.arrayHelps = {};
    global.arrayEvaluations = {};
    const socketPlayers = {};
    const socketEvaluator = {};
    let nPlayer = 0;
    let nEvaluator = 0;
   
    io.on('connection', socket => {
        const type = socket.handshake.query.type;
        socket.on('data-update', data => {
            for(const evaluator in socketEvaluator)
                io.to(socketEvaluator[evaluator]).emit('update-status');
        });
        if(type == 'player'){
            socket.on('new-player', data => {
                nPlayer += 1;
                const id = 'player' + nPlayer;
                socketPlayers[id] = socket.id;
                io.to(socketPlayers[id]).emit('set-id', { id } );
                const toDo = () => {
                    for(const evaluator in socketEvaluator)
                        io.to(socketEvaluator[evaluator]).emit('update-status')
                };
                setTimeout(toDo, 2500);
                
            });
            socket.on('disconnect', (req, res) => {
                let playerToDelete;
                for(const player in socketPlayers)
                    if(socketPlayers[player] == socket.id) {
                        playerToDelete = player;
                        delete socketPlayers[player];
                    }
                for(const story in storiesActive)
                    for(const player in storiesActive[story])
                        if(player == playerToDelete) {
                            delete storiesActive[story][playerToDelete];
                            delete arrayEvaluations[playerToDelete];
                            delete arrayHelps[playerToDelete];
                            delete arrayMessages[playerToDelete];
                            for(const evaluator in socketEvaluator) 
                                io.to(socketEvaluator[evaluator]).emit('update-status');
                            return;
                        }
            });
            socket.on('send-to-evaluator', data => {
                const message = data.message;
                const name = data.id;
                const id = data.id;
                for(const evaluator in socketEvaluator)
                    io.to(socketEvaluator[evaluator]).emit('message-from-player', { message , name, id });
                if(!arrayMessages[id])
                    arrayMessages[id] = { messages: [], arrived: false };
                arrayMessages[id].messages.push(`<b>${id}</b>: ${message}`);
                arrayMessages[id].arrived = true;
            });
            socket.on('send-help-text', data => {
                const player = data.id;
                const question = data.question;
                const section = data.section;
                const nElem = data.nElem;
                if(!arrayHelps[player])
                    arrayHelps[player] = [];
                const id = arrayHelps[player].length;
                arrayHelps[player].push({ question, id, nElem, section });
                for(const evaluator in socketEvaluator)
                    io.to(socketEvaluator[evaluator]).emit('help-from-player', { question, id, player, section });
            });
            socket.on('send-humanEvaluation', data => {
                const player = data.id;
                const question = data.question;
                const answer = data.answer;
                const type = data.type;
                const section = data.section;
                if(!arrayEvaluations[player])
                    arrayEvaluations[player] = [];
                const id = arrayEvaluations[player].length;
                arrayEvaluations[player].push({ question, answer, type, id, section });
                for(const evaluator in socketEvaluator)
                    io.to(socketEvaluator[evaluator]).emit('answer-from-player', { question, answer, type, id, section, player });
            });
            socket.on('finish', data => {
                //io.to(socketEvaluator[evaluator]).emit('finish-player', {"Ho finito"});
            });
        }
        else if(type == 'evaluator'){
            const evaluator = socket.handshake.query.id;
            socket.on('new-evaluator', data => {
                nEvaluator += 1;
                const id = 'evaluator' + nEvaluator;
                socketEvaluator[id] = socket.id;
            });
            socket.on('disconnect', (req, res) => {
                for(const evaluator in socketEvaluator)
                    if(socketEvaluator[evaluator] == socket.id)
                        delete socketEvaluator[evaluator];
            });
            socket.on('send-to-player', data => {
                const player = data.id;
                const message = data.message;
                io.to(socketPlayers[player]).emit('message-from-evaluator', {message : message , name :"Admin", id: player});
                if(!arrayMessages[player])
                    arrayMessages[player] = { messages: [], arrived: false };
                arrayMessages[player].messages.push(`<b>You</b>: ${message}`);
                arrayMessages[player].arrived = true;
                //socket.broadcast.emit('message-from-evaluator', {message : data.message , name :"Admin", id: data.id})
            });
            socket.on('help-to-player', data => {
                const answer = data.answer;
                const id = data.id;
                const player = data.player;
                if(arrayHelps[player]) {
                    arrayHelps[player].forEach((item, index) => {
                        if(item.id == id) {
                            io.to(socketPlayers[player]).emit('help-from-evaluator', { answer : answer, nElem: item.nElem, section: item.section });
                            arrayHelps[player].splice(index, 1);
                        }
                    });
                }
            });
            socket.on('read-message', data => {
                const id = data.id;
                const player = data.player;
                if(data.type == 'message' && arrayMessages[player]){
                    arrayMessages[player].arrived = false;
                }
                else if(arrayEvaluations[player]) {
                    arrayEvaluations[player].forEach((item, index) => {
                        if(item.id == id)
                            arrayEvaluations[player].splice(index, 1);
                    });
                    io.to(socketPlayers[player]).emit('add-points', { points: data.points });
                }
            });
            socket.on('delete-player', data => {
                if(arrayMessages[data.id]){
                    delete arrayMessages[data.id];
                    delete arrayEvaluations[data.id];
                    delete arrayHelps[data.id];
                }
            })
        }
    })  
}