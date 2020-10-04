const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let directory = "storiesFolder";
let dirBuf = Buffer.from(directory);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});




/*app.post("/login", (req, res) => {
    fs.readFile("./log.json", "utf8",  (err, data) => {
        if (err) throw err;
        var tmp = JSON.parse(data);
        if(!(tmp.hasOwnProperty(req.body.username))){
            var username = req.body.username;
            var password = req.body.password;
            tmp.push(username = password)
            fs.writeFile("./log.json", JSON.stringify(tmp), (err) => {if (err) throw err})
            
        }
    });
    res.end()
});*/


app.get("/storiesFolder/:username", (req, res) => {
    var arrayOfStories = []
    var files = fs.readdirSync("./storiesFolder")
    files.forEach((element) =>{
        if (element.startsWith(req.params.username)) {
            const file = fs.readFileSync(`./storiesFolder/${element}`, {encoding:'utf8', flag:'r'});
            const tmp = JSON.parse(file);
            const story = {
                id: element,
                title: tmp.title,
                gender: tmp.gender,
                description: tmp.description,
                published: tmp.published
            };
            arrayOfStories.push(story);
        }
    })
    res.status(200).end(JSON.stringify(arrayOfStories))
})

app.get("/storiesFolder", (req, res) => {
    var arrayOfStories = []
    var files = fs.readdirSync("./storiesFolder")
    files.forEach((element) =>{
        const file = fs.readFileSync(`./storiesFolder/${element}`, {encoding:'utf8', flag:'r'});
        const tmp = JSON.parse(file);
        if (tmp.published == true){
            const story = {
                id: element,
                title: tmp.title,
                gender: tmp.gender,
                description: tmp.description,
                published: tmp.published
            };
            arrayOfStories.push(story);
        }
    })
    res.status(200).end(JSON.stringify(arrayOfStories))
})


//creare una storia
app.post("/createStory", (req, res) => {
    fs.readdir(dirBuf, (err, files) =>{
        let i = 0;
        if (err){
            console.log(err.message);
        } else {
            files.forEach((element) => {
                if(`${req.body.user}_${i}.json` == element) i = i +1;
            })
            const data = req.body.file;
            data.id = `${req.body.user}_${i}.json`;
            data.user = req.body.user;
            fs.writeFileSync(`./storiesFolder/${req.body.user}_${i}.json`, JSON.stringify(data, null, 2), function (err) {
                if (err) throw err;
                console.log(`File is created successfully (the utent \"${req.body.user}\" has created the file ${req.body.user}_${i}.json)`);
            });
        }
    })
    res.status(200).end(req.body.file.title);
});



//pubblicare una storia
app.post("/publishStory", (req, res) => {
    fs.readdir(dirBuf, (err, files) =>{
        let i = 0;
        if (err){
            console.log(err.message);
        } else {
            const data = JSON.parse(fs.readFileSync(`./storiesFolder/${req.body.story}`));
            data.published = true;
            fs.writeFileSync(`./storiesFolder/${req.body.story}`, JSON.stringify(data, null, 2));
        }
    })
    res.status(200).end();
})



//ritirare una storia
app.delete("/retireStory/:story", (req, res) => {
    const data = JSON.parse(fs.readFileSync(`./storiesFolder/${req.params.story}`));
    data.published = false;
    fs.writeFileSync(`./storiesFolder/${req.params.story}`, JSON.stringify(data, null, 2));
    res.status(200).end();
})



//eliminare una storia
app.delete("/deleteStory/:story", (req, res) => {
    const data = JSON.parse(fs.readFileSync(`./storiesFolder/${req.params.story}`));
    fs.unlink(`./storiesFolder/${req.params.story}`, (err) => {
        if (err) throw err;
        const tmp = req.params.story.split("_")[0];
        console.log(`L'utente ${tmp} ha appena eliminato la storia ${req.params.story}`);
    });
    res.end();
})

//Creazione Socket per la chat
var app2 = require('express')(); express
var http = require('http').createServer(app2);
var io = require('socket.io')(http);
var port = 3000;

app2.get('/', function(req, res){
    res.sendFile("../index.html");
    //res.send('<h1>HELLO</h1>');
});

io.on('connection', function(socket){
  socket.on('chatMessage', function(msg){
    io.emit('chat message', msg);
  });
});

//il server è in ascolto alla porta 3000
http.listen(port, function(){
  console.log('listening on *:' + port);
});


app.listen(8000, function () {
    console.log("Server listenig behind port 8000");
});