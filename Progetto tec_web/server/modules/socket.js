const { Socket } = require("socket.io");

module.exports = function(io) {
    global.arrayMessages = {};
    global.arrayHelps = {};
    global.arrayEvaluations = {};
    const socketPlayers = {};
    const socketEvaluator = {};
    /*arrayHelps["Card0"] = [ {question: "Quanto sono bravo?", id: 0}, {question: "Ti piace la frutta?", id: 1}];
    arrayHelps["Card1"] = [ {question: "Quanto sono bravo a scuola?", id: 0}, {question: "Ti piace la frutta?", id: 1}];

    arrayEvaluations["Card0"] = [ {question: "Quanto sono bravo?", answer: "poco", type: "text", id: 0}, {question: "Ti piace la frutta?", answer: "poco", type: "text", id: 1}];
    arrayEvaluations["Card1"] = [ {question: "Quanto sono bravo a scuola?", answer: "poco", type: "text", id: 0}, {question: "Ti piace la frutta?", type: "text", answer: "poco", id: 1}];
    */

    /*
    const nPlayer = 00000;
    socket.on('new-player', data => {
        nPlayer += 000001;
        const id = 'player'+nPlayer;
        socketPlayers[id] = socket.id;
        io.to(socketPlayers[id]).emit('set-id', { id } );
        io.to(socketEvaluator["evaluator0"]).emit('update-status');
    });
    */
   
    io.on('connection', socket => {
        const type = socket.handshake.query.type;
        if(type == 'player'){
            socket.on('new-player', data => {
                socketPlayers[data.playerID] = socket.id;
                io.to(socketEvaluator["evaluator0"]).emit('update-status');
            });
            socket.on('send-to-evaluator', data => {
                io.to(socketEvaluator["evaluator0"]).emit('message-from-player', {message : data.message , name :data.id, id: data.id});
                if(!arrayMessages[data.id])
                    arrayMessages[data.id] = { messages: [], arrived: false };
                arrayMessages[data.id].messages.push(`<b>${data.id}</b>: ${data.message}`);
                arrayMessages[data.id].arrived = true;
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
                io.to(socketEvaluator["evaluator0"]).emit('help-from-player', { question, id, player, section });
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
                io.to(socketEvaluator["evaluator0"]).emit('answer-from-player', { question, answer, type, id, section, player });
            });
            socket.on('data-update', data => {
                io.to(socketEvaluator["evaluator0"]).emit('update-status');
            })
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
                console.log(data);
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
                console.log(arrayHelps);
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