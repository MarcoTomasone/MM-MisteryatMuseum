const e = React.createElement;
const {TextField, IconButton, makeStyles, Button, Icon, FormControl, InputLabel, Select, MenuItem, Tooltip, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Switch, FormControlLabel, withStyles } = window['MaterialUI'];
import {DialogComponent, DialogComponent2, DialogComponent3} from "./Dialog.js"

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const useStyles = makeStyles((theme) => ({
    input: {
        width: 233,
        [`& fieldset`]: {
            borderRadius: 15,
        }
    },
    input2: {
        [`& input`]: {
            width: 550,
        }, 
        [`& textarea`]: {
            width: 550,
        }, 
        [`& fieldset`]: {
            width: 600,
            borderRadius: 15,
        }
    },
    saveButton: {
        backgroundColor: "grey",
        color: "white",
        borderRadius: 10,
        minWidth: 110,
        fontSize: 15,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        marginTop: 50,
    },
    buttonImage: { background: "grey"},
    buttonStandard: {
        color: "white",
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },
    hide: {
        display: "none",
    },
    leggendButton: {
        marginLeft: 10
    },
    score: {
        marginRight: 12,
    },
    activityOkAnswer:{
        color: "white",
        background: "green"
    },
    activityWrongAnswer:{
        color: "white",
        background: "red"
    },
}));

const SwitchButton = withStyles({
    switchBase: {
      color: "red",
      '&$track': {
        color: "red",
      },
      '&$checked': {
        color: "green",
      },
      '&$checked + $track': {
        backgroundColor: "green",
      }
    },
    checked: {},
    track: {},
})(Switch);

