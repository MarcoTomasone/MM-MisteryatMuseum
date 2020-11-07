const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require('body-parser');
const { COPYFILE_EXCL } = fs.constants;


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let directory = "storiesFolder";
let dirBuf = Buffer.from(directory);

var array = []

app.use(cors());

/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});*/


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


//restituisce l'array di tutte le storie create dall'utente
app.get("/storiesFolder/:username", (req, res) => {
    var arrayOfStories = []
    var files = fs.readdirSync("./storiesFolder")
    files.forEach((element) =>{
        if (element.startsWith(req.params.username)) {
            const file = fs.readFileSync(`./storiesFolder/${element}`, {encoding:'utf8', flag:'r'});
            const tmp = JSON.parse(file);
            const story = {
                id: tmp.id,
                title: tmp.title,
                gender: tmp.gender,
                objective: tmp.objective,
                participantsType: tmp.participantsType,
                accessibility: tmp.accessibility,
                description: tmp.description,
                published: tmp.published
            };
            arrayOfStories.push(story);
        }
    })
    res.status(200).end(JSON.stringify(arrayOfStories))
})

//restituisce l'array di tutte le storie pubblicate
app.get("/storiesFolder", (req, res) => {
    var arrayOfStories = []
    var files = fs.readdirSync("./storiesFolder")
    files.forEach((element) =>{
        const file = fs.readFileSync(`./storiesFolder/${element}`, {encoding:'utf8', flag:'r'});
        const tmp = JSON.parse(file);
        if (tmp.published == true){
            const story = {
                id: tmp.id,
                title: tmp.title,
                gender: tmp.gender,
                participantsType: tmp.participantsType,
                accessibility: tmp.accessibility,
                description: tmp.description,
                published: tmp.published
            };
            arrayOfStories.push(story);
        }
    })
    res.status(200).end(JSON.stringify(arrayOfStories))
})

app.get("/duplyStory/:username", (req, res) => {
    var tmp = req.params.username.split("_")[0]
    fs.readdir(dirBuf, (err, files) =>{
        let i = 0;
        if (err){
            console.log(err.message);
        } else {
            files.forEach((element) => {
                i = i +1;
            })
            fs.readFile(`./storiesFolder/${req.params.username}`, {encoding:'utf8', flag:'r'}, (err, data) => {
                if (err) throw err;
                var fileCopied = JSON.parse(data)
                fileCopied.id = `${tmp}_${i}.json`;
                fileCopied.published = false;
                fs.writeFile(`./storiesFolder/${tmp}_${i}.json`, JSON.stringify(fileCopied, null, 2), function (err) {
                    if (err) throw err;
                })
            });
        }
    })
    res.status(200).end();
})




//creare una storia
app.post("/createStory/info", (req, res) => {
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
            data.x = array.length;
            if (data.accessibility.value  == "Si") data.accessibility.url = "../img/accessibility_1.png";
            else data.accessibility.url = "../img/no_accessibility_1.png";
            if (data.participantsType.value == "singlePlayer") data.participantsType.url = "../img/single.png";
            else if (data.participantsType.value == "group") data.participantsType.url = "../img/one_group.png";
            else if (data.participantsType.value == "differentGroup") data.participantsType.url = "../img/more_group.png";
            array.push(data)
            /*fs.writeFileSync(`./storiesFolder/${req.body.user}_${i}.json`, JSON.stringify(data, null, 2), function (err) {
                if (err) throw err;
                console.log(`File is created successfully (the utent \"${req.body.user}\" has created the file ${req.body.user}_${i}.json)`);
            });*/
            console.log(array)
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


//chat
const io = require('socket.io')(3000)

io.on('connection', socket => {
  socket.on('send-chat-message', data => {
    io.to(`${data.receiver}`).emit("chat-message", {message: `${data.message}`, name: "Admin", id: data.id});
    //socket.broadcast.emit('chat-message', message);
  })
})

/*
const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })

  socket.on('send-chat-message', data => {
    socket.broadcast.emit('chat-message', {message : data.message , name :"Admin", id: "Card0"});
    //io.to(`${data.receiver}`).emit("chat-message", { message: data.message, name: "Admin", id: "Card0"});
})
*/

 /* socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
    //io.to(`${data.receiver}`).emit("chat-message", {message: `${data.message}`, name: "EniGuidi", id: data.id});
    socket.emit("chat-message", {message: `${data.message}`, name: "EniGuidi", id: data.id})
  })
})*/

app.listen(8000, function () {
    console.log("Server listenig behind port 8000");
});

