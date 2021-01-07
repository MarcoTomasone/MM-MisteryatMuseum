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
            const ids = Object.keys(storiesActive[story]);
            const arrayPlayers = [];
            for(id in ids){
                arrayPlayers.push(storiesActive[story][id]);
            }
            const data = JSON.stringify(arrayPlayers);
            res.end(data);
        });

        //get active stories
        app.get('/stories', (req, res) => {
            const keys = Object.keys(storiesActive); // array of all active stories
            const nPlayers = {};
           /* for(element in keys){
                const key = keys[element]; // name of a single story 
                nPlayers[key] = storiesActive[key].length;  //number of active players
            }*/
            const stories = JSON.stringify({stories: keys, nPlayers: 3});
            res.end(stories);
        });     

        //get players in a story
        app.get('/players', (req, res) => {
            console.log(storiesActive);
            console.log(req.query.story);
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
            infoPlayer.sectionsArray.forEach((section, i) => {
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
            const player = req.body.player; //the json of player
            const story = req.body.story; //you also have to pass him which story he wants to play
            if(!(story in storiesActive))
                storiesActive[story] = []; //added new story
            storiesActive[story].push(player);  //push the player in the story
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
                data.sectionsArray.push(req.body.SectionArray);
                fs.writeFileSync(file, JSON.stringify(data));
            }
            res.status(200).end();*/
        });
    }
}