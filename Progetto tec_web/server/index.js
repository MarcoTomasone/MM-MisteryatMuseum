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
app.use (express.static(path.join(__dirname,'../')));

let directory = "storiesFolder";
let dirBuf = Buffer.from(directory);

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

/*app.post("/check", (req, res) => {
    var pathName = "Empty.png"
    var files = fs.readdirSync("./upload")
    files.forEach((element) =>{
        var tmp = element.split('.')[0]
        if (req.body.id == tmp) {
            pathName = element
        }
    })
    res.status(200).end(pathName)
})*/

/**uploadPlayer use by player to load resource to evaluate
 *or download file to append to DOM
 */

app.get('/downloadImage/:source',(req,res) =>{
    const mypath = path.join(__dirname, `upload/${req.params.source}`);
    if(fs.existsSync(mypath)){
        const data = fs.readFileSync(mypath);
        res.send(data);
    }else{
        console.log("Image not found in downloadImage");
        res.status(404).send({message:'Image not found'});
    }
     
})

/**downloadBackground allow the player to load the resource to evaluate
 * on base64 and append this to DOM
*/
      
app.get('/downloadBackground/:source',(req,res) =>{
        const mypath = path.join(__dirname, `upload/${req.params.source}`);
        if(fs.existsSync(mypath)){
            const data = fs.readFileSync(mypath);
            res.send(data);
        }else{
            console.log("Image not found in downloadBackground");
            res.status(404).send({message:'Image not found'});
        }
        
})

app.get(`/requestJson/:title`,(req,res)=>{
    const mypath = path.join(__dirname, `storiesFolder/${req.params.title}`);
    const data = fs.readFileSync(mypath, {encoding:'utf8', flag:'r'});
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
    //const mypath = path.join(__dirname, `uploadPlayer/${myFile.name}`);
    let myPath = path.join(__dirname,`uploadPlayer/`);
    if (!fs.existsSync(myPath))
        fs.mkdirSync(myPath);
    myPath = myPath + myFile.name;
    myFile.mv(myPath, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `uploadPlayer/${myFile.name}`});
    });
})

app.get(`/idNumber/:username`, (req,res)=>{
    var i = 0;
    var arrayIndex = []
    const mypathDir = path.join(__dirname, `storiesFolder`);
    var files = fs.readdirSync(mypathDir) 
    files.forEach((element, index) => {
        var index = element.split("_")[1].split(".")[0]
        if (element.split("_")[0] == req.params.username.split("_")[0]) arrayIndex.push(parseInt(index))
    })
    arrayIndex.sort(function(a, b) {return a - b});
    for(var index = 0; index < arrayIndex.length; index++) {
        if (!(arrayIndex.includes(index))) i = index
    }
    if (i == 0 && arrayIndex.includes(0)) i = arrayIndex.length
    res.status(200).end(JSON.stringify(i))
})


app.post("/addImage/:id/:type", async (req, res) => {
    if (req.files === null){
        return res.status(400).json({msg: "No file uploaded"})
    }
    const file = req.files.file
    const extension = path.extname(file.name)
    const name = req.params.id.split('.')[0]
    var newImage = ""
    if (req.params.type == "bckgrnd") newImage = `${name}_background${extension}`
    else newImage = `${name}_${req.params.type}${extension}`
    const mypathDir = path.join(__dirname, `upload`);
    var files = fs.readdirSync(mypathDir)
    files.forEach((element) => {
        if (element.startsWith(newImage.split('.')[0])) {
            const mypathOldFile = path.join(__dirname, `upload/${element}`);
            fs.unlinkSync(mypathOldFile);
        }
    })
    await file.mv(`${__dirname}/upload/${newImage}`, (err) => {if (err) throw err})
    console.log(`Add image \"${newImage}\"`)
    res.status(200).end(newImage)
})

