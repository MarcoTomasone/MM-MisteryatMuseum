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
        textAnswer              :   {
            value       :   "",
            scoreOk     :   0,
            scoreWrong  :   0
        },
        rangeAnswer             :   {
            start       :   0,
            end         :   0,
            scoreOk     :   0,
            scoreWrong  :   0
        },
        correctAnswerGo         :   [],
        wrongAnswerGo           :   [],
        activityIsUsed          :   false,
        firstActivity           :   false,
    })
    const [listOfActivity, setListOfActivity] = React.useState([]);
    const [activitySelect, setActivitySelect] = React.useState("");
    const [activityCorrectAnswer, setActivityCorrectAnswer] = React.useState("");
    const [menuItemActivityCorrectAnswer, setMenuItemActivityCorrectAnswer] = React.useState([])
    const [activityWrongAnswer, setActivityWrongAnswer] = React.useState("");
    const [menuItemActivityWrongAnswer, setMenuItemActivityWrongAnswer] = React.useState([])
    const [arrayOfActivity, setArrayOfActivity] = React.useState([]);
    const [errorAnswerInserted, setErrorAnswerInserted] = React.useState(false);
    const [errorAnswerSelected, setErrorAnswerSelected] = React.useState(false);
    const [errorNotNumber, setErrorNotNumber] = React.useState(false);
    const [openInfoDialog, setOpenInfoDialog] = React.useState(false);
    const [errorLimitAnswer, setErrorLimitAnswer] = React.useState(false);
    const [errorAnswerDuplicated, setErrorAnswerDuplicated] = React.useState(false);
    const [errorFourAnswers, setErrorFourAnswers] = React.useState(false);
    const [check, setCheck] = React.useState(true);
    const [checkSwitch, setCheckSwitch] = React.useState(false);
    const [error, setError] = React.useState(false);

    
    
    function addImage(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", e.target.files[0])
        axios.post(`http://localhost:8000/addImage/${props.story.id}/${e.target.name}`, formData, {
            headers:{ "Content-Type": "multipart/form-data" }
        })
        .catch(error => {
            if (error.response.status === 500) console.log("Errore con il server")
            else console.log(error)
        })  
    }

    function deleteImage(){
        axios.delete(`http://localhost:8000/deleteImage/${props.story.id}/act${props.firstLast}`)
    }

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
    }, [activity.heightInput])

    React.useEffect(() => {
        document.getElementById("inputDiv").style.width     = `${activity.widthInput}px`;
    }, [activity.widthInput])

    React.useEffect(() => {
        if (activity.backgroundImage == ""){
            if (props.story.player.backgroundImage == ""){
                document.getElementById("phoneImage").classList.add("hiddenClass")
                document.getElementById("phoneImage").setAttribute("src", ``)        }
            else {
                document.getElementById("phoneImage").classList.remove("hiddenClass")
                document.getElementById("phoneImage").setAttribute("src", `../../server/upload/${props.story.player.backgroundImage}`)
            }    
        } else {
            document.getElementById("phoneImage").classList.remove("hiddenClass")
            document.getElementById("phoneImage").setAttribute("src", `../../server/upload/${activity.backgroundImage}`)
        }
    }, [activity.backgroundImage])

    React.useEffect(() => {
        if (activity.activityImage == ""){
            document.getElementById("mediaDiv").classList.add("hiddenClass")
            document.getElementById("mediaDiv").setAttribute("src", ``)       
        } else {
            document.getElementById("mediaDiv").classList.remove("hiddenClass")
            document.getElementById("mediaDiv").setAttribute("src", `../../server/upload/${activity.activityImage}`)
        }
    }, [activity.activityImage])

    React.useEffect(() => {
        if (!(props.story.activities.some(element => element.title == activity.title))){
            activity.correctAnswerGo = []
            activity.wrongAnswerGo = []
            activity.activityIsUsed = false
            activity.firstActivity = false
        }
        var tmp = []
        props.story.activities.forEach(element => {
            if (element.title != activity.title && element.firstActivity == false && element.activityIsUsed == false && !(activity.correctAnswerGo.includes(element.title)) && !(activity.wrongAnswerGo.includes(element.title))) tmp.push(e(MenuItem, {value : element.title}, element.title))
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
    }, [activity.firstActivity, activity.title])

    React.useEffect(() => {
        var array = []
        props.story.activities.forEach(element => {
            array.push(e(MenuItem, {value : element.title}, element.title))
        })
        setArrayOfActivity(array)
    }, [])    

    function ricorsiveDelete(string){
        var index = props.story.activities.findIndex(element => element.title == string)
        if (index >= 0){
            props.story.activities[index].activityIsUsed = false
            props.story.activities[index].correctAnswerGo.forEach(element => {
                ricorsiveDelete(element)
            })
            props.story.activities[index].correctAnswerGo = []
            props.story.activities[index].wrongAnswerGo.forEach(element => {
                ricorsiveDelete(element)
            })
            props.story.activities[index].wrongAnswerGo = []
        }
    }
 

    const createActivity = () => {
        if (activity.widgetType == "Quattro opzioni" && activity.fourAnswers.length < 4) {setErrorFourAnswers(true)}
        else {
            var title = activity.title.charAt(0).toUpperCase() + activity.title.slice(1).toLowerCase()
            var tmp = {
                title                   :   title,
                heightFrame             :   activity.heightFrame,
                activityText            :   activity.activityText,
                backgroundImage         :   activity.backgroundImage,
                activityImage           :   activity.activityImage,
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
            props.setStep([true, true, true, true])
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
            props.story.activities.forEach(element => {
                if (element.activityIsUsed == false && element.firstActivity == false){
                    ricorsiveDelete(element.title)
                    activity.correctAnswerGo = []
                    activity.wrongAnswerGo = []
                    setActivityCorrectAnswer("")
                    setActivityWrongAnswer("")
                    setUpdateTable((prev) => !prev)
                }
            })
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
            setErrorAnswerDuplicated(true)
        }
    }

    function addAnswer(){
        if (answer == "") {setErrorAnswerInserted(true)}
        else {
            if ((activity.widgetType == "Quattro opzioni" && activity.fourAnswers.length >= 4)){
                setErrorLimitAnswer(true)
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
        } else if (answerSelect != "") { setErrorNotNumber(true)} 
        else { setErrorAnswerSelected(true) }
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
        } else {setErrorAnswerSelected(true)}
        setAnswerSelect("")
        setScore(0)
    }

    function addActivityOkAnswer(){
        if (activitySelect == "") setError(true)
        else {
            setActivity({...activity, ["correctAnswerGo"]: [...activity["correctAnswerGo"], activitySelect]});
            props.story.activities.forEach(element => {
                if (element.title == activitySelect) element.activityIsUsed = true
            })
            setActivitySelect("")
            setUpdateTable((prev) => !prev)
        }
    }

    function addActivityWrongAnswer(){
        if (activitySelect == "") setError(true)
        else {
            setActivity({...activity, ["wrongAnswerGo"]: [...activity["wrongAnswerGo"], activitySelect]});
            props.story.activities.forEach(element => {
                if (element.title == activitySelect) element.activityIsUsed = true
            })
            setActivitySelect("")
            setUpdateTable((prev) => !prev)
        }
    }

    function deleteActivitiesCorrectAnswer(){
        var tmp = []
        activity.correctAnswerGo.forEach(element => {
            if (element != activityCorrectAnswer) tmp.push(element)
            else ricorsiveDelete(activityCorrectAnswer)
        })
        setActivity({...activity, ["correctAnswerGo"]: tmp});
        setActivityCorrectAnswer("")
        setUpdateTable((prev) => !prev)
    }

    function deleteActivitiesWrongAnswer(){
        var tmp = []
        activity.wrongAnswerGo.forEach(element => {
            if (element != activityWrongAnswer) tmp.push(element)
            else ricorsiveDelete(activityCorrectAnswer)
        })
        setActivity({...activity, ["wrongAnswerGo"]: tmp});
        setActivityWrongAnswer("")
        setUpdateTable((prev) => !prev)
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
                e("input", {id: "background_image", className: classes.hide, name: `${activity.title}_background`, type: "file", accept:"image/x-png,image/gif,image/jpeg", onChange: addImage}),
                e("label", {htmlFor:"background_image"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonImage], component: "span"}, 
                        e(Icon, {children: "image"}),  
                    ),
                    " AGGIUNGI IMMAGINE"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor:"delete_background_image"}, [
                    e(IconButton, {id: "delete_background_image", className: [classes.buttonStandard, classes.buttonImage], component: "span", onClick: deleteImage}, 
                        e(Icon, {children: "cancel"}),  
                    ),
                    " ELIMINA IMMAGINE"
                ]),
            ]),
            e("hr", null),

            e("p", null, "IMMAGINE ATTIVITA'"),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "activity_image", className: classes.hide, name: `${activity.title}_activity`, type: "file", accept:"image/x-png,image/gif,image/jpeg", onChange: addImage}),
                e("label", {htmlFor:"activity_image"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonImage], component: "span"}, 
                        e(Icon, {children: "image"}),  
                    ),
                    " AGGIUNGI IMMAGINE"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor:"delete_activity_image"}, [
                    e(IconButton, {id: "delete_activity_image", className: [classes.buttonStandard, classes.buttonImage], component: "span", onClick: deleteImage}, 
                        e(Icon, {children: "cancel"}),  
                    ),
                    " ELIMINA IMMAGINE"
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
                    e(TextField, {id: "scoreTrue", className: [classes.input, classes.score], value: activity.rangeAnswer.start, name: "rangeAnswer.start", label: "Minimo", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    e(TextField, {id: "scorefalse", className: [classes.input, classes.score], value: activity.rangeAnswer.end, name: "rangeAnswer.end", label: "Massimo", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    e(TextField, {id: "scoreTrue", className: [classes.input, classes.score], value: activity.rangeAnswer.scoreOk, name: "rangeAnswer.scoreOk", label: "Score risposta esatta", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                    e(TextField, {id: "scorefalse", className: [classes.input, classes.score], value: activity.rangeAnswer.scoreWrong, name: "rangeAnswer.scoreWrong", label: "Score risposta sbagliata", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                ]),
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

            e(DialogComponent, {fun: setErrorFourAnswers, open: errorFourAnswers, textError: "Inserire prima esattamente 4 risposte se si vuole scegliere questo tipo di risposta"} ),
            e(DialogComponent, {fun: setErrorAnswerInserted, open: errorAnswerInserted, textError: "Inserire prima una risposta"} ),
            e(DialogComponent, {fun: setErrorNotNumber, open: errorNotNumber, textError: "Inserire un valore numerico dove richiesto"} ),
            e(DialogComponent, {fun: setErrorAnswerSelected, open: errorAnswerSelected, textError: "Selezionare prima una risposta"} ),
            e(DialogComponent, {fun: setErrorLimitAnswer, open: errorLimitAnswer, textError: "Raggiunto limite risposte per questo tipo di widget"} ),
            e(DialogComponent, {fun: setErrorAnswerDuplicated, open: errorAnswerDuplicated, textError: "Risposta già presente"} ),
            e(DialogComponent, {fun: setError, open: error, textError: "Selezionare prima una risposta"} ),
            e(Button, {id: "sumbit_formInfo", variant: "contained", size: "large", endIcon: e(Icon, {children: "save"}), className: classes.saveButton, onClick: createActivity}, "SALVA"),
        ])    
    )


}

export default Realize_activity;