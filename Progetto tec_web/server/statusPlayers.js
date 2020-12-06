const fs = require("fs");

module.exports = {
    createRoutes: (app) => {
        //get current status of players
        app.get('/status', (req, res) => {
            let arrayPlayers = [];
            story = req.query.story;
            const path = `./inGame/${story}`;
            const files = fs.readdirSync(path);
            files.forEach((element) => {
                const file = fs.readFileSync(`${path}/${element}`, {encoding:'utf8', flag:'r'});
                const data = JSON.parse(file);
                arrayPlayers.push(data);
            });
            arrayPlayers = JSON.stringify(arrayPlayers);
            res.end(arrayPlayers);
        });

        //get stories in game
        app.get('/stories', (req, res) => {
            let stories = [];
            const path = './inGame/';
            const files = fs.readdirSync(path);
            files.forEach((element) => {
                stories.push(element);
            });
            stories = JSON.stringify(stories);
            res.end(stories);
        });

        //post status files og players
        app.post('/postJson', (req, res) => {
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