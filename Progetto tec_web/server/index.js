const http = require('http');
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const upload = require("express-fileupload");
const bodyParser = require('body-parser');
const { COPYFILE_EXCL } = fs.constants;
const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload());

let directory = "storiesFolder";
let dirBuf = Buffer.from(directory);
var array = []


app.post("/check", (req, res) => {
    var pathName = "Empty.png"
    var files = fs.readdirSync("./upload")
    files.forEach((element) =>{
        var tmp = element.split('.')[0]
        if (req.body.id == tmp) {
            pathName = element
        }
    })
    res.status(200).end(pathName)
})

app.get('/downloadImage/:source',(req,res) =>{
//uploadPlayer use by player to load resource to evaluate
//or download file to append to DOM
  
    let path = './uploadPlayer/'+req.params.source;
    let data = fs.readFileSync(path);
    res.send(data);
   
})

app.get(`/requestJson`,(req,res)=>{
    
    let path = './uploadPlayer/Document.json';
    let data = fs.readFileSync(path);
    
    res.send(JSON.parse(data));
})
/**
 * Funzione che dal player manda un immagine al valutatore
 * call by InputType.js
 */

app.post('/uploadImg', (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    const myFile = req.files.file;
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/uploadPlayer/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `uploadPlayer/${myFile.name}`});
    });
})

app.post("/addImage/:id/:type", (req, res) => {
    if (req.files === null){
        return res.status(400).json({msg: "No file uploaded"})
    }
    const file = req.files.file
    const extension = path.extname(file.name)
    const name = req.params.id.split('.')[0]
    var newImage = ""

    var files = fs.readdirSync("./upload")
    
    if (req.params.type == "bckgrnd"){
        files.forEach((element) =>{
            var tmp = element.split('.')[0]
            var tmp2 = req.params.id.split('.')[0] + "_background"
            if (tmp == tmp2) {
                fs.unlink(`./upload/${element}`, (err) => {if (err) throw err});
                console.log(`Delete image \"${element}\"`)
            }
        })
        newImage = `${name}_background${extension}`
        
    } else {
        var indexActivity = req.params.type.split("t")[1]
        files.forEach((element) =>{
            var tmp = element.split('.')[0]
            var tmp2 = `${req.params.id.split('.')[0]}_activity${indexActivity}`
            if (tmp == tmp2) {
                fs.unlink(`./upload/${element}`, (err) => {if (err) throw err})
                console.log(`Delete image \"${element}\"`)
            }
        })
        newImage = `${name}_activity${indexActivity}${extension}`
    }
    file.mv(`${__dirname}/upload/${newImage}`, (err) => {if (err) throw err})
    console.log(`Add image \"${newImage}\"`)
    res.end(newImage)
})

app.delete("/deleteImage/:id/:type", (req, res) => {
    var files = fs.readdirSync("./upload") 
    if (req.params.type == "bckgrnd"){
        files.forEach((element) =>{
            var tmp = element.split('.')[0]
            var tmp2 = req.params.id.split('.')[0] + "_background"
            if (tmp == tmp2) {
                fs.unlink(`./upload/${element}`, (err) => {if (err) throw err});
                console.log(`Delete image \"${element}\"`)
            }
        })        
    } else {
        var indexActivity = req.params.type.split("t")[1]
        files.forEach((element) =>{
            var tmp = element.split('.')[0]
            var tmp2 = `${req.params.id.split('.')[0]}_activity${indexActivity}`
            if (tmp == tmp2) {
                fs.unlink(`./upload/${element}`, (err) => {if (err) throw err})
                console.log(`Delete image \"${element}\"`)
            }
        })
    }
})

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

app.get("/createStory/id/:id", (req, res) => {
    fs.readdir(dirBuf, (err, files) =>{
        let i = 0;
        if (err){
            console.log(err.message);
            res.status(400).end(`Error`);
        } else {
            files.forEach((element) => {
                if(`${req.params.id}_${i}.json` == element) i = i +1;
            })
            res.status(200).end(`${req.params.id}_${i}.json`);
        }
    })
});


//creare una storia
app.post("/createStory/info", (req, res) => {          
    const data = req.body.file;
    data.id = req.body.id;
    data.user = req.body.user;
    data.x = array.length;
    if (data.accessibility.value  == "Si") data.accessibility.url = "../img/accessibility_1.png";
    else data.accessibility.url = "../img/no_accessibility_1.png";
    if (data.participantsType.value == "singlePlayer") data.participantsType.url = "../img/single.png";
    else if (data.participantsType.value == "group") data.participantsType.url = "../img/one_group.png";
    else if (data.participantsType.value == "differentGroup") data.participantsType.url = "../img/more_group.png";
    array.push(data)
    console.log(array)
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

//----------------------------------------------------------------CHAT-------------------------------------------------------------------------------------------------------

const io = require('socket.io')(3000, {cors: {origin: '*'}});
require('./modules/socket')(io);

//----------------------------------------------------------------GET STATUS PLAYER-------------------------------------------------------------------------------------------------------

const statusPlayers = require('./modules/statusPlayers');
statusPlayers.createRoutes(app);

//--------------------------------------------------------------------------------------------------------------------------------------------------
const server = http.createServer(app);
server.listen(8000, () => console.log('Server listening behind port 8000'));