app.delete("/deleteImage/:img", (req, res) => {
    const mypathDir = path.join(__dirname, `upload`);
    var files = fs.readdirSync(mypathDir)
    files.forEach((element) => {
        if (element.startsWith(req.params.img.split('.')[0])) {
            const mypath = path.join(__dirname, `upload/${element}`);
            fs.unlinkSync(mypath);
            console.log(`Delete image \"${req.params.img}\"`)
        }
    })
    res.status(200).end()
})

//restituisce l'array di tutte le storie create dall'utente
app.get("/storiesFolder/:username", (req, res) => {
    var arrayOfStories = []
    const mypath = path.join(__dirname, `storiesFolder`);
    var files = fs.readdirSync(mypath)
    files.forEach((element) =>{
        if (element.split("_")[0] == req.params.username) {
            const mypath = path.join(__dirname, `storiesFolder/${element}`);
            const file = fs.readFileSync(mypath, {encoding:'utf8', flag:'r'});
            const tmp = JSON.parse(file);
            const story = {
                background: tmp.player.backgroundImage,
                id: tmp.id,
                title: tmp.title,
                gender: tmp.gender,
                objective: tmp.objective,
                participantsType: tmp.participantsType,
                accessibility: tmp.accessibility,
                description: tmp.description,
                published: tmp.published,
                age: [tmp.ageStart, tmp.ageEnd]
            };
            arrayOfStories.push(story);
        }
    })
    res.status(200).end(JSON.stringify(arrayOfStories))
})

//restituisce l'array di tutte le storie pubblicate
app.get("/storiesFolder", (req, res) => {
    var arrayOfStories = []
    const mypath = path.join(__dirname, `storiesFolder`);
    var files = fs.readdirSync(mypath) 
    files.forEach((element) =>{
        const mypath = path.join(__dirname, `storiesFolder/${element}`);
        const file = fs.readFileSync(mypath, {encoding:'utf8', flag:'r'});
        const tmp = JSON.parse(file);
        if (tmp.published == true){
            const story = {
                background: tmp.player.backgroundImage,
                id: tmp.id,
                title: tmp.title,
                gender: tmp.gender,
                objective: tmp.objective,
                participantsType: tmp.participantsType,
                accessibility: tmp.accessibility,
                description: tmp.description,
                published: tmp.published,
                age: [tmp.ageStart, tmp.ageEnd]
            };
            arrayOfStories.push(story);
        }
    })
    res.status(200).end(JSON.stringify(arrayOfStories))
})

//modificare una storia
app.get("/modifyStory/:username", (req, res) => {
    const mypath = path.join(__dirname, `storiesFolder/${req.params.username}.json`);
    var fileCopied = JSON.parse(fs.readFileSync(mypath, {encoding:'utf8', flag:'r'}));
    res.status(200).end(JSON.stringify(fileCopied));
})

//duplicare una storia
app.get("/duplyStory/:username", (req, res) => {
    var tmp = req.params.username.split("_")[0]
    var i = 0;
    var arrayIndex = []
    var mypathDir = path.join(__dirname, `storiesFolder`);
    var files = fs.readdirSync(mypathDir) 
    files.forEach((element, index) => {
        var index = element.split("_")[1].split(".")[0]
        if (element.split("_")[0] == req.params.username.split("_")[0]) arrayIndex.push(parseInt(index))
    })
    arrayIndex.sort(function(a, b) {return a - b});
    for(var index = 0; index < arrayIndex.length; index++) {
        if (!(arrayIndex.includes(index))) i = index
    }
    if (i == 0 && arrayIndex.includes(0)) i = arrayIndex.length
    const mypathOld = path.join(__dirname, `storiesFolder/${req.params.username}.json`);
    const data = JSON.parse(fs.readFileSync(mypathOld, {encoding:'utf8', flag:'r'}));
    var oldId = data.id;
    data.id = `${tmp}_${i}`
    data.published = false;
    const mypathNew = path.join(__dirname, `storiesFolder/${tmp}_${i}.json`);
    var newStory = JSON.stringify(data, null, 2)
    var re = new RegExp(oldId, "g");
    newStory = newStory.replace(re, data.id)
    fs.writeFileSync(mypathNew, newStory);
    mypathDir = path.join(__dirname, `upload`);
    files = fs.readdirSync(mypathDir) 
    files.forEach((element, index) => {
        if (element.startsWith(oldId)){
            var nameActivity = element.split(oldId)[1]
            fs.copyFileSync(`${__dirname}/upload/${element}`, `${__dirname}/upload/${data.id}${nameActivity}`)
        }
    })
    console.log(`L'utente ${req.params.username.split("_")[0]} ha appena duplicato la storia ${req.params.username}`)
    res.status(200).end();
})

