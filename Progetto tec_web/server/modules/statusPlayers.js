const fs = require("fs");
const { jsPDF } = require("jspdf");
require('jspdf-autotable');

//array of active stories 
const storiesActive = {};

//samples for test-----------------------------------------------------------------------------------------
const Card0 = JSON.parse(fs.readFileSync('./inGame/Story1/Card0.json', {encoding:'utf8', flag:'r'}));
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
storiesActive["Story2"][Card5.id] = Card5;
//----------------------------------------------------------------------------------------------------------

module.exports = {
    createRoutes: (app) => {
        //get current status of players
        app.get('/status', (req, res) => {
            const story = req.query.story;
            const arrayPlayers = [];
            for(id in storiesActive[story]){
                arrayPlayers.push(storiesActive[story][id]);
            }
            const data = JSON.stringify(arrayPlayers);
            res.end(data);
        });

        //get active stories
        app.get('/stories', (req, res) => {
            const keys = Object.keys(storiesActive); // array of all active stories
            const nPlayers = {};
            for(id in storiesActive[keys]){
                nPlayers[id] = Object.keys(storiesActive[keys][id]).length;
            }
            const stories = JSON.stringify({stories: keys, nPlayers: nPlayers});
            res.end(stories);
        });     

        //get players in a story
        app.get('/players', (req, res) => {
            const story = req.query.story;
            const players = Object.keys(storiesActive[story]);
            const data = JSON.stringify(players);
            res.status(200).end(data);
        });

        app.get('/pdf', (req, res) => {            
            const player = req.query.player;
            const story = req.query.story;
            const path = `./inGame/${story}/${player}.json`;
            if(!fs.existsSync(path))
                res.status(404).end();
            const infoPlayer = JSON.parse(fs.readFileSync(path, {encoding:'utf8', flag:'r'}));
            const doc = new jsPDF();
            const col = ["Section", "Question", "Answer", "Time", "Points"];
            const rows = [];
            doc.setFontSize(30);
            doc.setFont("calibri");
            doc.text( `${player}`, 100, 15, {align: "center"});
            infoPlayer.sectionArray.forEach((section, i) => {
                const item = [section.section, section.question, section.answer, section.time, section.points];
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
            console.log(sectionArray);
            const story = req.body.story; //you also have to pass him which story he wants to play
            if(!(story in storiesActive))
                storiesActive[story] = {}; //added new story
            if(storiesActive[story][id]){
                storiesActive[story][id].sectionArray.push(sectionArray);  //push the player in the story        
            } else {
                storiesActive[story][id] = {id, sectionArray : []};
            }
            console.log(storiesActive[story][id]);
            res.status(200).end();
          
            /*
            const path = `./statusFiles/`;
            const file = path + req.body.id + ".json"
            console.log(req.body);
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