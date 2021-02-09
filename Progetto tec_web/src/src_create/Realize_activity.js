const e = React.createElement;
const {TextField, IconButton, makeStyles, Button, Icon, FormControl, InputLabel, Select, MenuItem, Tooltip, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Switch, FormControlLabel, withStyles } = window['MaterialUI']; //to load the component from the library
import {DialogComponent, DialogComponent2} from "./Dialog.js"



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
    activityOkWrongAnswer:{
        color: "white",
        background: "grey"
    }
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
    const classes = useStyles();
    const [updateTable, setUpdateTable] = React.useState(false)
    const [tableFourChoices, setTableFourChoices] = React.useState([])
    const [menuItemFourChoices, setMenuItemFourChoices] = React.useState([])
    const [tableMultipleAnswers, setTableMultipleAnswers] = React.useState([]);
    const [menuItemMultipleAnswers, setMenuItemMultipleAnswers] = React.useState([])
    const [answer, setAnswer] = React.useState("")
    const [answerSelect, setAnswerSelect] = React.useState("")
    const [score, setScore] = React.useState(0) 
    const [activity, setActivity] = React.useState({
        title                   :   "",
        heightFrame             :   160,
        activityText            :   "",
        backgroundImage         :   "",
        activityImage           :   "",
        altActivityImage        :   "",
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
        activityIsUsed          :   false,
        firstActivity           :   false
    })
    const [listOfActivity, setListOfActivity] = React.useState([]);
    const [activitySelect, setActivitySelect] = React.useState("");
    const [activityCorrectAnswer, setActivityCorrectAnswer] = React.useState("");
    const [menuItemActivityCorrectAnswer, setMenuItemActivityCorrectAnswer] = React.useState([])
    const [activityWrongAnswer, setActivityWrongAnswer] = React.useState("");
    const [menuItemActivityWrongAnswer, setMenuItemActivityWrongAnswer] = React.useState([])
    const [arrayOfActivity, setArrayOfActivity] = React.useState([]);
    const [openInfoDialog, setOpenInfoDialog] = React.useState(false);
    const [check, setCheck] = React.useState(true);
    const [checkSwitch, setCheckSwitch] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [string, setString] = React.useState("");
    const [arrayOfActivityRemoved, setArrayOfActivityRemoved] = React.useState([]);


    React.useEffect(() => {
        document.getElementById("containerHome_userSelected_realize_info").innerHTML = "Crea una nuova attività";
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
        if (!(props.story.activities.some(element => element.title == activity.title))){
            activity.correctAnswerGo = []
            activity.wrongAnswerGo = []
            activity.activityIsUsed = false
            activity.firstActivity = false
        }
        var tmp = []
        props.story.activities.forEach(element => {
            if (element.title != activity.title && element.firstActivity == false && element.activityIsUsed == false && !(activity.correctAnswerGo.includes(element.title)) && !(activity.wrongAnswerGo.includes(element.title)) && (!(arrayOfFreeActivity.includes(element.title)))){
                tmp.push(e(MenuItem, {value : element.title}, element.title))
                arrayOfFreeActivity.push(element.title)
            }
        })
        arrayOfActivityRemoved.forEach(element => {
            if ((!(activity.correctAnswerGo.includes(element) || activity.wrongAnswerGo.includes(element))) && (!(arrayOfFreeActivity.includes(element)))){
                tmp.push(e(MenuItem, {value : element}, element))
                arrayOfFreeActivity.push(element.title)
            }
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
    }, [activity.title, updateTable])

    
    React.useEffect(() => {
        var tmp = []
        var tmp2 = []
        for (var i = 0; i < activity.fourAnswers.length; i++){
            tmp.push(e(MenuItem, {value: activity.fourAnswers[i].text}, activity.fourAnswers[i].text))
        }
        setMenuItemFourChoices(tmp)
        activity.fourAnswers.forEach(element => {
            tmp2.push(
                e(TableRow, {key: element.text}, [
                    e(TableCell, {component:"th", scope:"row"}, element.text),
                    e(TableCell, null, element.score),
                ])
            )
        })
        setTableFourChoices(tmp2)
    }, [activity.fourAnswers])


    React.useEffect(() => {
        var tmp = []
        var tmp2 = []
        for (var i = 0; i < activity.multipleAnswers.length; i++){
            tmp.push(e(MenuItem, {value: activity.multipleAnswers[i].text}, activity.multipleAnswers[i].text))
        }
        setMenuItemMultipleAnswers(tmp)
        activity.multipleAnswers.forEach(element => {
            tmp2.push(
                e(TableRow, {key: element.text}, [
                    e(TableCell, {component:"th", scope:"row"}, element.text),
                    e(TableCell, null, element.score),
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
        setAnswerSelect();
    }, [activity.widgetType])

    React.useEffect(() => {
        if (activity.firstActivity == true || activity.activityIsUsed == true) setCheck(false)
        else setCheck(true)
        if (activity.activityIsUsed == true) setCheckSwitch(true)
        else setCheckSwitch(false)
        if (activity.correctAnswerGo.length == 0 && activity.wrongAnswerGo.length == 0) setCheckSwitch(false)
    }, [activity.firstActivity, activity.title])

    React.useEffect(() => {
        var array = []
        props.story.activities.forEach(element => {
            array.push(e(MenuItem, {value : element.title}, element.title))
        })
        setArrayOfActivity(array)
    }, [])
    
    function displayDialog(error){
        setError(true)
        setString(error)
    }

    const [imageBackground, setImageBackground] = React.useState(null)
    const [imageActivity, setImageActivity] = React.useState(null)


    function addBackgroundImage(e){
        e.preventDefault()
        if (activity.title == "") displayDialog("Inserire prima un titolo")
        else {
            const formData = new FormData();
            formData.append("file", e.target.files[0])
            setImageBackground(formData)
            var extension = e.target.files[0].name.split(".").pop()
            var title = activity.title.charAt(0).toUpperCase() + activity.title.slice(1).toLowerCase()
            setActivity({...activity, ["backgroundImage"]: `${props.story.id}_${title}_background.${extension}`});
            var reader = new FileReader();
            reader.onload = function(){
                document.getElementById("phoneImage").setAttribute("src", reader.result)
                document.getElementById("phoneImage").classList.remove("hiddenClass")
            }
            reader.readAsDataURL(e.target.files[0]);
        } 
    }

    function addActivityImage(e){
        e.preventDefault()
        if (activity.title == "") displayDialog("Inserire prima un titolo")
        else {
            const formData = new FormData();
            formData.append("file", e.target.files[0])
            setImageActivity(formData)
            var extension = e.target.files[0].name.split(".").pop()
            var title = activity.title.charAt(0).toUpperCase() + activity.title.slice(1).toLowerCase()
            setActivity({...activity, ["activityImage"]: `${props.story.id}_${title}_background.${extension}`});
            var reader = new FileReader();
            reader.onload = function(){
                document.getElementById("mediaDiv").classList.remove("hiddenClass")
                document.getElementById("mediaDiv").style.borderRadius =  `${props.story.player.borderRadiusFrame}px` 
                document.getElementById("mediaDiv").setAttribute("src",  reader.result)
            }
            reader.readAsDataURL(e.target.files[0]);
        } 
    }

    function deleteBackgroundImage(){
        console.log(activity.backgroundImage)
        if (activity.backgroundImage != ""){
            axios.delete(`http://localhost:8000/deleteImage/${activity.backgroundImage}`)
            .then(()=>{
                setImageBackground(null)
                setActivity({...activity, ["backgroundImage"]: ``});
                document.getElementById("mediaDiv").classList.add("hiddenClass")
                document.getElementById("mediaDiv").setAttribute("src", ``)  
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    function deleteActivityImage(){
        if (activity.activityImage != ""){
            axios.delete(`http://localhost:8000/deleteImage/${activity.activityImage}`)
            .then(()=>{
                setImageBackground(null)
                setActivity({...activity, ["activityImage"]: ``});
                document.getElementById("mediaDiv").classList.add("hiddenClass")
                document.getElementById("mediaDiv").setAttribute("src", ``)  
            })
            .catch(error => {
                console.log(error)
            })
        }
    }


    const createActivity = () => {
        var title = activity.title.charAt(0).toUpperCase() + activity.title.slice(1).toLowerCase()
        if (activity.widgetType == "Quattro opzioni" && activity.fourAnswers.length < 4) displayDialog("Inserire prima esattamente 4 risposte se si vuole scegliere questo tipo di risposta")
        else {
            var tmp = {
                title                   :   title,
                heightFrame             :   activity.heightFrame,
                activityText            :   activity.activityText,
                backgroundImage         :   activity.backgroundImage,
                activityImage           :   activity.activityImage,
                altActivityImage        :   activity.altActivityImage,
                widgetType              :   activity.widgetType,
                topInput                :   activity.topInput,
                leftInput               :   activity.leftInput,
                heightInput             :   activity.heightInput,
                widthInput              :   activity.widthInput,
                errorMessage            :   activity.errorMessage,
                fourAnswers             :   activity.fourAnswers,
                multipleAnswers         :   activity.multipleAnswers,
                trueFalseAnswer         :   activity.trueFalseAnswer,
                textAnswer              :   activity.textAnswer,
                rangeAnswer             :   activity.rangeAnswer,
                correctAnswerGo         :   activity.correctAnswerGo,
                wrongAnswerGo           :   activity.wrongAnswerGo,
                activityIsUsed          :   activity.activityIsUsed,
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
            props.story.activities.forEach(element => {
                array.push(e(MenuItem, {value : element.title}, element.title))
            })
            setArrayOfActivity(array)
            var arrayOfActivityUsed = []
            props.story.activities.forEach(element => {
                if (element.firstActivity) arrayOfActivityUsed.push(element.title)
                element.correctAnswerGo.forEach(element => {
                    arrayOfActivityUsed.push(element)
                })
                element.wrongAnswerGo.forEach(element => {
                    arrayOfActivityUsed.push(element)
                })
            })
            props.story.firstActivity.correctAnswerGo = []
            props.story.activities.forEach(element => {
                if (arrayOfActivityUsed.includes(element.title)) element.activityIsUsed = true
                else element.activityIsUsed = false
                if (element.firstActivity) props.story.firstActivity.correctAnswerGo.push(element.title)
            })
            if (imageBackground != null){
                axios.post(`http://localhost:8000/addImage/${props.story.id}/${title}_background`, imageBackground, {
                    headers:{ "Content-Type": "multipart/form-data" }
                })
                .catch(error => {
                    if (error.response.status === 500) console.log("Errore con il server")
                    else console.log(error)
                })
            }
            if (imageActivity != null){
                axios.post(`http://localhost:8000/${props.story.id}/${title}_activity`, imageActivity, {
                    headers:{ "Content-Type": "multipart/form-data" }
                })
                .catch(error => {
                    if (error.response.status === 500) console.log("Errore con il server")
                    else console.log(error)
                })
            }
        }
    }

    function addFunction(array){
        var check = true
        activity[array].forEach(element => { if (element.text == answer) check = false});
        if (check){
            const newAnswer = {
                text: answer,
                score: 0,
            }
            setActivity({...activity, [array]: [...activity[array],newAnswer]});
            setUpdateTable((prev) => !prev)
        } else {
            displayDialog("Risposta già presente")
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
        const [section, key] = e.target.name.split(".");      
        if (key) {
            setActivity({...activity, [section]: {...activity[section], [key]: e.target.value}});
        } else {
            setActivity({...activity, [section]: e.target.value});
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
        setAnswerSelect()
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

    function removeFromArrayOfActivityRemoved(element){
        var index = arrayOfActivityRemoved.indexOf(element);
        if (index !== -1) {
            arrayOfActivityRemoved.splice(index, 1);
        }
    }

    function addActivityOkAnswer(){
        if (activitySelect == "") setError(true)
        else {
            setActivity({...activity, ["correctAnswerGo"]: [...activity["correctAnswerGo"], activitySelect]});
            removeFromArrayOfActivityRemoved(activitySelect)
            setActivitySelect("")
            setUpdateTable((prev) => !prev)
        }
    }

    function addActivityWrongAnswer(){
        if (activitySelect == "") setError(true)
        else {
            setActivity({...activity, ["wrongAnswerGo"]: [...activity["wrongAnswerGo"], activitySelect]});
            removeFromArrayOfActivityRemoved(activitySelect)
            setActivitySelect("")
            setUpdateTable((prev) => !prev)
        }
    }

    function addActivityOkWrongAnswer(){
        if (activitySelect == "") setError(true)
        else {
            setActivity({...activity, 
                ["correctAnswerGo"]: [...activity["correctAnswerGo"], activitySelect], 
                ["wrongAnswerGo"]  : [...activity["wrongAnswerGo"], activitySelect],
            });
            removeFromArrayOfActivityRemoved(activitySelect)
            setActivitySelect("")
            setUpdateTable((prev) => !prev)
        }
    }

    function deleteActivitiesCorrectAnswer(){
        const found = props.story.activities.find(element => element.title == activityCorrectAnswer)
        if (found && found.correctAnswerGo.length == 0 && found.wrongAnswerGo.length == 0){
            var tmp = []
            activity.correctAnswerGo.forEach(element => {
                if (element != activityCorrectAnswer) tmp.push(element)
            })
            setActivity({...activity, ["correctAnswerGo"]: tmp});
            console.log(arrayOfActivityRemoved, activityCorrectAnswer, arrayOfActivityRemoved.includes(activityCorrectAnswer))
            if (!(arrayOfActivityRemoved.includes(activityCorrectAnswer))) setArrayOfActivityRemoved(arrayOfActivityRemoved => [...arrayOfActivityRemoved, activityCorrectAnswer])
            setActivityCorrectAnswer("")
            setUpdateTable((prev) => !prev)
        } else if (found) {
            displayDialog("Questa attività non puo essere rimossa perche in essa a sua volta ci sono delle attività collegate. Per procedere prima rimuovere le attività collegati con essa");
        } else {
            displayDialog("Selezionare prima un'attività");
        }
    }

    function deleteActivitiesWrongAnswer(){
        const found = props.story.activities.find(element => element.title == activityWrongAnswer)
        if (found && found.correctAnswerGo.length == 0 && found.wrongAnswerGo.length == 0){
            var tmp = []
            activity.correctAnswerGo.forEach(element => {
                if (element != activityWrongAnswer) tmp.push(element)
            })
            setActivity({...activity, ["wrongAnswerGo"]: tmp});
            console.log(arrayOfActivityRemoved, activityWrongAnswer, arrayOfActivityRemoved.includes(activityWrongAnswer))
            if (!(arrayOfActivityRemoved.includes(activityWrongAnswer))) setArrayOfActivityRemoved(arrayOfActivityRemoved => [...arrayOfActivityRemoved, activityWrongAnswer])
            setActivityWrongAnswer("")
            setUpdateTable((prev) => !prev)
        } else if (found) {
            displayDialog("Questa attività non puo essere rimossa perche in essa a sua volta ci sono delle attività collegate. Per procedere prima rimuovere le attività collegati con essa");
        } else {
            displayDialog("Selezionare prima un'attività");
        }
    }

    async function selectActivity(e){
        var indexActivitySelected = 0
        props.story.activities.forEach((element, index) => {
            if (e.target.value == element.title) indexActivitySelected = index
        })
        await setActivity(props.story.activities[indexActivitySelected])
        setActivitySelect("")
        setUpdateTable((prev) => !prev)
    }

    return(
        e("form", {id: props.id, className: props.className}, [
            e("p", null, "TITOLO ATTIVITA'"),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "title", className: classes.input, value: activity.title, name: "title", label: "Titolo", variant:"outlined", onChange:  (e) => updateField(e)}),
                e(FormControl, {variant: "outlined", className: classes.input}, [
                    e(InputLabel, {htmlFor: "selectActivity"}, "Seleziona attività"),
                    e(Select, {id: "selectActivity", label: "Seleziona attività", onChange:  (e) => {selectActivity(e)}}, arrayOfActivity)
                ]),
            ]),
            e("hr", null),

            e("p", null, "IMMAGINE SFONDO"),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "background_image", className: classes.hide, name: `${activity.title}_background`, type: "file", accept:"image/x-png,image/gif,image/jpeg", onChange: addBackgroundImage}),
                e("label", {htmlFor:"background_image"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonImage], component: "span"}, 
                        e(Icon, {children: "image"}),  
                    ),
                    " AGGIUNGI IMMAGINE"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor:"backgroundImage"}, [
                    e(IconButton, {id: "backgroundImage", className: [classes.buttonStandard, classes.buttonImage], component: "span", onClick: deleteBackgroundImage}, 
                        e(Icon, {children: "cancel"}),  
                    ),
                    " ELIMINA IMMAGINE"
                ]),
            ]),
            e("hr", null),

            e("p", null, "IMMAGINE ATTIVITA'"),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "activity_image", className: classes.hide, name: `${activity.title}_activity`, type: "file", accept:"image/x-png,image/gif,image/jpeg", onChange: addActivityImage}),
                e("label", {htmlFor:"activity_image"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonImage], component: "span"}, 
                        e(Icon, {children: "image"}),  
                    ),
                    " AGGIUNGI IMMAGINE"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor:"activityImage"}, [
                    e(IconButton, {id: "activityImage", className: [classes.buttonStandard, classes.buttonImage], component: "span", onClick: deleteActivityImage},    
                        e(Icon, {children: "cancel"}),  
                    ),
                    " ELIMINA IMMAGINE"
                ]),
            ]),
            e("div", {className: "sx_realize_option_description"}, [
                e(TextField, {id: "altActivityImage", className: classes.input2, helperText: "Inserisci una descrizione in per una migliore accessibilità", value: activity.altActivityImage, name: "altActivityImage", label: "Descrizione immagine", type:"search", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("hr", null),

            e("p", null, "TESTO DOMANDA"),
            e("div", {className: "sx_realize_option_description"}, [
                e(TextField, {id: "activityText", className: classes.input2, multiline: true, rows: 2, value: activity.activityText, name: "activityText", label: "Testo storia", type:"search", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("hr", null),

            e("p", null, "CORNICE TESTO"),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "heightFrame", className: classes.input, value: activity.heightFrame, name: "heightFrame", label: "Altezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("hr", null),

            e("p", null, "RISPOSTA"),
            e("div", {className: "sx_realize_option"}, [
                e(FormControl, {variant: "outlined", className: classes.input}, [
                    e(InputLabel, {htmlFor: "widgetType"}, "Tipo di widget"),
                    e(Select, {id: "widgetType", label: "Tipo di widget", value: activity.widgetType, name:"widgetType", onChange:  (e) => updateField(e)}, [
                        e(MenuItem, {value: "Nessuno", selected: true}, "Nessuno"),
                        e(MenuItem, {value: "Quattro opzioni"}, "Quattro opzioni"),
                        e(MenuItem, {value: "Scelta multipla"}, "Scelta multipla"),
                        e(MenuItem, {value: "Vero o falso"}, "Vero o falso"),
                        e(MenuItem, {value: "Input testuale automatico"}, "Input testuale automatico"),
                        e(MenuItem, {value: "Input testuale valutatore"}, "Input testuale valutatore"),
                        e(MenuItem, {value: "Range"}, "Range"),
                        e(MenuItem, {value: "Foto"}, "Foto"),
                    ])
                ]),
                e(Tooltip, {title: "SPIEGAZIONE TIPO DI WIDGET"}, e(IconButton, {id: "leggend", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: (e) => {e.preventDefault(); setOpenInfoDialog(true)}}, 
                    e(Icon, {children: "not_listed_location"}),  
                )),
                e(DialogComponent2, {fun: setOpenInfoDialog, open: openInfoDialog, textError: "prova"} )
            ]),
            e("div", {id: "Quattro opzioni"}, [
                e("div", {className: "sx_realize_option"}, [
                    e(TextField, {id: "answer", className: classes.input, value: answer, name: "answer", label: "Inserire risposta", variant:"outlined", onChange:  (e) => setAnswer(e.target.value)}),
                    e(IconButton, {id: "addAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: addAnswer}, 
                        e(Icon, {children: "add"}),  
                    ),
                ]),
                e("div", {className: "sx_realize_option"}, [
                    e(FormControl, {variant: "outlined", className: [classes.input, classes.score]}, [
                        e(InputLabel, {htmlFor: "correctAnswer"}, "Selezionare risposta"),
                        e(Select, {id: "correctAnswer", label: "Selezionare risposta", name:"correctAnswer", value: answerSelect, onChange: (e) => setAnswerSelect(e.target.value)}, menuItemFourChoices)
                    ]),
                    e(TextField, {id: "score", className: [classes.input, classes.score], value: score, name: "score", label: "Score", type:"number", variant:"outlined", onChange:  (e) => setScore(e.target.value)}),
                    e(IconButton, {id: "changeScore", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: updateScore}, 
                        e(Icon, {children: "update"}),  
                    ),
                    e(IconButton, {id: "deleteAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: deleteAnswer}, 
                        e(Icon, {children: "delete"}),  
                    ),
                ]),
                e("div", {className: "sx_realize_option_table"}, [
                    e(TableContainer, {component:Paper, style:{ width: 400 }}, [
                        e(Table, {className: classes.table}, [
                            e(TableHead, null, [
                                e(TableRow, null, [
                                    e(TableCell, null, "Risposta"),
                                    e(TableCell, {align: "right"}, "Score")
                                ])
                            ]),
                            e(TableBody, null, tableFourChoices)
                        ])
                    ])    
                ]),
            ]),

            e("div", {id: "Scelta multipla", className: classes.hide}, [
                e("div", {className: "sx_realize_option"}, [
                    e(TextField, {id: "answer", className: classes.input, value: answer, name: "answer", label: "Inserire risposta", variant:"outlined", onChange:  (e) => setAnswer(e.target.value)}),
                    e(IconButton, {id: "addAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: addAnswer}, 
                        e(Icon, {children: "add"}),  
                    ),
                ]),
                e("div", {className: "sx_realize_option"}, [
                    e(FormControl, {variant: "outlined", className: [classes.input, classes.score]}, [
                        e(InputLabel, {htmlFor: "correctAnswer"}, "Selezionare risposta"),
                        e(Select, {id: "correctAnswer", label: "Selezionare risposta", name:"correctAnswer", value: answerSelect, onChange: (e) => setAnswerSelect(e.target.value)}, menuItemMultipleAnswers)
                    ]),
                    e(TextField, {id: "score", className: [classes.input, classes.score], value: score, name: "score", label: "Score", type:"number", variant:"outlined", onChange:  (e) => setScore(e.target.value)}),
                    e(IconButton, {id: "changeScore", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: updateScore}, 
                        e(Icon, {children: "update"}),  
                    ),
                    e(IconButton, {id: "deleteAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: deleteAnswer}, 
                        e(Icon, {children: "delete"}),  
                    ),
                ]),
                e("div", {className: "sx_realize_option_table"}, [
                    e(TableContainer, {component:Paper, style:{ width: 400 }}, [
                        e(Table, {className: classes.table}, [
                            e(TableHead, null, [
                                e(TableRow, null, [
                                    e(TableCell, null, "Risposta"),
                                    e(TableCell, {align: "right"}, "Score")
                                ])
                            ]),
                            e(TableBody, null, tableMultipleAnswers)
                        ])
                    ])    
                ]),
            ]),

            e("div", {id: "Vero o falso", className: classes.hide}, [
                e("div", {className: "sx_realize_option"}, [
                    e(TextField, {id: "scoreTrue", className: [classes.input, classes.score], value: activity.trueFalseAnswer.trueScore, name: "trueFalseAnswer.trueScore", label: "Vero", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    e(TextField, {id: "scorefalse", className: [classes.input, classes.score], value: activity.trueFalseAnswer.falseScore, name: "trueFalseAnswer.falseScore", label: "Falso", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                ]), 
            ]),

            e("div", {id: "Input testuale automatico", className: classes.hide}, [
                e("div", {className: "sx_realize_option"}, [
                    e(TextField, {id: "inputText", className: [classes.input, classes.score], value: activity.textAnswer.value, name: "textAnswer.value", label: "Risposta", variant:"outlined", onChange:  (e) => updateField(e)}),
                    e(TextField, {id: "inputTextScoreOk", className: [classes.input, classes.score], value: activity.textAnswer.scoreOk, name: "textAnswer.scoreOk", label: "Score risposta esatta", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    e(TextField, {id: "inputTextScoreWrong", className: [classes.input, classes.score], value: activity.textAnswer.scoreWrong, name: "textAnswer.scoreWrong", label: "Score risposta sbagliata", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                ]),
            ]),

            e("div", {id: "Range", className: classes.hide}, [
                e("div", {className: "sx_realize_option"}, [
                    e(TextField, {id: "possibleScoreStart", className: [classes.input, classes.score], value: activity.rangeAnswer.possibleStart, name: "rangeAnswer.possibleStart", label: "Minimo possibile", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    e(TextField, {id: "possibleScoreEnd", className: [classes.input, classes.score], value: activity.rangeAnswer.possibleEnd, name: "rangeAnswer.possibleEnd", label: "Massimo possibile", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    e(TextField, {id: "scoreStart", className: [classes.input, classes.score], value: activity.rangeAnswer.start, name: "rangeAnswer.start", label: "Minimo accettato", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    e(TextField, {id: "scoreEnd", className: [classes.input, classes.score], value: activity.rangeAnswer.end, name: "rangeAnswer.end", label: "Massimo accettato", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    e(TextField, {id: "scoreTrue", className: [classes.input, classes.score], value: activity.rangeAnswer.scoreOk, name: "rangeAnswer.scoreOk", label: "Score rix esatta", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    e(TextField, {id: "scorefalse", className: [classes.input, classes.score], value: activity.rangeAnswer.scoreWrong, name: "rangeAnswer.scoreWrong", label: "Score rix sbagliata", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                ]),
            ]),
            e("hr", null),

            
            e("p", null, "DIMENSIONE E POSIZIONE DELLE RISPOSTE"),
            e("span", {className:"spanExplain"}, "Il bordo rosso è solo di aiuto in questa fase di creazione, non verrà visualizzato nella storia finale"),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "topInput", className: classes.input, value: activity.topInput, name: "topInput", label: "Distanza dal lato in alto", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "leftInput", className: classes.input, value: activity.leftInput, name: "leftInput", label: "Distanza dal lato sinistro", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "heightInput", className: classes.input, value: activity.heightInput, name: "heightInput", label: "Altezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "widthInput", className: classes.input, value: activity.widthInput, name: "widthInput", label: "Larghezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("hr", null),

            e("p", null, "MESSAGGIO IN CASO DI RISPOSTA SBAGLIATA"),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "errorMessage", className: classes.input2, value: activity.errorMessage, name: "errorMessage", label: "Messaggio", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("hr", null),

            e("p", null, "ATTIVITA' SUCCESSIVA"),
            e("div", {className: "sx_realize_option"}, [
                e(FormControl, {variant: "outlined", className: [classes.input, classes.score]}, [
                    e(InputLabel, {htmlFor: "listOfActivities"}, "Selezionare risposta"),
                    e(Select, {id: "listOfActivities", label: "Selezionare attività", disabled: check, value: activitySelect,  onChange: (e) => setActivitySelect(e.target.value)}, listOfActivity)
                ]),
                e(IconButton, {id: "buttonActivityOkAnswer", disabled: check, className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton, classes.activityOkAnswer], component: "span", onClick: addActivityOkAnswer}, 
                    e(Icon, {children: "sentiment_very_satisfied_outlined_icon"}),  
                ),
                e(IconButton, {id: "buttonActivityWrongAnswer", disabled: check, className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton, classes.activityWrongAnswer], component: "span", onClick: addActivityWrongAnswer}, 
                    e(Icon, {children: "sentiment_very_dissatisfied_outlined_icon"}),  
                ),
                e(IconButton, {id: "buttonActivityOkWrongAnswer", disabled: check, className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton, classes.activityOkWrongAnswer], component: "span", onClick: addActivityOkWrongAnswer}, 
                    e(Icon, {children: "sentiment_satisfied"}),  
                ),
                e(FormControl, {id: "buttonFirstActivity", variant: "outlined", className: classes.leggendButton}, [
                    e(FormControlLabel, {className: classes.formControl, control: e(SwitchButton, {disabled: checkSwitch, checked: activity.firstActivity, onChange: () => setActivity({...activity, ["firstActivity"]: !(activity.firstActivity)})}),  label: "Attività iniziale"})
                ])        
            ]),
            e("div", {className: "sx_realize_option_table"}, [
                e(FormControl, {variant: "outlined", className: [classes.input, classes.score]}, [
                    e(InputLabel, {htmlFor: "activitiesCorrectAnswer"}, "Selezionare risposta"),
                    e(Select, {id: "activitiesCorrectAnswer", label: "Selezionare attività", disabled: check, value: activityCorrectAnswer, onChange: (e) => setActivityCorrectAnswer(e.target.value)}, menuItemActivityCorrectAnswer)
                ]),
                e(IconButton, {id: "deleteActivitiesCorrectAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], disabled: check, component: "span", onClick: deleteActivitiesCorrectAnswer}, 
                    e(Icon, {children: "delete"}),  
                ),  
            ]),
            e("div", {className: "sx_realize_option_table"}, [
                e(FormControl, {variant: "outlined", className: [classes.input, classes.score]}, [
                    e(InputLabel, {htmlFor: "activitiesWrongAnswer"}, "Selezionare risposta"),
                    e(Select, {id: "activitiesWrongAnswer", label: "Selezionare attività", disabled: check, value: activityWrongAnswer, onChange: (e) => setActivityWrongAnswer(e.target.value)}, menuItemActivityWrongAnswer)
                ]),
                e(IconButton, {id: "deleteActivitiesWrongAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], disabled: check, component: "span", onClick: deleteActivitiesWrongAnswer}, 
                    e(Icon, {children: "delete"}),  
                ),  
            ]),

            e(DialogComponent, {fun: setError, open: error, textError: string} ),
            e(Button, {id: "sumbit_formInfo", variant: "contained", size: "large", endIcon: e(Icon, {children: "save"}), className: classes.saveButton, onClick: createActivity}, "SALVA"),
        ])    
    )


}

export default Realize_activity;