const fs = require("fs");

//array of active stories 
const storiesActive = {};

//examples for test-----------------------------------------------------------------------------------------
const Card0 = JSON.parse(fs.readFileSync('./inGame/Story1/Card0.json', {encoding:'utf8', flag:'r'}));
const Card1 = JSON.parse(fs.readFileSync('./inGame/Story1/Card1.json', {encoding:'utf8', flag:'r'}));

const Card3 = JSON.parse(fs.readFileSync('./inGame/Story2/Card3.json', {encoding:'utf8', flag:'r'}));
const Card4 = JSON.parse(fs.readFileSync('./inGame/Story2/Card4.json', {encoding:'utf8', flag:'r'}));

storiesActive["Story1"] = []; //create a new story
storiesActive["Story1"].push(Card0); //added player in a story
storiesActive["Story1"].push(Card1);

storiesActive["Story2"] = [];
storiesActive["Story2"].push(Card3);
storiesActive["Story2"].push(Card4);
//----------------------------------------------------------------------------------------------------------

module.exports = {
    createRoutes: (app) => {
        //get current status of players
        app.get('/status', (req, res) => {
            story = req.query.story;
            const arrayPlayers = JSON.stringify(storiesActive[story]);
            res.end(arrayPlayers);
        });

        //get stories in game
        app.get('/stories', (req, res) => {
            const keys = Object.keys(storiesActive);
            const stories = JSON.stringify(keys);
            res.end(stories);
        });

        //post status files og players
        app.post('/postJson', (req, res) => {

            /*
            const player = req.body.player; //the json of player
            const story = req.body.story; //you also have to pass him which story he wants to play
            if(!(story in storiesActive))
                storiesActive[story] = []; //added new story
            storiesActive.push(player);
            res.status(200).end();
            */

            const path = `./statusFiles/`;
            console.log(req.body);
            if (!fs.existsSync(path))
                fs.mkdirSync(path);
            //Pubblico il file nel path
            fs.writeFileSync( path + 'student-2.json', JSON.stringify(req.body));

            res.status(200).end();
        });
    }
}