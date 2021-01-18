const e = React.createElement;
const {TextField, IconButton, makeStyles, Button, Icon, FormControl, InputLabel, Select, MenuItem, Tooltip, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } = window['MaterialUI']; //to load the component from the library
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

function Realize_activity(props){
    const classes = useStyles();
    const [immageUpload, set_immageUpload] = React.useState(true)
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
        media                   :   "",
        topInput                :   320,
        leftInput               :   15,
        heightInput             :   60,
        widthInput              :   170,
        widgetType              :   "Quattro opzioni",
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

    
    function addImage(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", e.target.files[0])
        axios.post(`http://localhost:8000/addImage/${props.story.id}/act${props.firstLast}`, formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
        .then((response) => {})
        .catch(error => {
            if (error.response.status === 500) {
                console.log("Errore con il server")
            } else {
                console.log(error)
            }
        })  
    }

    function deleteImage(){
        axios.delete(`http://localhost:8000/deleteImage/${props.story.id}/act${props.firstLast}`)
        set_immageUpload(true)
    }
    

    React.useEffect(() => {
        var tmp = activity.widgetType
        const type = ["Quattro opzioni", "Scelta multipla", "Vero o falso", "Input testuale", "Range", "Foto"];
        type.forEach(element =>{
            if (element == tmp) document.getElementById(element + " div").classList.remove("hiddenClass")
            else document.getElementById(element + " div").classList.add("hiddenClass")
        })
        document.getElementById("inputDiv").classList.remove("hiddenClass")
    })

    React.useEffect(() => {
        document.getElementById("containerHome_userSelected_realize_info").innerHTML = "Crea una nuova attività";
        document.getElementById("phoneText").style.height   = `${activity.heightFrame}px`;
        document.getElementById("phoneText").innerHTML      =    activity.activityText;
        document.getElementById("inputDiv").style.top       = `${activity.topInput}px`;
        document.getElementById("inputDiv").style.left      = `${activity.leftInput}px`;
        document.getElementById("inputDiv").style.height    = `${activity.heightInput}px`;
        document.getElementById("inputDiv").style.width     = `${activity.widthInput}px`;
    }, [activity])

    
    React.useEffect(() => {
        var tmp = []
        var tmp2 = []
        var tmp3 = []
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
        tmp = []
        for (var i = 0; i < activity.multipleAnswers.length; i++){
            tmp.push(e(MenuItem, {value: activity.multipleAnswers[i].text}, activity.multipleAnswers[i].text))
        }
        setMenuItemMultipleAnswers(tmp)
        activity.multipleAnswers.forEach(element => {
            tmp3.push(
                e(TableRow, {key: element.text}, [
                    e(TableCell, {component:"th", scope:"row"}, element.text),
                    e(TableCell, null, element.score),
                ])
            )
        })
        setTableMultipleAnswers(tmp3)
    }, [updateTable])


    React.useEffect(() => {
        const tmp = ["Quattro opzioni", "Scelta multipla", "Vero o falso", "Input testuale", "Range"];
        tmp.forEach(element => {
            if (activity.widgetType == element) document.getElementById(element).classList.remove(classes.hide)
            else document.getElementById(element).classList.add(classes.hide)
        })
        setScore(0);
        setAnswerSelect();
    }, [activity.widgetType])


    React.useEffect(() => {
        var tmp = []
        props.story.activitiesNotAssigned.forEach(element => {
            if (element != activity.title) tmp.push(e(MenuItem, {value : element}, element))
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

  


    const createActivity = () => {
        if (activity.widgetType == "Quattro opzioni" && activity.fourAnswers.length < 4) {setErrorFourAnswers(true)}
        else {
            var tmp = {
                title                   :   activity.title,
                heightFrame             :   activity.heightFrame,
                activityText            :   activity.activityText,
                //media                   :   activity.media,
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
                wrongAnswerGo           :   activity.wrongAnswerGo
            };
            props.setStep([true, true, true, true])
            var check = false
            var indexActivityUpdate = 0
            props.story.activities.forEach((element, index) => {
                if (element.title == activity.title) {
                    check = true
                    indexActivityUpdate = index
                }
            })
            if (check) { props.story.activities.splice(indexActivityUpdate, 1, tmp)} 
            else { 
                props.story.activities.push(tmp)
                props.story.activitiesNotAssigned.push(tmp.title)
            }
            var array = []
            props.story.activities.forEach(element => {
                array.push(e(MenuItem, {value : element.title}, element.title))
            })
            setArrayOfActivity(array)
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
            setActivity({
            ...activity,
            [section]: {
              ...activity[section],
              [key]: e.target.value
            }
          });
        } else {
          setActivity({
            ...activity,
            [section]: e.target.value
          });
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
        const index = props.story.activitiesNotAssigned.indexOf(activitySelect);
        if (index > -1) {
            props.story.activitiesNotAssigned.splice(index, 1);
        }
        setActivity({...activity, ["correctAnswerGo"]: [...activity["correctAnswerGo"], activitySelect]});
        setActivitySelect("")
        setUpdateTable((prev) => !prev)
    }

    function addActivityWrongAnswer(){
        const index = props.story.activitiesNotAssigned.indexOf(activitySelect);
        if (index > -1) {
            props.story.activitiesNotAssigned.splice(index, 1);
        }
        setActivity({...activity, ["wrongAnswerGo"]: [...activity["wrongAnswerGo"], activitySelect]});
        setActivitySelect("")
        setUpdateTable((prev) => !prev)
    }

    function deleteActivitiesCorrectAnswer(){
        var tmp = []
        activity.correctAnswerGo.forEach(element => {
            if (element != activityCorrectAnswer) tmp.push(element)
        })
        setActivity({...activity, ["correctAnswerGo"]: tmp});
        setActivity({...activity, ["activitiesNotAssigned"]: activityCorrectAnswer});
        setActivityCorrectAnswer("")
        setUpdateTable((prev) => !prev)
    }

    function deleteActivitiesWrongAnswer(){
        var tmp = []
        activity.wrongAnswerGo.forEach(element => {
            if (element != activityWrongAnswer) tmp.push(element)
        })
        setActivity({...activity, ["wrongAnswerGo"]: tmp});
        setActivity({...activity, ["activitiesNotAssigned"]: activityWrongAnswer});
        setActivityWrongAnswer("")
        setUpdateTable((prev) => !prev)
    }



    async function selectActivity(e){
        var indexActivitySelected = 0
        props.story.activities.forEach((element, index) => {
            if (e.target.value == element.title) indexActivitySelected = index
        })
        await setActivity(props.story.activities[indexActivitySelected])
        setUpdateTable((prev) => !prev)
    }

    return(
        e("form", {id: props.id, className: props.className}, [
            e("p", null, "TITOLO ATTIVITA'"),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "title", className: classes.input, value: activity.title, name: "title", label: "Titolo", variant:"outlined", onChange:  (e) => updateField(e)}),
                e(FormControl, {variant: "outlined", className: classes.input}, [
                    e(InputLabel, {htmlFor: "selectAtvity"}, "Seleziona attività"),
                    e(Select, {id: "selectAtvity", label: "Seleziona attività", onChange:  (e) => {selectActivity(e)}}, arrayOfActivity)
                ]),
            ]),
            e("hr", null),

            e("p", null, "MEDIA"),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "background_image", className: classes.hide, type: "file", accept:"image/x-png,image/gif,image/jpeg", onChange: addImage}),
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
                        e(MenuItem, {value: "Quattro opzioni", selected: true}, "Quattro opzioni"),
                        e(MenuItem, {value: "Scelta multipla"}, "Scelta multipla"),
                        e(MenuItem, {value: "Vero o falso"}, "Vero o falso"),
                        e(MenuItem, {value: "Input testuale"}, "Input testuale"),
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
                        e(Select, {id: "correctAnswer", label: "Selezionare risposta", name:"correctAnswer", onChange: (e) => setAnswerSelect(e.target.value)}, menuItemFourChoices)
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
                        e(Select, {id: "correctAnswer", label: "Selezionare risposta", name:"correctAnswer", onChange: (e) => setAnswerSelect(e.target.value)}, menuItemMultipleAnswers)
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

            e("div", {id: "Input testuale", className: classes.hide}, [
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
                    e(Select, {id: "listOfActivities", label: "Selezionare attività", onChange: (e) => setActivitySelect(e.target.value)}, listOfActivity)
                ]),
                e(IconButton, {id: "buttonActivityOkAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton, classes.activityOkAnswer], component: "span", onClick: addActivityOkAnswer}, 
                    e(Icon, {children: "sentiment_very_satisfied_outlined_icon"}),  
                ),
                e(IconButton, {id: "buttonActivityWrongAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton, classes.activityWrongAnswer], component: "span", onClick: addActivityWrongAnswer}, 
                    e(Icon, {children: "sentiment_very_dissatisfied_outlined_icon"}),  
                ),
            ]),
            e("div", {className: "sx_realize_option_table"}, [
                e(FormControl, {variant: "outlined", className: [classes.input, classes.score]}, [
                    e(InputLabel, {htmlFor: "activitiesCorrectAnswer"}, "Selezionare risposta"),
                    e(Select, {id: "activitiesCorrectAnswer", label: "Selezionare attività", onChange: (e) => setActivityCorrectAnswer(e.target.value)}, menuItemActivityCorrectAnswer)
                ]),
                e(IconButton, {id: "deleteActivitiesCorrectAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: deleteActivitiesCorrectAnswer}, 
                    e(Icon, {children: "delete"}),  
                ),  
            ]),
            e("div", {className: "sx_realize_option_table"}, [
                e(FormControl, {variant: "outlined", className: [classes.input, classes.score]}, [
                    e(InputLabel, {htmlFor: "activitiesWrongAnswer"}, "Selezionare risposta"),
                    e(Select, {id: "activitiesWrongAnswer", label: "Selezionare attività", onChange: (e) => setActivityWrongAnswer(e.target.value)}, menuItemActivityWrongAnswer)
                ]),
                e(IconButton, {id: "deleteActivitiesWrongAnswer", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: deleteActivitiesWrongAnswer}, 
                    e(Icon, {children: "delete"}),  
                ),  
            ]),

            e(DialogComponent, {fun: setErrorFourAnswers, open: errorFourAnswers, textError: "Inserire prima esattamente 4 risposte se si vuole scegliere questo tipo di risposta"} ),
            e(DialogComponent, {fun: setErrorAnswerInserted, open: errorAnswerInserted, textError: "Inserire prima una risposta"} ),
            e(DialogComponent, {fun: setErrorNotNumber, open: errorNotNumber, textError: "Inserire un valore numerico dove richiesto"} ),
            e(DialogComponent, {fun: setErrorAnswerSelected, open: errorAnswerSelected, textError: "Selezionare prima una risposta"} ),
            e(DialogComponent, {fun: setErrorLimitAnswer, open: errorLimitAnswer, textError: "Raggiunto limite risposte per questo tipo di widget"} ),
            e(DialogComponent, {fun: setErrorAnswerDuplicated, open: errorAnswerDuplicated, textError: "Risposta già presente"} ),
            e(Button, {id: "sumbit_formInfo", variant: "contained", size: "large", endIcon: e(Icon, {children: "save"}), className: classes.saveButton, onClick: createActivity}, "SALVA"),
        ])    
    )


}

export default Realize_activity;