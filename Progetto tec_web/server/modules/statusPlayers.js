const fs = require("fs");
const path = require("path");
const { jsPDF } = require("jspdf");
require('jspdf-autotable');

//array of active stories 
global.storiesActive = {};

module.exports = {
    createRoutes: (app) => {
        //get current status of players
        app.get('/status', (req, res) => {
            const story = req.query.story;
            const arrayPlayers = [];
            if(!storiesActive[story]) {//or is empty
                res.sendStatus(404).end();
                return;
            }
            for(id in storiesActive[story]){
                arrayPlayers.push(storiesActive[story][id]);
            }
            const data = JSON.stringify(arrayPlayers);
            res.end(data);
        });

        //get active stories
        app.get('/stories', (req, res) => {
            const stories = Object.keys(storiesActive); // array of all active stories
            const nPlayers = {};
            if(stories.length <= 0)
                return;
            stories.forEach((story) => {
                nPlayers[story] = Object.keys(storiesActive[story]).length;
            })
            const infoStories = JSON.stringify({stories: stories, nPlayers: nPlayers});
            res.end(infoStories);
        });     

        //get players in a story
        app.get('/players', (req, res) => {
            const story = req.query.story;
            if(!storiesActive[story]) {
                res.sendStatus(404).end();
                return;
            }
            const players = Object.keys(storiesActive[story]);
            const data = JSON.stringify(players);
            res.status(200).end(data);
        });

        app.get('/history', (req, res) => {
            const player = req.query.player;
            const story = req.query.story;
            if(player in storiesActive[story]) {
                const data = JSON.stringify(storiesActive[story][player]);
                res.status(200).end(data);
            }
            else{
                const mypath = path.join(__dirname, `statusFiles/${story}/${player}.json`);
                if(fs.existsSync(mypath)) {
                    const data = fs.readFileSync(mypath);
                    res.status(200).end(JSON.stringify(data)); 
                }
                else {
                    res.status(404).end();
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
            if(storiesActive[story][player] && storiesActive[story][player].sectionArray[section])
                storiesActive[story][player].sectionArray[section].points = parseInt(points);
            else {
                res.sendStatus(404).end();
                return;
            }
        })

        app.post('/setName', (req, res) => {
            const player = req.body.params.player;
            const story = req.body.params.story;
            const name = req.body.params.name;
            if(name === "") {
                res.sendStatus(400).end();
                return;
            }
            storiesActive[story][player].name = name;
            res.status(200).end();            
        });

        app.delete('deletePlayer', (req, res) => {
            console.log(req.body);
            const player = req.body.data.player;
            const story = req.body.data.story;
            if(storiesActive[story][player])
                delete storiesActive[story][player];
        })

        app.get('/pdf', (req, res) => {            
            const player = req.query.player;
            const story = req.query.story;
            let infoPlayer;
            if(player in storiesActive[story])
                infoPlayer = storiesActive[story][player];
            else{
                const mypath = path.join(__dirname, `statusFiles/${story}/${player}.json`);
                if(fs.existsSync(mypath)) {
                    const data = fs.readFileSync(mypath);
                    infoPlayer = JSON.parse(data); 
                }
                else {
                    res.status(404).end();
                    return;
                }
            }
            //const path = `./inGame/${story}/${player}.json`;
            if(!storiesActive[story][player]) {
                res.sendStatus(404).end();
                return;
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
                }
            });
            const pdf = doc.output();
            res.contentType("application/pdf;charset=utf-8");
            res.send(pdf);
        })

        function generate() {
            var doc = new jsPDF();
      
        doc.autoTable({
          html: '#mytable',
          bodyStyles: {minCellHeight: 15},
          didDrawCell: function(data) {
            if (data.column.index === 5 && data.cell.section === 'body') {
               var td = data.cell.raw;
               var img = td.getElementsByTagName('img')[0];
               var dim = data.cell.height - data.cell.padding('vertical');
               var textPos = data.cell.textPos;
               doc.addImage(img.src, textPos.x,  textPos.y, dim, dim);
            }
          }
        });
      
            doc.save("table.pdf");
          }

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
                storiesActive[story][id] = {id, name, sectionArray};
            }
            res.status(200).end(); 
        });
        
        app.post('/postJson', (req, res) => {
            const id = req.body.id;
            const story = req.body.story;
            const path = `./statusFiles/`;
            storiesActive[story][id].finished = true;
            const file = path + req.body.id + ".json"
            if (!fs.existsSync(path))
                fs.mkdirSync(path);
            //Pubblico il file nel path
            fs.writeFileSync(file, JSON.stringify(storiesActive[story][id]));
            res.status(200).end();
        });
    }
}