//creare e modificare una storia
app.post("/createStory/id", (req, res) => {
    const mypath = path.join(__dirname, `storiesFolder/${req.body.story.id}.json`);
    fs.writeFileSync(mypath, JSON.stringify(req.body.story, null, 2));
    console.log(`L'utente ${req.body.user} ha appena aggiunto la storia ${req.body.story.id}.json`);
    res.status(200).end();
});

//pubblicare una storia
app.delete("/publishStory/:story", (req, res) => {
    const mypath = path.join(__dirname, `storiesFolder/${req.params.story}.json`);
    const data = JSON.parse(fs.readFileSync(mypath, {encoding:'utf8', flag:'r'}));
    data.published = true;
    fs.writeFileSync(mypath, JSON.stringify(data, null, 2));
    console.log(`L'utente ${req.params.story.split("_")[0]} ha appena pubblicato la storia ${req.params.story}`)
    res.status(200).end();
})


//ritirare una storia
app.delete("/retireStory/:story", (req, res) => {
    const mypath = path.join(__dirname, `storiesFolder/${req.params.story}.json`);
    const data = JSON.parse(fs.readFileSync(mypath, {encoding:'utf8', flag:'r'}));
    data.published = false;
    fs.writeFileSync(mypath, JSON.stringify(data, null, 2));
    console.log(`L'utente ${req.params.story.split("_")[0]} ha appena ritirato la storia ${req.params.story}`)
    res.status(200).end();
})


//eliminare una storia
app.delete("/deleteStory/:story", (req, res) => {
    const mypath = path.join(__dirname, `storiesFolder/${req.params.story}.json`);
    fs.unlinkSync(mypath);
    const mypathDir = path.join(__dirname, `upload`);
    var files = fs.readdirSync(mypathDir) 
    files.forEach((element, index) => {
        if (element.startsWith(req.params.story)){
            fs.unlinkSync(`${__dirname}/upload/${element}`)
        }
    })
    const tmp = req.params.story.split("_")[0];
    console.log(`L'utente ${tmp} ha appena eliminato la storia ${req.params.story}`);
    res.status(200).end();
})


//duplicare un immagine quando un'attività viene copiata da una gia esistente con un immagine
app.get("/duplyImage/:oldImage/:newImage", (req, res) => {
    const mypathDir = path.join(__dirname, `upload`);
    var files = fs.readdirSync(mypathDir)
    files.forEach((element, index) => {
        if (element == req.params.oldImage){
            fs.copyFileSync(`${__dirname}/upload/${element}`, `${__dirname}/upload/${req.params.newImage}`)
        }
    })
    res.status(200).end();
})



//----------------------------------------------------------------GET STATUS PLAYER-------------------------------------------------------------------------------------------------------

const statusPlayers = require('./modules/statusPlayers');
statusPlayers.createRoutes(app);

//--------------------------------------------------------------------------------------------------------------------------------------------------
const server = http.createServer(app);
const io = require('socket.io')(server, {cors: {origin: '*'}});
require('./modules/socket')(io);

server.listen(8000, () => console.log('Server listening behind port 8000'));