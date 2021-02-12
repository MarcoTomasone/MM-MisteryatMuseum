const fs = require("fs");
const path = require("path");
const { jsPDF } = require("jspdf");
const { dirname } = require("path");
require('jspdf-autotable');

//array of active stories 
global.storiesActive = {};

module.exports = {
    createRoutes: (app) => {
        //get current status of players
        app.get('/status', (req, res) => {
            const story = req.query.story;
            const arrayPlayers = [];
            if(!storiesActive[story])//or is empty
                res.status(404).send({ message: "Story not found" });
            for(id in storiesActive[story]){
                arrayPlayers.push(storiesActive[story][id]);
            }
            const data = JSON.stringify(arrayPlayers);
            res.end(data);
        });

        //get active stories
        app.get('/stories', (req, res) => {
            const storiesPath = path.join(__dirname, '../storiesFolder');
            const stories = [];
            if(fs.existsSync(storiesPath)) {
                fs.readdirSync(storiesPath).forEach((file) => {
                    const json = fs.readFileSync(storiesPath + '/' + file);
                    const info = JSON.parse(json);
                    stories.push({ id: info.id, title: info.title, img: info.player.backgroundImage.match(/([^\/]*)\/*$/)[1] });
                    if(!(info.id in storiesActive))
                        storiesActive[info.id] = {};                  
                });
            }
            const nPlayers = {};
            if(stories.length <= 0)
                return;
            stories.forEach((story) => {
                nPlayers[story.id] = Object.keys(storiesActive[story.id]).length;
            })
            const infoStories = JSON.stringify({stories: stories, nPlayers: nPlayers});
            res.end(infoStories);
        });
        
        //get active players in a story
        app.get('/players', (req, res) => {
            const story = req.query.story;
            if(!storiesActive[story]) 
                res.status(404).send({ message: "Story not found" });
            const players = Object.keys(storiesActive[story]);
            const data = JSON.stringify(players);
            res.status(200).end(data);
        });

        app.get('/finishedPlayers', (req, res) => {
            const story = req.query.story;
            if(!storiesActive[story]) 
                res.status(404).send({ message: "Story not found" });
            const players = [];
            const storyPath = path.join(__dirname, `../statusFiles/${story}/`);
            if(fs.existsSync(storyPath))
                fs.readdirSync(storyPath).forEach((file) => {
                    const info = JSON.parse(fs.readFileSync(storyPath + file));
                    let points = 0;
                    info.sectionArray.forEach((item) => {
                        points += item.points ? item.points : 0;
                    })
                    players.push({ id: info.id, name: info.name, points: points });
                })
            const data = JSON.stringify(players);
            res.status(200).send(data);
        });

        app.get('/allPlayers', (req, res) => {
            const story = req.query.story;
            if(!storiesActive[story]) 
                res.status(404).send({ message: "Story not found" });
            const players = [];
            Object.keys(storiesActive[story]).forEach((player) => {
                players.push({ player, name: storiesActive[story][player].name, finished: false});
            })
            const storyPath = path.join(__dirname, `../statusFiles/${story}`);
            if(fs.existsSync(storyPath))
                fs.readdirSync(storyPath).forEach((file) => {
                    const json = fs.readFileSync(storyPath + '/' + file);
                    const info = JSON.parse(json);
                    players.push({ player: info.id, name: info.name,finished: true });
                })
            const data = JSON.stringify(players);
            res.status(200).send(data);
        });

        app.get('/history', (req, res) => {
            const player = req.query.player;
            const story = req.query.story;
            if(player in storiesActive[story]) {
                const data = JSON.stringify(storiesActive[story][player]);
                res.status(200).send(data);
            }
            else{
                const myPath = path.join(__dirname, `../statusFiles/${story}/${player}.json`);
                if(fs.existsSync(myPath)) {
                    const data = fs.readFileSync(myPath);
                    res.status(200).send(data); 
                }
                else {
                    res.status(404).send({ message: "Players not found" });
                    return;
                }
            }
        });

        app.get('/messages', (req, res) => {
            const messages = JSON.stringify(arrayMessages);
            res.status(200).end(messages);
        });

        app.get('/helps', (req, res) => {
            const helps = JSON.stringify(arrayHelps);
            res.status(200).end(helps);
        });

        app.get('/evaluations', (req, res) => {
            const evaluations = JSON.stringify(arrayEvaluations);
            res.status(200).end(evaluations);
        });

        app.post('/answer', (req, res) => {
            const player = req.body.params.player;
            const story = req.body.params.story;
            const points = req.body.params.points;
            const section = req.body.params.section;
            if(storiesActive[story][player] && storiesActive[story][player].sectionArray[section]) {
                storiesActive[story][player].sectionArray[section].points = parseInt(points);
                res.status(200).send();
            }
            else
                res.status(404).send({ message: "Player not found" });
        })

        app.post('/setName', (req, res) => {
            const player = req.body.params.player;
            const story = req.body.params.story;
            const name = req.body.params.name;
            if(name === "") 
                res.status(400).send({ message: "Empty name" });
            storiesActive[story][player].name = name;
            res.status(200).end();            
        });

        app.delete('deletePlayer', (req, res) => {
            const player = req.body.data.player;
            const story = req.body.data.story;
            if(storiesActive[story][player])
                delete storiesActive[story][player];
        })

        app.get('/pdf', (req, res) => {            
            const player = req.query.player;
            const story = req.query.story;
            let infoPlayer;
            if(player in storiesActive[story] && storiesActive[story][player])
                infoPlayer = storiesActive[story][player];
            else{
                const mypath = path.join(__dirname, `../statusFiles/${story}/${player}.json`);
                if(fs.existsSync(mypath)) {
                    const data = fs.readFileSync(mypath);
                    infoPlayer = JSON.parse(data); 
                }
                else
                    res.status(404).send({ message : "Player Not Exist" });
            }
            const doc = new jsPDF();
            const col = ["Section", "Question", "Answer", "Time", "Points"];
            const rows = [];
            doc.setFontSize(30);
            doc.setFont("calibri");
            doc.text( `${player}`, 100, 15, {align: "center"});
            const answer = []
            infoPlayer.sectionArray.forEach((section, i) => {
                answer.push(section.answer)
                const item = [section.section, section.question, section.answer, section.timer, section.points];
                rows.push(item);
            });
            doc.autoTable(col, rows,  {
                tableLineColor: [189, 195, 199],
                tableLineWidth: 0.3,
                startY: 20,
                columnStyles: {
                    2: {columnWidth: 30},
                },
            });
            const pdf = doc.output();
            res.contentType("application/pdf;charset=utf-8");
            res.send(pdf);
        })

        //post status files of players
        app.post('/updateData', (req, res) => {
            const id = req.body.id; //the json of player
            const sectionArray = req.body.sectionArray;
            const story = req.body.story; //you also have to pass him which story he wants to play
            const name = req.body.name;
            if(!(story in storiesActive))
                storiesActive[story] = {}; //added new story
            if(storiesActive[story][id]){
                const length = storiesActive[story][id].sectionArray.length - 1;
                const lastActivity = storiesActive[story][id].sectionArray[length];
                if(!lastActivity || !sectionArray) {
                    res.sendStatus(404).end();
                    return;
                }
                if(lastActivity.section != sectionArray.section){
                    storiesActive[story][id].sectionArray.push(sectionArray); //push the player in the story  
                } else {
                    lastActivity.timer = sectionArray.timer;
                    lastActivity.answer = sectionArray.answer;
                    if(sectionArray.points)
                        lastActivity.points = sectionArray.points;
                }      
            } else {
                storiesActive[story][id] = {id, name, sectionArray : [sectionArray] };
            }
            res.status(200).send(); 
        });
        
        app.post('/postJson', (req, res) => {
            const player = req.body.id;
            const story = req.body.story;
            const dirPath = path.join(__dirname, '../statusFiles/');
            const storyPath = path.join(__dirname, `../statusFiles/${story}/`);
            const filePath = path.join(__dirname, `../statusFiles/${story}/${player}.json`);
            if (!fs.existsSync(dirPath))
                fs.mkdirSync(dirPath);
            if(!fs.existsSync(storyPath))
                fs.mkdirSync(storyPath);
            //Pubblico il file nel path
            fs.writeFileSync(filePath, JSON.stringify(storiesActive[story][player]));
            res.status(200).end();
        });
    }
}