function Realize_activity(props){
    const activityTemplate = {
        title                   :   "",
        heightFrame             :   160,
        activityText            :   "",
        backgroundImage         :   "",
        activityImage           :   "",
        altActivityImage        :   "",
        streamVideo             :   "",
        topInput                :   320,
        leftInput               :   15,
        heightInput             :   60,
        widthInput              :   170,
        widgetType              :   "Nessuno",
        errorMessage            :   "",
        fourAnswers             :   [],
        multipleAnswers         :   [],
        trueFalseAnswer         :   {
            trueScore   :   0,
            falseScore  :   0
        },
        textAnswer: {
            value       :   "",
            scoreOk     :   0,
            scoreWrong  :   0
        },
        rangeAnswer             :   {
            possibleStart   : 0,
            possibleEnd     : 0,
            start           : 0,
            end             : 0,
            scoreOk         : 0,
            scoreWrong      : 0
        },
        correctAnswerGo         :   [],
        wrongAnswerGo           :   [],
        firstActivity           :   false
    }
    const classes = useStyles();
    const [updateTable, setUpdateTable] = React.useState(false)
    const [tableFourChoices, setTableFourChoices] = React.useState([])
    const [menuItemFourChoices, setMenuItemFourChoices] = React.useState([])
    const [tableMultipleAnswers, setTableMultipleAnswers] = React.useState([]);
    const [menuItemMultipleAnswers, setMenuItemMultipleAnswers] = React.useState([])
    const [answer, setAnswer] = React.useState("")
    const [answerSelect, setAnswerSelect] = React.useState("")
    const [score, setScore] = React.useState(0) 
    const [activity, setActivity] = React.useState(activityTemplate)
    const [listOfActivity, setListOfActivity] = React.useState([]);
    const [activitySelect, setActivitySelect] = React.useState("");
    const [activityCorrectAnswer, setActivityCorrectAnswer] = React.useState("");
    const [menuItemActivityCorrectAnswer, setMenuItemActivityCorrectAnswer] = React.useState([])
    const [activityWrongAnswer, setActivityWrongAnswer] = React.useState("");
    const [menuItemActivityWrongAnswer, setMenuItemActivityWrongAnswer] = React.useState([])
    const [arrayOfActivity, setArrayOfActivity] = React.useState([]);
    const [openInfoDialog, setOpenInfoDialog] = React.useState(false);
    const [openInfoDialog2, setOpenInfoDialog2] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [string, setString] = React.useState("");
    const [imageBackground, setImageBackground] = React.useState(null)
    const [imageActivity, setImageActivity] = React.useState(null)
    const [titleActivity, setTitleActivity] = React.useState("")
    const [isDeleteBackgroundImage, setIsDeleteBackgroundImage] = React.useState(false)
    const [isDeleteActivityImage, setIsDeleteActivityImage] = React.useState(false)



    React.useEffect(() => {
        document.getElementById("containerHome_userSelected_realize_info").innerHTML = "Crea una nuova attivit\xe0";
    }, [])

    React.useEffect(() => {
        document.getElementById("phoneText").style.height   = `${activity.heightFrame}px`;
    }, [activity.heightFrame])

    React.useEffect(() => {
        document.getElementById("textDiv").innerHTML      =    activity.activityText;
    }, [activity.activityText])

    React.useEffect(() => {
        document.getElementById("inputDiv").style.top       = `${activity.topInput}px`;
    }, [activity.topInput])

    React.useEffect(() => {
        document.getElementById("inputDiv").style.left      = `${activity.leftInput}px`;
    }, [activity.leftInput])

    React.useEffect(() => {
        document.getElementById("inputDiv").style.height    = `${activity.heightInput}px`;
        document.getElementById("circleDiv").style.height    = `${activity.heightInput}px`;
        document.getElementById("circleDiv").style.width    = `${activity.heightInput}px`;
    }, [activity.heightInput])

    React.useEffect(() => {
        document.getElementById("inputDiv").style.width     = `${activity.widthInput}px`;
    }, [activity.widthInput])


    React.useEffect(() => {
        var arrayOfFreeActivity = []
        var tmp = []
        props.story.activities.forEach(element => {
            tmp.push(e(MenuItem, {value : element.title}, element.title))
            arrayOfFreeActivity.push(element.title)
        })
        setListOfActivity(tmp)
        tmp = []
        activity.correctAnswerGo.forEach(element => {
            tmp.push(e(MenuItem, {value : element}, element))
        })
        setMenuItemActivityCorrectAnswer(tmp)
        tmp = []
        activity.wrongAnswerGo.forEach(element => {
            tmp.push(e(MenuItem, {value : element}, element))
        })
        setMenuItemActivityWrongAnswer(tmp)
        setIsDeleteBackgroundImage(false)
        setIsDeleteActivityImage(false)
    }, [activity.title, updateTable])

    React.useEffect(() => {
        if (activity.backgroundImage != ""){
            document.getElementById("phoneImage").setAttribute("src", `../../server/upload/${activity.backgroundImage}`)
            document.getElementById("phoneImage").classList.remove("hiddenClass")
        } else {
            if (props.story.player.backgroundImage == ""){
                document.getElementById("phoneImage").classList.add("hiddenClass")
                document.getElementById("phoneImage").setAttribute("src", ``)        }
            else {
                document.getElementById("phoneImage").classList.remove("hiddenClass")
                document.getElementById("phoneImage").setAttribute("src", `../../server/upload/${props.story.player.backgroundImage}`)
            }
        }
        if (activity.activityImage != ""){
            document.getElementById("mediaDiv").setAttribute("src", `../../server/upload/${activity.activityImage}`)
            document.getElementById("mediaDiv").classList.remove("hiddenClass")
        } else{
            document.getElementById("mediaDiv").classList.add("hiddenClass")
            document.getElementById("mediaDiv").setAttribute("src", ``)  
        }
        setImageBackground(null)
        setImageActivity(null)
        setIsDeleteBackgroundImage(false)
        setIsDeleteActivityImage(false)
    }, [titleActivity])



    
    React.useEffect(() => {
        var tmp = []
        var tmp2 = []
        for (var i = 0; i < activity.fourAnswers.length; i++){
            tmp.push(e(MenuItem, {key: getRandomInt(999999), value: activity.fourAnswers[i].text}, activity.fourAnswers[i].text))
        }
        setMenuItemFourChoices(tmp)
        activity.fourAnswers.forEach(element => {
            tmp2.push(
                e(TableRow, {key: element.text}, [
                    e(TableCell, {key: getRandomInt(999999), component:"th", scope:"row"}, element.text),
                    e(TableCell, {key: getRandomInt(999999)}, element.score),
                ])
            )
        })
        setTableFourChoices(tmp2)
    }, [activity.fourAnswers])


    React.useEffect(() => {
        var tmp = []
        var tmp2 = []
        for (var i = 0; i < activity.multipleAnswers.length; i++){
            tmp.push(e(MenuItem, {key: getRandomInt(999999), value: activity.multipleAnswers[i].text}, activity.multipleAnswers[i].text))
        }
        setMenuItemMultipleAnswers(tmp)
        activity.multipleAnswers.forEach(element => {
            tmp2.push(
                e(TableRow, {key: element.text}, [
                    e(TableCell, {key: getRandomInt(999999), component:"th", scope:"row"}, element.text),
                    e(TableCell, {key: getRandomInt(999999)}, element.score),
                ])
            )
        })
        setTableMultipleAnswers(tmp2)
    }, [activity.multipleAnswers])


    React.useEffect(() => {
        const type = ["Quattro opzioni", "Scelta multipla", "Vero o falso", "Input testuale automatico", "Input testuale valutatore", "Range", "Foto"];
        if (activity.widgetType == "Nessuno"){
            document.getElementById("inputDiv").classList.add("hiddenClass")
            type.forEach(element =>{
                if (element != "Input testuale valutatore" && element != "Foto") document.getElementById(element).classList.add(classes.hide)
            })
        } else {
            type.forEach(element =>{
                if (element == activity.widgetType){
                    if (element != "Input testuale valutatore" && element != "Foto") document.getElementById(element).classList.remove(classes.hide)
                    document.getElementById(element + " div").classList.remove("hiddenClass")
                } else {
                    if (element != "Input testuale valutatore" && element != "Foto")  document.getElementById(element).classList.add(classes.hide)
                    document.getElementById(element + " div").classList.add("hiddenClass")
                } 
            })
            document.getElementById("inputDiv").classList.remove("hiddenClass")
        }
        setScore(0);
        setAnswerSelect("");
    }, [activity.widgetType])


    React.useEffect(() => {
        var array = []
        props.story.activities.forEach(element => {
            array.push(e(MenuItem, {key: getRandomInt(999999), value : element.title}, element.title))
        })
        setArrayOfActivity(array)
    }, [])
    
    function displayDialog(error){
        setError(true)
        setString(error)
    }

    function updateBackgroundImage(){
        if (props.story.player.backgroundImage == ""){
            document.getElementById("phoneImage").classList.add("hiddenClass")
            document.getElementById("phoneImage").setAttribute("src", ``)        }
        else {
            document.getElementById("phoneImage").classList.remove("hiddenClass")
            document.getElementById("phoneImage").setAttribute("src", `../../server/upload/${props.story.player.backgroundImage}`)
        }
    }

    function addBackgroundImage(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", e.target.files[0])
        setImageBackground(formData)
        setIsDeleteBackgroundImage(false)
        var reader = new FileReader();
        reader.onload = function(){
            document.getElementById("phoneImage").setAttribute("src", reader.result)
            document.getElementById("phoneImage").classList.remove("hiddenClass")
        }
        reader.readAsDataURL(e.target.files[0]);
    }


    function addActivityImage(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", e.target.files[0])
        setImageActivity(formData)
        setIsDeleteActivityImage(false)
        var reader = new FileReader();
        reader.onload = function(){
            document.getElementById("mediaDiv").classList.remove("hiddenClass")
            document.getElementById("mediaDiv").style.borderRadius =  `${props.story.player.borderRadiusFrame}px` 
            document.getElementById("mediaDiv").setAttribute("src",  reader.result)
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    function deleteBackgroundImage(){
        setActivity({...activity, ["backgroundImage"]: ``});
        setIsDeleteBackgroundImage(true)
        setImageBackground(null)
        updateBackgroundImage()
    }

    function deleteActivityImage(){
        setActivity({...activity, ["activityImage"]: ``});
        setIsDeleteActivityImage(true)
        setImageActivity(null)
        document.getElementById("mediaDiv").classList.add("hiddenClass")
        document.getElementById("mediaDiv").setAttribute("src", ``)  
    }

    function changeLetter(string){
        var res = string
        res = res.replace("à", '\xe0')
        res = res.replace("è", '\xc8')
        res = res.replace("é", '\xc9')
        res = res.replace("ì", '\xcc')
        res = res.replace("ò", '\xf2')
        res = res.replace("ù", '\xf9')
        res = res.replace("À", '\xc0')
        res = res.replace("È", '\xc8')
        res = res.replace("É", '\xc9')
        res = res.replace("Ì", '\xcc')
        res = res.replace("Ò", '\xd2')
        res = res.replace("Ù", '\xc9')
        return res
    };

    const createActivity = async () => {
        var title = changeLetter(activity.title.charAt(0).toUpperCase() + activity.title.slice(1).toLowerCase())
        const found = props.story.activities.find(element => element.title == title)
        if (activity.title == "") displayDialog("Inserire prima un titolo");
        else if (/\s/g.test(activity.title)) displayDialog("Il titolo dell'attivit\xe0 non puo avere dei blank space");
        else if (found != undefined && title != titleActivity) displayDialog("Titolo gia presente tra le attivit\xe0 create, se vuoi modificarlo devi selezionarlo attraverso la select (select e titolo devono avere lo stesso valore, attenzione: case sensitive).");
        else{
            if (activity.widgetType == "Quattro opzioni" && activity.fourAnswers.length < 4) displayDialog("Inserire prima esattamente 4 risposte se si vuole scegliere questo tipo di risposta")
            else {
                var backgroundImageTmp = activity.backgroundImage
                var activityImageTmp = activity.activityImage
                if (imageBackground != null){
                    await axios.post(`http://localhost:8000/addImage/${props.story.id}/${title}_background`, imageBackground, {
                        headers:{ "Content-Type": "multipart/form-data" }
                    })
                    .then((response) => {
                        backgroundImageTmp = response.data
                        setActivity({...activity, ["backgroundImage"]: response.data});
                    })
                    .catch(error => console.log(error))
                } else {
                    if (activity.backgroundImage != ""){
                    await axios.get(`http://loacalhost:8000/duplyImage/${activity.backgroundImage}/${props.story.id}_${title}_background`)
                        .then((response) =>{
                            backgroundImageTmp = response.data
                            setActivity({...activity, ["backgroundImage"]: response.data});
                        })
                        .catch(error => console.log(error))
                    }
                }
                if (imageActivity != null){
                    await axios.post(`http://localhost:8000/addImage/${props.story.id}/${title}_activity`, imageActivity, {
                        headers:{ "Content-Type": "multipart/form-data" }
                    })
                    .then((response) => {
                        activityImageTmp = response.data
                        setActivity({...activity, ["activityImage"]: response.data});
                    })
                    .catch(error => console.log(error))
                } else {
                    if (activity.activityImage != ""){
                        await axios.get(`http://localhost:8000/duplyImage/${activity.activityImage}/${props.story.id}_${title}_activity`)
                        .then((response) => {
                            activityImageTmp = response.data
                            setActivity({...activity, ["activityImage"]: response.data});
                        })
                        .catch(error => console.log(error))
                    }
                }
                if (isDeleteBackgroundImage){
                    await axios.delete(`http://localhost:8000/deleteImage/${activity.backgroundImage}`)
                    .then(() => {
                        setIsDeleteBackgroundImage(false)
                        backgroundImageTmp = ""
                        setActivity({...activity, ["backgroundImage"]: ``});
                    })
                    .catch(error => console.log(error))
                }
                if (isDeleteActivityImage){
                    await axios.delete(`http://localhost:8000/deleteImage/${activity.activityImage}`)
                    .then(() => {
                        setIsDeleteActivityImage(false)
                        activityImageTmp = ""
                        setActivity({...activity, ["activityImage"]: ``});
                    })
                    .catch(error => console.log(error))
                }
                var tmp = {
                    title                   :   title,
                    heightFrame             :   activity.heightFrame,
                    activityText            :   changeLetter(activity.activityText),
                    backgroundImage         :   backgroundImageTmp,
                    activityImage           :   activityImageTmp,
                    altActivityImage        :   changeLetter(activity.altActivityImage),
                    streamVideo             :   activity.streamVideo,
                    widgetType              :   activity.widgetType,
                    topInput                :   activity.topInput,
                    leftInput               :   activity.leftInput,
                    heightInput             :   activity.heightInput,
                    widthInput              :   activity.widthInput,
                    errorMessage            :   changeLetter(activity.errorMessage),
                    fourAnswers             :   activity.fourAnswers,
                    multipleAnswers         :   activity.multipleAnswers,
                    trueFalseAnswer         :   activity.trueFalseAnswer,
                    textAnswer              :   activity.textAnswer,
                    rangeAnswer             :   activity.rangeAnswer,
                    correctAnswerGo         :   activity.correctAnswerGo,
                    wrongAnswerGo           :   activity.wrongAnswerGo,
                    firstActivity           :   activity.firstActivity,
                };
                var check = false
                var indexActivityUpdate = 0
                props.story.activities.forEach((element, index) => {
                    if (element.title == title) {
                        check = true
                        indexActivityUpdate = index
                    }
                })
                if (check) { props.story.activities.splice(indexActivityUpdate, 1, tmp)} 
                else {
                    props.story.activities.push(tmp)
                }
                var array = []
                props.story.firstActivity.correctAnswerGo = []
                props.story.activities.forEach(element => {
                    array.push(e(MenuItem, {value : element.title}, element.title))
                    if (element.firstActivity) props.story.firstActivity.correctAnswerGo.push(element.title)
                })
                setArrayOfActivity(array)
            }
        }
        
    }

    function addFunction(array){
        var check = true
        activity[array].forEach(element => { if (element.text == answer) check = false});
        if (check){
            const newAnswer = {
                text: changeLetter(answer),
                score: 0,
            }
            setActivity({...activity, [array]: [...activity[array],newAnswer]});
            setUpdateTable((prev) => !prev)
        } else {
            displayDialog("Risposta gi\xe0 presente")
        }
    }

    function addAnswer(){
        if (answer == "") displayDialog("Inserire prima una risposta")
        else {
            if ((activity.widgetType == "Quattro opzioni" && activity.fourAnswers.length >= 4)){
                displayDialog("Raggiunto limite risposte per questo tipo di widget")
            } else {
                if (activity.widgetType == "Quattro opzioni") addFunction("fourAnswers")
                else if (activity.widgetType == "Scelta multipla") addFunction("multipleAnswers")
            }
        }
        setAnswer("")
        setScore(0)
    };


    function updateField(e){
        e.preventDefault();
        const [section, key] =  e.target.name.split(".");      
        if (key) {
            setActivity({...activity, [section]: {...activity[section], [key]: changeLetter(e.target.value)}});
        } else {
            setActivity({...activity, [section]: changeLetter(e.target.value)});
        }
    };

    function isNumeric(str) {
        if (typeof str != "string") return false 
        return !isNaN(str) &&  !isNaN(parseFloat(str)) 
    }

    function updateFunction(array){
        var tmp = []
        activity[array].forEach(element =>{
            if (element.text == answerSelect) tmp.push({text: element.text, score: score})
            else tmp.push(element)
        })
        activity[array] = tmp
        setUpdateTable((prev) => !prev)
    }

    function updateScore(){
        if (answerSelect != "" && isNumeric(score)){
            if (activity.widgetType == "Quattro opzioni") updateFunction("fourAnswers")
            else if (activity.widgetType == "Scelta multipla") updateFunction("multipleAnswers")
        } else if (answerSelect != "") displayDialog("Inserire un valore numerico dove richiesto")
        else displayDialog("Selezionare prima una risposta")
        setAnswerSelect("")
        setScore(0)
    }

    function deleteFunction(array){
        var tmp = []
        activity[array].forEach(element =>{
            if (element.text != answerSelect) tmp.push(element)
        })
        activity[array] = tmp
        setUpdateTable((prev) => !prev)
    }

    function deleteAnswer(){
        if (answerSelect != ""){
            if (activity.widgetType == "Quattro opzioni") deleteFunction("fourAnswers")
            else if (activity.widgetType == "Scelta multipla") deleteFunction("multipleAnswers")
        } else displayDialog("Selezionare prima una risposta")
        setAnswerSelect("")
        setScore(0)
    }

    function addActivityOkAnswer(){
        if (activitySelect == "") setError(true)
        else {
            setActivity({...activity, ["correctAnswerGo"]: [...activity["correctAnswerGo"], activitySelect]});
            setActivitySelect("")
            setUpdateTable((prev) => !prev)
        }
    }

    function addActivityWrongAnswer(){
        if (activitySelect == "") setError(true)
        else {
            setActivity({...activity, ["wrongAnswerGo"]: [...activity["wrongAnswerGo"], activitySelect]});
            setActivitySelect("")
            setUpdateTable((prev) => !prev)
        }
    }


    function deleteActivitiesCorrectAnswer(){
        const found = props.story.activities.find(element => element.title == activityCorrectAnswer)
        if (found){
            var tmp = []
            activity.correctAnswerGo.forEach(element => {
                if (element != activityCorrectAnswer) tmp.push(element)
            })
            setActivity({...activity, ["correctAnswerGo"]: tmp});
            setActivityCorrectAnswer("")
            setUpdateTable((prev) => !prev)
        } else {
            displayDialog("Selezionare prima un'attivit\xe0");
        }
    }

    function deleteActivitiesWrongAnswer(){
        const found = props.story.activities.find(element => element.title == activityWrongAnswer)
        if (found){
            var tmp = []
            activity.correctAnswerGo.forEach(element => {
                if (element != activityWrongAnswer) tmp.push(element)
            })
            setActivity({...activity, ["wrongAnswerGo"]: tmp});
            setActivityWrongAnswer("")
            setUpdateTable((prev) => !prev)
        } else {
            displayDialog("Selezionare prima un'attivit\xe0");
        }
    }


    function selectActivity(e){
        var indexActivitySelected = 0
        props.story.activities.forEach((element, index) => {
            if (e.target.value == element.title) indexActivitySelected = index
        })
        setTitleActivity(e.target.value)
        setActivity(props.story.activities[indexActivitySelected])
        setActivitySelect("")
        setUpdateTable((prev) => !prev)
    }

    function deleteActivity(){
        if (titleActivity == "") displayDialog("Selezionare prima un'attivit\xe0");
        else {
            props.story.activities.forEach((element, index) => {
                if (element.title == titleActivity){
                    props.story.activities.splice(index, 1)
                    var array = []
                    props.story.activities.forEach(element2 => {
                        array.push(e(MenuItem, {value : element2.title}, element2.title))
                        if (element2.correctAnswerGo.includes(titleActivity)){
                            var index = element2.correctAnswerGo.indexOf(titleActivity);
                            if (index !== -1) {
                                element2.correctAnswerGo.splice(index, 1);
                            }
                        }
                        if (element2.wrongAnswerGo.includes(titleActivity)){
                            var index = element2.wrongAnswerGo.indexOf(titleActivity);
                            if (index !== -1) {
                                element2.wrongAnswerGo.splice(index, 1);
                            }
                        }
                    })
                    setArrayOfActivity(array)
                    setActivity(activityTemplate)
                    setTitleActivity("")
                }
            })
        }
    }

    return(
        e("form", {key: getRandomInt(999999), id: props.id, className: props.className}, [
            e("div", {key: getRandomInt(999999), className: "playerDivStyle"}, [
                e("p", {key: getRandomInt(999999)}, "TITOLO ATTIVIT\xc0"),
                e("div", {key: getRandomInt(999999), className: "playerDivStyleElement2"}, [
                    e(TextField, {key: getRandomInt(999999), id: "title", className: [classes.input, classes.score], value: activity.title, name: "title", label: "Titolo", variant:"outlined", onChange:  (e) => updateField(e)}),
                    e(FormControl, {key: getRandomInt(999999), variant: "outlined", className: [classes.input, classes.score]}, [
                        e(InputLabel, {key: getRandomInt(999999), htmlFor: "selectActivity"}, "Seleziona attivit\xe0"),
                        e(Select, {key: getRandomInt(999999), id: "selectActivity", label: "Seleziona attivit\xe0", onChange:  (e) => {selectActivity(e)}}, arrayOfActivity)
                    ]),
                    e(IconButton, {key: getRandomInt(999999), id: "deleteActivity", className: [classes.buttonStandard, classes.buttonImage], component: "span", onClick: deleteActivity}, 
                        e(Icon, {key: getRandomInt(999999), children: "delete"}),  
                    ),
                    e(Tooltip, {key: getRandomInt(999999), title: "SPIEGAZIONE GESTIONE ATTIVIT\xc0"}, e(IconButton, {id: "leggend2", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: (e) => {e.preventDefault(); setOpenInfoDialog2(true)}}, 
                        e(Icon, {key: getRandomInt(999999), children: "not_listed_location"}),  
                    )),
                e(DialogComponent3, {key: getRandomInt(999999), fun: setOpenInfoDialog2, open: openInfoDialog2} )
                ])
            ]),
            e("div", {key: getRandomInt(999999), className: "playerDivStyle"}, [
                e("p", {key: getRandomInt(999999)}, "IMMAGINE SFONDO"),
                e("div", {key: getRandomInt(999999), className: "playerDivStyleElement"}, [
                    e("input", {key: getRandomInt(999999), id: "background_image", className: classes.hide, name: `${activity.title}_background`, type: "file", accept:".png,.jpeg,.jpg", onChange: addBackgroundImage}),
                    e("label", {key: getRandomInt(999999), htmlFor:"background_image"}, [
                        e(IconButton, {key: getRandomInt(999999), className: [classes.buttonStandard, classes.buttonImage], component: "span"}, 
                            e(Icon, {key: getRandomInt(999999), children: "image"}),  
                        ),
                        " AGGIUNGI IMMAGINE"
                    ]),
                ]),
                e("div", {key: getRandomInt(999999), className: "playerDivStyleElement"}, [
                    e("label", {key: getRandomInt(999999), htmlFor:"backgroundImage"}, [
                        e(IconButton, {key: getRandomInt(999999), id: "backgroundImage", className: [classes.buttonStandard, classes.buttonImage], component: "span", onClick: deleteBackgroundImage}, 
                            e(Icon, {key: getRandomInt(999999), children: "cancel"}),  
                        ),
                        " ELIMINA IMMAGINE"
                    ]),
                ])
            ]),
            e("div", {key: getRandomInt(999999), className: "playerDivStyle"}, [
                e("p", {key: getRandomInt(999999)}, "IMMAGINE ATTIVIT\xc0"),
                e("div", {key: getRandomInt(999999), className: "playerDivStyleElement"}, [
                    e("input", {key: getRandomInt(999999), id: "activity_image", className: classes.hide, name: `${activity.title}_activity`, type: "file", accept:".png,.jpeg,.jpg", onChange: addActivityImage}),
                    e("label", {key: getRandomInt(999999), htmlFor:"activity_image"}, [
                        e(IconButton, {key: getRandomInt(999999), className: [classes.buttonStandard, classes.buttonImage], component: "span"}, 
                            e(Icon, {key: getRandomInt(999999), children: "image"}),  
                        ),
                        " AGGIUNGI IMMAGINE"
                    ]),
                ]),
                e("div", {key: getRandomInt(999999), className: "playerDivStyleElement"}, [
                    e("label", {key: getRandomInt(999999), htmlFor:"activityImage"}, [
                        e(IconButton, {key: getRandomInt(999999), id: "activityImage", className: [classes.buttonStandard, classes.buttonImage], component: "span", onClick: deleteActivityImage},    
                            e(Icon, {key: getRandomInt(999999), children: "cancel"}),  
                        ),
                        " ELIMINA IMMAGINE"
                    ]),
                ]),
                e("div", {key: getRandomInt(999999), className: "playerDivStyleElement"}, [
                    e(TextField, {key: getRandomInt(999999), id: "altActivityImage", className: classes.input2, helperText: "Inserisci una descrizione in per una migliore accessibilit\xe0", value: activity.altActivityImage, name: "altActivityImage", label: "Descrizione immagine", type:"search", variant:"outlined", onChange:  (e) => updateField(e)}),
                ])
            ]),
            e("div", {key: getRandomInt(999999), className: "playerDivStyle"}, [
                e("p", {key: getRandomInt(999999)}, "VIDEO YOUTUBE"),
                e("div", {key: getRandomInt(999999), className: "playerDivStyleElement"}, [
                    e(TextField, {key: getRandomInt(999999), id: "streamVideo", className: classes.input2, helperText: "Inserisci il link di un video preso da Youtube. Verr\xe0 visualizzato sotto il testo o, se presente, sotto l'immagine di attivit\xe0", value: activity.streamVideo, name: "streamVideo", label: "Link YouTube", type:"search", variant:"outlined", onChange:  (e) => updateField(e)}),
                ])
            ]),
            e("div", {key: getRandomInt(999999), className: "playerDivStyle"}, [
                e("p", {key: getRandomInt(999999)}, "TESTO DOMANDA"),
                e("div", {key: getRandomInt(999999), className: "playerDivStyleElement"}, [
                    e(TextField, {key: getRandomInt(999999), id: "activityText", className: classes.input2, multiline: true, rows: 2, value: activity.activityText, name: "activityText", label: "Testo storia", type:"search", variant:"outlined", onChange:  (e) => updateField(e)}),
                ]),
            ]),
            e("div", {key: getRandomInt(999999), className: "playerDivStyle"}, [
                e("p", {key: getRandomInt(999999)}, "CORNICE TESTO"),
                e("div", {key: getRandomInt(999999), className: "playerDivStyleElement"}, [
                    e(TextField, {key: getRandomInt(999999), inputProps: {min: 5}, id: "heightFrame", className: classes.input, value: activity.heightFrame, name: "heightFrame", label: "Altezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                ]),
            ]),
            e("div", {key: getRandomInt(999999), className: "playerDivStyle"}, [
                e("p", {key: getRandomInt(999999)}, "RISPOSTA"),
                e("div", {key: getRandomInt(999999), className: "playerDivStyleElement2"}, [
                    e(FormControl, {key: getRandomInt(999999), variant: "outlined", className: classes.input}, [
                        e(InputLabel, {key: getRandomInt(999999), htmlFor: "widgetType"}, "Tipo di widget"),
                        e(Select, {key: getRandomInt(999999), id: "widgetType", label: "Tipo di widget", value: activity.widgetType, name:"widgetType", onChange:  (e) => updateField(e)}, [
                            e(MenuItem, {key: getRandomInt(999999), value: "Nessuno", selected: true}, "Nessuno"),
                            e(MenuItem, {key: getRandomInt(999999), value: "Quattro opzioni"}, "Quattro opzioni"),
                            e(MenuItem, {key: getRandomInt(999999), value: "Scelta multipla"}, "Scelta multipla"),
                            e(MenuItem, {key: getRandomInt(999999), value: "Vero o falso"}, "Vero o falso"),
                            e(MenuItem, {key: getRandomInt(999999), value: "Input testuale automatico"}, "Input testuale automatico"),
                            e(MenuItem, {key: getRandomInt(999999), value: "Input testuale valutatore"}, "Input testuale valutatore"),
                            e(MenuItem, {key: getRandomInt(999999), value: "Range"}, "Range"),
                            e(MenuItem, {key: getRandomInt(999999), value: "Foto"}, "Foto"),
                        ])
                    ]),
                    e(Tooltip, {key: getRandomInt(999999), title: "SPIEGAZIONE TIPO DI WIDGET"}, e(IconButton, {id: "leggend", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: (e) => {e.preventDefault(); setOpenInfoDialog(true)}}, 
                        e(Icon, {key: getRandomInt(999999), children: "not_listed_location"}),  
                    )),
                    e(DialogComponent2, {key: getRandomInt(999999), fun: setOpenInfoDialog, open: openInfoDialog} )
                ]),
                e("div", {key: getRandomInt(999999), id: "Quattro opzioni"}, [
                    e("div", {key: getRandomInt(999999), className: "playerDivStyleElement2"}, [
                        e(TextField, {key: getRandomInt(999999), id: "answer", className: classes.input, value: answer, name: "answer", label: "Inserire risposta", variant:"outlined", onChange:  (e) => setAnswer(changeLetter(e.target.value))}),
                        e(IconButton, {key: getRandomInt(999999), id: "addAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: addAnswer}, 
                            e(Icon, {key: getRandomInt(999999), children: "add"}),  
                        ),
                    ]),
                    e("div", {key: getRandomInt(999999), className: "playerDivStyleElement2"}, [
                        e(FormControl, {key: getRandomInt(999999), variant: "outlined", className: [classes.input, classes.score]}, [
                            e(InputLabel, {key: getRandomInt(999999), htmlFor: "correctAnswer"}, "Selezionare risposta"),
                            e(Select, {key: getRandomInt(999999), id: "correctAnswer", label: "Selezionare risposta", name:"correctAnswer", value: answerSelect, onChange: (e) => setAnswerSelect(e.target.value)}, menuItemFourChoices)
                        ]),
                        e(TextField, {key: getRandomInt(999999), id: "score", className: [classes.input, classes.score], value: score, name: "score", label: "Score", type:"number", variant:"outlined", onChange:  (e) => setScore(e.target.value)}),
                        e(IconButton, {key: getRandomInt(999999), id: "changeScore", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: updateScore}, 
                            e(Icon, {key: getRandomInt(999999), children: "update"}),  
                        ),
                        e(IconButton, {key: getRandomInt(999999), id: "deleteAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: deleteAnswer}, 
                            e(Icon, {key: getRandomInt(999999), children: "delete"}),  
                        ),
                    ]),
                    e("div", {key: getRandomInt(999999), className: "playerDivStyleElement"}, [
                        e(TableContainer, {key: getRandomInt(999999), component:Paper, style:{ width: 400 }}, [
                            e(Table, {key: getRandomInt(999999), className: classes.table}, [
                                e(TableHead, {key: getRandomInt(999999)}, [
                                    e(TableRow, {key: getRandomInt(999999)}, [
                                        e(TableCell, {key: getRandomInt(999999)}, "Risposta"),
                                        e(TableCell, {key: getRandomInt(999999), align: "right"}, "Score")
                                    ])
                                ]),
                                e(TableBody,{key: getRandomInt(999999)}, tableFourChoices)
                            ])
                        ])    
                    ]),
                ]),
                e("div", {key: getRandomInt(999999), id: "Scelta multipla", className: classes.hide}, [
                    e("div", {key: getRandomInt(999999), className: "playerDivStyleElement2"}, [
                        e(TextField, {key: getRandomInt(999999), id: "answer", className: classes.input, value: answer, name: "answer", label: "Inserire risposta", variant:"outlined", onChange:  (e) => setAnswer(e.target.value)}),
                        e(IconButton, {key: getRandomInt(999999), id: "addAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: addAnswer}, 
                            e(Icon, {key: getRandomInt(999999), children: "add"}),  
                        ),
                    ]),
                    e("div", {key: getRandomInt(999999), className: "playerDivStyleElement2"}, [
                        e(FormControl, {key: getRandomInt(999999), variant: "outlined", className: [classes.input, classes.score]}, [
                            e(InputLabel, {key: getRandomInt(999999), htmlFor: "correctAnswer"}, "Selezionare risposta"),
                            e(Select, {key: getRandomInt(999999), id: "correctAnswer", label: "Selezionare risposta", name:"correctAnswer", value: answerSelect, onChange: (e) => setAnswerSelect(e.target.value)}, menuItemMultipleAnswers)
                        ]),
                        e(TextField, {key: getRandomInt(999999), id: "score", className: [classes.input, classes.score], value: score, name: "score", label: "Score", type:"number", variant:"outlined", onChange:  (e) => setScore(e.target.value)}),
                        e(IconButton, {key: getRandomInt(999999), id: "changeScore", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: updateScore}, 
                            e(Icon, {key: getRandomInt(999999), children: "update"}),  
                        ),
                        e(IconButton, {key: getRandomInt(999999), id: "deleteAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: deleteAnswer}, 
                            e(Icon, {key: getRandomInt(999999), children: "delete"}),  
                        ),
                    ]),
                    e("div", {key: getRandomInt(999999), className: "playerDivStyleElement2"}, [
                        e(TableContainer, {key: getRandomInt(999999), component:Paper, style:{ width: 400 }}, [
                            e(Table, {key: getRandomInt(999999), className: classes.table}, [
                                e(TableHead, {key: getRandomInt(999999)}, [
                                    e(TableRow, {key: getRandomInt(999999)}, [
                                        e(TableCell, {key: getRandomInt(999999)}, "Risposta"),
                                        e(TableCell, {key: getRandomInt(999999), align: "right"}, "Score")
                                    ])
                                ]),
                                e(TableBody, {key: getRandomInt(999999)}, tableMultipleAnswers)
                            ])
                        ])    
                    ]),
                ]),
                e("div", {key: getRandomInt(999999), id: "Vero o falso", className: classes.hide}, [
                    e("div", {key: getRandomInt(999999), className: "playerDivStyleElement2"}, [
                        e(TextField, {key: getRandomInt(999999), id: "scoreTrue", className: [classes.input, classes.score], value: activity.trueFalseAnswer.trueScore, name: "trueFalseAnswer.trueScore", label: "Vero", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                        e(TextField, {key: getRandomInt(999999), id: "scorefalse", className: [classes.input, classes.score], value: activity.trueFalseAnswer.falseScore, name: "trueFalseAnswer.falseScore", label: "Falso", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    ]), 
                ]),
                e("div", {key: getRandomInt(999999), id: "Input testuale automatico", className: classes.hide}, [
                    e("div", {key: getRandomInt(999999), className: "playerDivStyleElement2"}, [
                        e(TextField, {key: getRandomInt(999999), id: "inputText", className: [classes.input, classes.score], value: activity.textAnswer.value, name: "textAnswer.value", label: "Risposta", variant:"outlined", onChange:  (e) => updateField(e)}),
                        e(TextField, {key: getRandomInt(999999), id: "inputTextScoreOk", className: [classes.input, classes.score], value: activity.textAnswer.scoreOk, name: "textAnswer.scoreOk", label: "Score risposta esatta", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                        e(TextField, {key: getRandomInt(999999), id: "inputTextScoreWrong", className: [classes.input, classes.score], value: activity.textAnswer.scoreWrong, name: "textAnswer.scoreWrong", label: "Score risposta sbagliata", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    ]),
                ]),
                e("div", {key: getRandomInt(999999), id: "Range", className: classes.hide}, [
                    e("div", {key: getRandomInt(999999), className: "playerDivStyleElement2"}, [
                        e(TextField, {key: getRandomInt(999999), id: "possibleScoreStart", className: [classes.input, classes.score], value: activity.rangeAnswer.possibleStart, name: "rangeAnswer.possibleStart", label: "Minimo possibile", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                        e(TextField, {key: getRandomInt(999999), id: "possibleScoreEnd", className: [classes.input, classes.score], value: activity.rangeAnswer.possibleEnd, name: "rangeAnswer.possibleEnd", label: "Massimo possibile", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                        e(TextField, {key: getRandomInt(999999), id: "scoreStart", className: [classes.input, classes.score], value: activity.rangeAnswer.start, name: "rangeAnswer.start", label: "Minimo accettato", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                        e(TextField, {key: getRandomInt(999999), id: "scoreEnd", className: [classes.input, classes.score], value: activity.rangeAnswer.end, name: "rangeAnswer.end", label: "Massimo accettato", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                        e(TextField, {key: getRandomInt(999999), id: "scoreTrue", className: [classes.input, classes.score], value: activity.rangeAnswer.scoreOk, name: "rangeAnswer.scoreOk", label: "Score rix esatta", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                        e(TextField, {key: getRandomInt(999999), id: "scorefalse", className: [classes.input, classes.score], value: activity.rangeAnswer.scoreWrong, name: "rangeAnswer.scoreWrong", label: "Score rix sbagliata", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    ]),
                ]),
            ]),
            e("div", {key: getRandomInt(999999), className: "playerDivStyle"}, [
                e("p", {key: getRandomInt(999999)}, "DIMENSIONE E POSIZIONE DELLE RISPOSTE"),
                e("span", {key: getRandomInt(999999), className:"spanExplain"}, "Il bordo rosso \xe8 solo di aiuto in questa fase di creazione, non verr\xe0 visualizzato nella storia finale"),
                e("div", {key: getRandomInt(999999), className: "playerDivStyleElement"}, [
                    e("div", {key: getRandomInt(999999), className: "playerDivStyleElement"}, [
                        e(TextField, {key: getRandomInt(999999), id: "topInput", className: classes.input, value: activity.topInput, name: "topInput", label: "Distanza dal lato in alto", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    ]),
                    e("div", {key: getRandomInt(999999), className: "playerDivStyleElement"}, [
                        e(TextField, {key: getRandomInt(999999), id: "leftInput", className: classes.input, value: activity.leftInput, name: "leftInput", label: "Distanza dal lato sinistro", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    ]),
                    e("div", {key: getRandomInt(999999), className: "playerDivStyleElement"}, [
                        e(TextField, {key: getRandomInt(999999), id: "heightInput", className: classes.input, value: activity.heightInput, name: "heightInput", label: "Altezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    ]),
                    e("div", {key: getRandomInt(999999), className: "playerDivStyleElement"}, [
                        e(TextField, {key: getRandomInt(999999), id: "widthInput", className: classes.input, value: activity.widthInput, name: "widthInput", label: "Larghezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    ])
                ]),
            ]),
            e("div", {key: getRandomInt(999999), className: "playerDivStyle"}, [
                e("p", {key: getRandomInt(999999)}, "MESSAGGIO IN CASO DI RISPOSTA SBAGLIATA"),
                e("div", {key: getRandomInt(999999), className: "playerDivStyleElement"}, [
                    e(TextField, {key: getRandomInt(999999), id: "errorMessage", className: classes.input2, value: activity.errorMessage, name: "errorMessage", label: "Messaggio", variant:"outlined", onChange:  (e) => updateField(e)}),
                ])
            ]),
            e("div", {key: getRandomInt(999999), className: "playerDivStyle"}, [
                e("p", {key: getRandomInt(999999)}, "ATTIVIT\xc0 SUCCESSIVA"),
                e("div", {key: getRandomInt(999999), className: "playerDivStyleElement2"}, [
                    e(FormControl, {key: getRandomInt(999999), variant: "outlined", className: [classes.input, classes.score]}, [
                        e(InputLabel, {key: getRandomInt(999999), htmlFor: "listOfActivities"}, "Selezionare risposta"),
                        e(Select, {key: getRandomInt(999999), id: "listOfActivities", label: "Selezionare attivit\xe0", value: activitySelect,  onChange: (e) => setActivitySelect(e.target.value)}, listOfActivity)
                    ]),
                    e(IconButton, {key: getRandomInt(999999), id: "buttonActivityOkAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton, classes.activityOkAnswer], component: "span", onClick: addActivityOkAnswer}, 
                        e(Icon, {key: getRandomInt(999999), children: "sentiment_very_satisfied_outlined_icon"}),  
                    ),
                    e(IconButton, {key: getRandomInt(999999), id: "buttonActivityWrongAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton, classes.activityWrongAnswer], component: "span", onClick: addActivityWrongAnswer}, 
                        e(Icon, {key: getRandomInt(999999), children: "sentiment_very_dissatisfied_outlined_icon"}),  
                    ),
                    e(FormControl, {key: getRandomInt(999999), id: "buttonFirstActivity", variant: "outlined", className: classes.leggendButton}, [
                        e(FormControlLabel, {key: getRandomInt(999999), className: classes.formControl, control: e(SwitchButton, {checked: activity.firstActivity, onChange: () => setActivity({...activity, ["firstActivity"]: !(activity.firstActivity)})}),  label: "Attivit\xe0 iniziale"})
                    ])      
                ]),
                e("div", {key: getRandomInt(999999), className: "playerDivStyleElement2"}, [
                    e(FormControl, {key: getRandomInt(999999), variant: "outlined", className: [classes.input, classes.score]}, [
                        e(InputLabel, {key: getRandomInt(999999), htmlFor: "activitiesCorrectAnswer"}, "Selezionare risposta"),
                        e(Select, {key: getRandomInt(999999), id: "activitiesCorrectAnswer", label: "Selezionare attivit\xe0", value: activityCorrectAnswer, onChange: (e) => setActivityCorrectAnswer(e.target.value)}, menuItemActivityCorrectAnswer)
                    ]),
                    e(IconButton, {key: getRandomInt(999999), id: "deleteActivitiesCorrectAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: deleteActivitiesCorrectAnswer}, 
                        e(Icon, {key: getRandomInt(999999), children: "delete"}),  
                    ),
                ]),
                e("div", {key: getRandomInt(999999), className: "playerDivStyleElement2"}, [
                    e(FormControl, {key: getRandomInt(999999), variant: "outlined", className: [classes.input, classes.score]}, [
                        e(InputLabel, {key: getRandomInt(999999), htmlFor: "activitiesWrongAnswer"}, "Selezionare risposta"),
                        e(Select, {key: getRandomInt(999999), id: "activitiesWrongAnswer", label: "Selezionare attivit\xe0", value: activityWrongAnswer, onChange: (e) => setActivityWrongAnswer(e.target.value)}, menuItemActivityWrongAnswer)
                    ]),
                    e(IconButton, {key: getRandomInt(999999), id: "deleteActivitiesWrongAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: deleteActivitiesWrongAnswer}, 
                        e(Icon, {key: getRandomInt(999999), children: "delete"}),  
                    ),  
                ])
            ]),
            e(DialogComponent, {key: getRandomInt(999999), fun: setError, open: error, textError: string} ),
            e(Button, {key: getRandomInt(999999), id: "sumbit_formInfo", variant: "contained", size: "large", endIcon: e(Icon, {children: "save"}), className: classes.saveButton, onClick: createActivity}, "SALVA"),
        ])    
    )
}

export default Realize_activity;