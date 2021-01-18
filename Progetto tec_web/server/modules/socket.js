const { Socket } = require("socket.io");

module.exports = function(io) {
    global.arrayMessages = {};
    global.arrayHelps = {};
    global.arrayEvaluations = {};
    const socketPlayers = {};
    const socketEvaluator = {};
    arrayHelps["Card0"] = [ {question: "Quanto sono bravo?", id: 0}, {question: "Ti piace la frutta?", id: 1}];
    arrayHelps["Card1"] = [ {question: "Quanto sono bravo a scuola?", id: 0}, {question: "Ti piace la frutta?", id: 1}];

    arrayEvaluations["Card0"] = [ {question: "Quanto sono bravo?", answer: "poco", type: "text", id: 0}, {question: "Ti piace la frutta?", answer: "poco", type: "text", id: 1}];
    arrayEvaluations["Card1"] = [ {question: "Quanto sono bravo a scuola?", answer: "poco", type: "text", id: 0}, {question: "Ti piace la frutta?", type: "text", answer: "poco", id: 1}];

    io.on('connection', socket => {
        const type = socket.handshake.query.type;
        if(type == 'player'){
            socket.on('new-player', data => {
                socketPlayers[data.playerID] = socket.id;
            });
            socket.on('send-to-evaluator', data => {
                io.to(socketEvaluator["evaluator0"]).emit('message-from-player', {message : data.message , name :data.id, id: data.id});
                if(!arrayMessages[data.id])
                    arrayMessages[data.id] = { messages: [], arrived: false };
                arrayMessages[data.id].messages.push(`<b>${data.id}</b>: ${data.message}`);
                arrayMessages[data.id].arrived = true;
                //socket.broadcast.emit('message-from-player', {message : data.message , name :"Card0", id: "Card0"})
            });
            socket.on('send-help-text', data => {
                if(!arrayHelps[data.id])
                    arrayHelps[data.id] = []
                arrayHelps.push({ question: data.question, id: arrayHelps[data.id].length });
                //socket.broadcast.emit('help-text', {text : data.text , name :"Il fornaio: ", id: data.id});
            });
            socket.on('send-humanEvaluation', data => {
                if(!arrayEvaluations[data.id])
                    arrayEvaluations[data.id] = [];
                arrayEvaluations.push({ question: data.question, answer: data.answer, type: data.type, id: arrayEvaluations[data.id].length });
                //io.to(socketEvaluator["evaluator0"]).emit('finish-player', {"Ho finito"});
            });
            socket.on('finish', data => {
                //io.to(socketEvaluator["evaluator0"]).emit('finish-player', {"Ho finito"});
            })
        }
        else if(type == 'evaluator'){
            const evaluator = socket.handshake.query.id;
            socket.on('new-evaluator', data => {
                socketEvaluator["evaluator0"] = socket.id;
            });
            socket.on('send-to-player', data => {
                io.to(socketPlayers[data.id]).emit('message-from-evaluator', {message : data.message , name :"Admin", id: data.id});
                if(!arrayMessages[data.id])
                    arrayMessages[data.id] = { messages: [], arrived: false };
                arrayMessages[data.id].messages.push(`<b>You</b>: ${data.message}`);
                arrayMessages[data.id].arrived = true;
                //socket.broadcast.emit('message-from-evaluator', {message : data.message , name :"Admin", id: data.id})
            });
            socket.on('help-to-player', data => {
                const answer = data.answer;
                const id = data.id;
                const player = data.player;
                //io.to(socketPlayers[player]).emit('help-from-evaluator', { answer : answer });
                if(arrayHelps[player]) {
                    arrayHelps[player].forEach((item, index) => {
                        if(item.id == id)
                            arrayHelps[player].splice(index, 1);
                    });
                }
            });
            socket.on('read-message', data => {
                const id = data.id;
                const player = data.player;
                if(data.type == 'message' && arrayMessages[player])
                    arrayMessages[data.id].arrived = false;
                else if(arrayEvaluations[player]) {
                    arrayEvaluations[player].forEach((item, index) => {
                        if(item.id == id)
                            arrayEvaluations[player].splice(index, 1);
                    });
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