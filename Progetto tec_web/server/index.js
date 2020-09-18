const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let directory = "publicStories";
let dirBuf = Buffer.from(directory);


app.listen(8000, function () {
    console.log("Server listenig behind port 8000");
});


app.post("/user", (req, res) => {
    fs.readdir(dirBuf, (err, files) =>{
        let i = 0;
        if (err){
            console.log(err.message);
        } else {
            files.forEach((element) => {
                if(req.body.user == element.split('_').slice(0, -1).join('_')) i = i +1;
            })
            fs.writeFile(`./publicStories/${req.body.user}_${i}.json`, JSON.stringify(req.body.preview, null, 2), function (err) {
                if (err) throw err;
                console.log(`File is created successfully (utent \"${req.body.user}\" has created the file ${req.body.user}_${i}.json)`);
            });
        }
    })
    res.end(req.body.user);
});

