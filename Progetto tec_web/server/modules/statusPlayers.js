const fs = require("fs");
const { jsPDF } = require("jspdf");
require('jspdf-autotable');

//array of active stories 
const storiesActive = {};

//samples for test-----------------------------------------------------------------------------------------
/*const Card0 = JSON.parse(fs.readFileSync('./inGame/Story1/Card0.json', {encoding:'utf8', flag:'r'}));
const Card1 = JSON.parse(fs.readFileSync('./inGame/Story1/Card1.json', {encoding:'utf8', flag:'r'}));

const Card3 = JSON.parse(fs.readFileSync('./inGame/Story2/Card3.json', {encoding:'utf8', flag:'r'}));
const Card4 = JSON.parse(fs.readFileSync('./inGame/Story2/Card4.json', {encoding:'utf8', flag:'r'}));
const Card5 = JSON.parse(fs.readFileSync('./inGame/Story2/Card5.json', {encoding:'utf8', flag:'r'}));

storiesActive["Story1"] = {}; //create a new story
storiesActive["Story1"][Card0.id] = Card0; //added player in a story
storiesActive["Story1"][Card1.id] = Card1;

storiesActive["Story2"] = {};
storiesActive["Story2"][Card3.id] = Card3;
storiesActive["Story2"][Card4.id] = Card4;
storiesActive["Story2"][Card5.id] = Card5;*/

//----------------------------------------------------------------------------------------------------------

module.exports = {
    createRoutes: (app) => {
        //get current status of players
        app.get('/status', (req, res) => {
            const story = req.query.story;
            const arrayPlayers = [];
            if(!storiesActive[story]) //or is empty
                res.status(404).end();
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
                res.status(404).end();
            stories.forEach((story) => {
                nPlayers[story] = Object.keys(storiesActive[story]).length;
            })
            const infoStories = JSON.stringify({stories: stories, nPlayers: nPlayers});
            res.end(infoStories);
        });     

        //get players in a story
        app.get('/players', (req, res) => {
            const story = req.query.story;
            if(!storiesActive[story])
                res.status(404).end();
            const players = Object.keys(storiesActive[story]);
            const data = JSON.stringify(players);
            res.status(200).end(data);
        });

        app.get('/history', (req, res) => {
            const player = req.query.player;
            const story = req.query.story;
            if(!player in storiesActive[story])
                res.status(404).end();
            const data = JSON.stringify(storiesActive[story][player]);
            res.status(200).end(data);
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
            if(storiesActive[story][player].sectionArray[section])
                storiesActive[story][player].sectionArray[section].points = parseInt(points);
            else
                res.status(404).end();
        })

        app.get('/pdf', (req, res) => {            
            const player = req.query.player;
            const story = req.query.story;
            const path = `./inGame/${story}/${player}.json`;
            if(!storiesActive[story][player])
                res.status(404).end();
            const infoPlayer = storiesActive[story][player];
            const doc = new jsPDF();
            const col = ["Section", "Question", "Answer", "Time", "Points"];
            const rows = [];
            doc.setFontSize(30);
            doc.setFont("calibri");
            doc.text( `${player}`, 100, 15, {align: "center"});
            infoPlayer.sectionArray.forEach((section, i) => {
                const item = [section.section, section.question, section.answer, section.timer, section.points];
                rows.push(item);
            });
            doc.autoTable(col, rows,  {
                tableLineColor: [189, 195, 199],
                tableLineWidth: 0.3,
                startY: 20
            });
            const pdf = doc.output();
            res.contentType("application/pdf;charset=utf-8");
            res.send(pdf);
        })

        //post status files of players
        app.post('/postJson', (req, res) => {
            const id = req.body.id; //the json of player
            const sectionArray = req.body.sectionArray;
            const story = req.body.story; //you also have to pass him which story he wants to play
            if(!(story in storiesActive))
                storiesActive[story] = {}; //added new story
            if(storiesActive[story][id]){
                const length = storiesActive[story][id].sectionArray.length - 1;
                const lastActivity = storiesActive[story][id].sectionArray[length];
                if(!lastActivity || !sectionArray)
                    res.status(404).end();
                if(lastActivity.section != sectionArray.section){
                    storiesActive[story][id].sectionArray.push(sectionArray); //push the player in the story  
                } else {
                    lastActivity.timer = sectionArray.timer;
                    lastActivity.answer = sectionArray.answer;
                    if(sectionArray.points)
                        lastActivity.points = sectionArray.points;
                }      
            } else {
                storiesActive[story][id] = {id, sectionArray};
            }
            res.status(200).end();
            //console.log(storiesActive["Story1"]["Marco"])
          

            /*
            const path = `./statusFiles/`;
            const file = path + req.body.id + ".json"
            if (!fs.existsSync(path))
                fs.mkdirSync(path);
            //Pubblico il file nel path
            if(!fs.existsSync(file))
                fs.writeFileSync(file, JSON.stringify(req.body));
            else {
                const rawdata = fs.readFileSync(file);
                let data = JSON.parse(rawdata);
                data.sectionArray.push(req.body.SectionArray);
                fs.writeFileSync(file, JSON.stringify(data));
            }
            res.status(200).end();*/
        });

    }
}