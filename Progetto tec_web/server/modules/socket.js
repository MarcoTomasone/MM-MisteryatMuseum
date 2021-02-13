const { Socket } = require("socket.io");
const path = require("path");
const fs = require("fs");

const createFile = (player, story) => {
    const dirPath = path.join(__dirname, '../statusFiles/');
    const storyPath = path.join(__dirname, `../statusFiles/${story}/`);
    const filePath = path.join(__dirname, `../statusFiles/${story}/${player}.json`);
    if (!fs.existsSync(dirPath))
        fs.mkdirSync(dirPath);
    if(!fs.existsSync(storyPath))
        fs.mkdirSync(storyPath);
    fs.writeFileSync(filePath, JSON.stringify(storiesActive[story][player]));
    fs.chmodSync(filePath, 511);
}

const setPlayer = () => {
    let max = 0;
    for(story in storiesActive) {
        for(player in storiesActive[story]) {
            const tmp = player.replace('player', "");
            max = max > tmp ? max : tmp;  
        }
    }
    const myPath = path.join(__dirname, '../statusFiles');
    if(fs.existsSync(myPath)) {
        fs.readdirSync(myPath).forEach((dir) => {
            fs.readdirSync(`${myPath}/${dir}`).forEach((file) => {  
                const tmp = file.split('.').slice(0, -1).join('.').replace('player', "");
                max = max > tmp ? max : tmp;                    
            });                    
        });
    }
    return parseInt(max);
}

module.exports = function(io) {
    global.arrayMessages = {};
    global.arrayHelps = {};
    global.arrayEvaluations = {};
    const socketPlayers = {};
    const socketEvaluator = {};
    let nPlayer = setPlayer();
    let nEvaluator = 0;

    const deletePlayer = (player, story) => {
        delete storiesActive[story][player];
        delete arrayEvaluations[player];
        delete arrayHelps[player];
        delete arrayMessages[player];
        for(const evaluator in socketEvaluator) 
            io.to(socketEvaluator[evaluator]).emit('update-status');
    }
    
   
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
                            storiesActive[story][player].finished = true;
                            if((arrayEvaluations[player] && arrayEvaluations[player].length == 0) || !arrayEvaluations[player]) {
                                createFile(player, story)
                                deletePlayer(player, story)
                                return;
                            }
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
                const story = data.story;
                const player = data.id;
                if(storiesActive[story][player]){
                    storiesActive[story][player].finished = true;
                    if(!arrayEvaluations[player] || (arrayEvaluations[player] && arrayEvaluations[player].length == 0)) {
                        createFile(player, story);
                        deletePlayer(player, story);
                    }
                }
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
                arrayMessages[player].arrived = false;
            });
            socket.on('help-to-player', data => {
                console.log(data);
                console.log(arrayHelps)
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
                const story = data.story;
                if(data.type == 'message' && arrayMessages[player]){
                    arrayMessages[player].arrived = false;
                }
                else if(arrayEvaluations[player]) {
                    io.to(socketPlayers[player]).emit('add-points', { points: data.points });
                    arrayEvaluations[player].forEach((item, index) => {
                        if(item.id == id)
                            arrayEvaluations[player].splice(index, 1);
                    });
                    if(arrayEvaluations[player] && arrayEvaluations[player].length == 0 && storiesActive[story] && storiesActive[story][player].finished) {
                        createFile(player, story);
                        deletePlayer(player, story);
                    }
                }
            });
        }
    })  
}