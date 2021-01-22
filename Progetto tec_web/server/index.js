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

/**uploadPlayer use by player to load resource to evaluate
 *or download file to append to DOM
 */

app.get('/downloadImage/:source',(req,res) =>{
    let path = './uploadPlayer/'+req.params.source;
    let data = fs.readFileSync(path);
    res.send(data); 
})

/**downloadBackground allow the player to load the resource to evaluate
 * on base64 and append this to DOM
*/
      
app.get('/downloadBackground/:source',(req,res) =>{
        let path = "./upload/"+req.params.source;
        let data = fs.readFileSync(path);
        res.send(data);
})

app.get(`/requestJson/:title`,(req,res)=>{
    let path = `./storiesFolder/${req.params.title}`;
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

app.get("/modifyStory/:username", (req, res) => {
    var fileCopied = JSON.parse(fs.readFileSync(`./storiesFolder/${req.params.username}`));
    res.status(200).end(JSON.stringify(fileCopied));
})

app.get("/duplyStory/:username", (req, res) => {
    var tmp = req.params.username.split("_")[0]
    fs.readdir(dirBuf, (err, files) =>{
        if (err){
            console.log(err.message);
        } else {
            let i = files.length;
            var arrayIndex = []
            files.forEach((element, index) => {
                var index = element.split("_")[1].split(".")[0]
                arrayIndex.push(parseInt(index))
            })
            arrayIndex.sort(function(a, b) {return a - b});
            for(var index = 1; index < arrayIndex.length; index++) {
                if(arrayIndex[index] - arrayIndex[index-1] != 1) i = arrayIndex[index] - 1
            }
            fs.readFile(`./storiesFolder/${req.params.username}`, {encoding:'utf8', flag:'r'}, (err, data) => {
                if (err) throw err;
                var fileCopied = JSON.parse(data)
                fileCopied.id = `${tmp}_${i}.json`;
                fileCopied.published = false;
                fileCopied.id = `${tmp}_${i}.json`
                fs.writeFile(`./storiesFolder/${tmp}_${i}.json`, JSON.stringify(fileCopied, null, 2), function (err) {
                    if (err) throw err;
                    console.log(`L'utente ${tmp} ha appena duplicato la storia ${req.params.username}`);
                })
            });
        }
    })
    res.status(200).end();
})

app.post("/createStory/id", (req, res) => {
    fs.readdir(dirBuf, (err, files) =>{
        if (err){
            console.log(err.message);
        } else {
            let i = files.length;
            if (req.body.story.toCopy == true){
                i = req.body.story.id.split("_")[1].split(".")[0]
            } else {
                var arrayIndex = []
                files.forEach((element, index) => {
                    var index = element.split("_")[1].split(".")[0]
                    arrayIndex.push(parseInt(index))
                })
                arrayIndex.sort(function(a, b) {return a - b});
                for(var index = 0; index <= arrayIndex.length; index++) {
                    if (!(arrayIndex.includes(index))) i = index
                }
            }
            req.body.story.id = `${req.body.user}_${i}.json`
            req.body.story.toCopy = true
            if (req.body.story.accessibility.value  == "Si") req.body.story.accessibility.url = "../img/accessibility_1.png";
            else req.body.story.accessibility.url = "../img/no_accessibility_1.png";
            if (req.body.story.participantsType.value == "singlePlayer") req.body.story.participantsType.url = "../img/single.png";
            else if (req.body.story.participantsType.value == "group") req.body.story.participantsType.url = "../img/one_group.png";
            else if (req.body.story.participantsType.value == "differentGroup") req.body.story.participantsType.url = "../img/more_group.png";
            fs.writeFile(`./storiesFolder/${req.body.user}_${i}.json`, JSON.stringify(req.body.story, null, 2), function (err) {
                if (err) throw err;
                console.log(`L'utente ${req.body.user} ha appena aggiunto la storia ${req.body.user}_${i}.json`);
            })
        }
    })
    res.status(200).end();
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
    fs.unlink(`./storiesFolder/${req.params.story}`, (err) => {
        if (err) throw err;
        const tmp = req.params.story.split("_")[0];
        console.log(`L'utente ${tmp} ha appena eliminato la storia ${req.params.story}`);
    });
    res.end();
})

//----------------------------------------------------------------CHAT-------------------------------------------------------------------------------------------------------
const ciao = "Ciao";
const io = require('socket.io')(3000, {cors: {origin: '*'}});
require('./modules/socket')(io);

//----------------------------------------------------------------GET STATUS PLAYER-------------------------------------------------------------------------------------------------------

const statusPlayers = require('./modules/statusPlayers');
statusPlayers.createRoutes(app);

//--------------------------------------------------------------------------------------------------------------------------------------------------
const server = http.createServer(app);
server.listen(8000, () => console.log('Server listening behind port 8000'));





