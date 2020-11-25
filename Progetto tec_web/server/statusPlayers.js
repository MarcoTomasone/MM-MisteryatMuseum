const fs = require("fs");

module.exports = {
    createRoutes: (app) => {
        app.get("/status", (req, res) => {
            let arrayPlayers = [];
            const path = '../src/src_control/JSON_Players';
            const files = fs.readdirSync(path);
        
            files.forEach((element) => {
            const file = fs.readFileSync(`${path}/${element}`, {encoding:'utf8', flag:'r'});
            const data = JSON.parse(file);
            arrayPlayers.push(data);
            });
            
            arrayPlayers = JSON.stringify(arrayPlayers);
            res.end(arrayPlayers);
        })

        app.post('/postJson', (req, res) => {
            const path = `./statusFiles/`;
            if (!fs.existsSync(path))
                fs.mkdirSync(path);
            //Pubblico il file nel path
            fs.writeFileSync( path + 'student-2.json', JSON.stringify(req.body));
            res.status(200).end();
        });
    }
}