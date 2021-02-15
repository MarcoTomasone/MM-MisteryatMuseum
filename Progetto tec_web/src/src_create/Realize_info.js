const e = React.createElement;
const {Button, Icon, Radio, Select, MenuItem, Switch, TextField, InputLabel, makeStyles, FormControl, FormControlLabel, RadioGroup, withStyles, Slider, Typography } = window['MaterialUI']; //to load the component from the library

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: 233,
        [`& fieldset`]: {
            borderRadius: 15,
        }
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    saveButton: {
        backgroundColor: "grey",
        color: "white",
        borderRadius: 10,
        minWidth: 110,
        fontSize: 15,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        margin: theme.spacing(3),
    },
    input: {
        [`& fieldset`]: {
            borderRadius: 15,
        }
    },
    age: {
        color: "grey", 
        width: 300,
    },
    inputMessage: {
        [`& fieldset`]: {
            borderRadius: 15,
            width: 300,
        },
        width: 300,
        marginBottom: 5,
        marginTop: 5
    },
    rangeMessage: {
        [`& fieldset`]: {
            borderRadius: 15,
            width:120,
        },
        width: 120,
        marginBottom: 5,
        marginTop: 5
    }
}));

const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 50,
      label: '50',
    },
    {
      value: 100,
      label: '100',
    },
  ];

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


function Realize_info(props){
    const classes = useStyles();

    const [title, setTitle] = React.useState("");
    const [gender, setGender] = React.useState(""); 
    const [objective, setObjective] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [accessibility, setaccessibility] = React.useState(false);
    const [participantsType, setParticipantsType] = React.useState('singlePlayer');
    const [age, setAge] = React.useState([0, 100]);
    const [finalMessage, setFinalMessage] = React.useState({
        message1: "",
        range1: [-100000, 0],
        message2: "",
        range2: [1, 100],
        message3: "",
        range3: [101, 100000]
    });

    React.useEffect(() => {
        document.getElementById("containerHome_userSelected_realize_info").innerHTML = "Inserisci le informazioni generali della tua storia";
        if (props.story) {
            setTitle(props.story.title)
            setObjective(props.story.objective)
            setDescription(props.story.description)
            setGender(props.story.gender);
            setaccessibility(props.story.accessibility.value);
            setParticipantsType(props.story.participantsType.value);
            setAge([props.story.ageStart, props.story.ageEnd]);
            setFinalMessage(props.story.finalMessage);
            props.setStep([true, false])
        }
    }, [])

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
    
    
    async function createNewJsonFile() {
        var c = true;
        var allFields = ["title", "gender", "objective", "description"]
        allFields.forEach((element) => {
            if (document.getElementById(element).value == "") c = false;
        })
        if (!c) {
            alert("Compila prima i primi quattro campi essenziali")  
        } else if (finalMessage.range2[0] >=  finalMessage.range2[1]){
            alert("I range scelti per il messaggio finale devono essere coerenti")  
        }else {
            var file = {}
            var acc = (accessibility) ? "../../img/accessibility_1.png" : "../../img/no_accessibility_1.png"
            var player = (participantsType == "singlePlayer") ? "../../img/single.png" : (participantsType == "group") ? "../../img/one_group.png" : "../../img/more_group.png"
            if (props.story) {
                file = props.story
                file.title = changeLetter(title.charAt(0).toUpperCase() + title.substring(1))
                file.gender = gender
                file.objective = changeLetter(objective.charAt(0).toUpperCase() + objective.substring(1))
                file.description = changeLetter(description.charAt(0).toUpperCase() + description.substring(1))
                file.accessibility = {
                    value: accessibility,
                    url: acc
                }
                file.participantsType = {
                    value: participantsType,
                    url: player
                },
                file.participantsType.value = participantsType
                file.ageStart = age[0]
                file.ageEnd = age[1]
                file.finalMessage = finalMessage
            }
            else {
                var idNUmber = 0;
                await axios.get(`http://localhost:8000/idNumber/${props.user}`)
                .then((response) => idNUmber = response.data)
                file = {
                    id: `${props.user}_${idNUmber}`,
                    user: props.user,
                    published: false, 
                    title: changeLetter(title.charAt(0).toUpperCase() + title.substring(1)),
                    gender: gender,
                    objective: changeLetter(objective.charAt(0).toUpperCase() + objective.substring(1)),
                    description: changeLetter(description.charAt(0).toUpperCase() + description.substring(1)),
                    accessibility: {
                        value: accessibility,
                        url: acc
                    },
                    participantsType: {
                        value: participantsType,
                        url: player
                    }, 
                    ageStart: age[0],
                    ageEnd: age[1],
                    player: {
                        background: "#000000",
                        backgroundImage: "",
                        frameColor: "#ffffff",
                        topFrame: 80,
                        leftFrame: 15,
                        widthFrame: 170,
                        weightFrame: 1,
                        borderRadiusFrame: 0,
                        textColor: "#ffffff",
                        textBackgroundColorActived: false,
                        textBackgroundColor: "#000000",
                        textBackgroundColorOpacity: 0,
                        fontFamily: "Arial",
                        sizeFont: 14,
                        weightFont: 500,
                        image: {
                            height: 437,
                            width: 202,
                            top: 0,
                            left: 0,
                        },
                        inputDiv: {
                            backgroundColor: "#000000",
                            frameColor: "#ffffff",
                            textColor: "#ffffff",
                            borderRadius: 0,
                        },
                        scoreDiv: {
                            backgroundColor: "#000000",
                            frameColor: "#ffffff",
                            textColor: "#ffffff",
                            height: 20,
                            width: 100,
                            top: 15,
                            left: 50,
                            borderRadius: 20,
                        },
                        nextButton: {
                            backgroundColor: "#000000",
                            frameColor: "#ffffff",
                            textColor: "#ffffff",
                            height: 30,
                            width: 170,
                            top: 390,
                            left: 15,
                            borderRadius: 20,
                        },
                        chatButton: {
                            backgroundColor: "#000000",
                            frameColor: "#ffffff",
                            textColor: "#ffffff",
                            height: 30,
                            width: 60,
                            top: 40,
                            left: 125,
                            borderRadius: 20,
                        },
                        helpButton: {
                            backgroundColor: "#000000",
                            frameColor: "#ffffff",
                            textColor: "#ffffff",
                            height: 30,
                            width: 60,
                            top: 40,
                            left: 15,
                            borderRadius: 20,
                        }
                    },
                    firstActivity: {
                        heightFrame: 160,
                        activityText: "",
                        backgroundImage: "",
                        activityImage: "",
                        altActivityImage: "",
                        correctAnswerGo: [],
                        streamVideo: ""
                    },
                    lastActivity: {
                        heightFrame: 160,
                        activityText: "",
                        backgroundImage: "",
                        activityImage: "",
                        altActivityImage: "",
                        correctAnswerGo: [],
                        streamVideo: ""
                    },
                    activities: [],
                    finalMessage: finalMessage
                }
            }
            props.setStory(file)
            props.step[0] = true
            props.setStep(props.step)
        }
    }


    return(
        e("div", {id: props.id, className: props.className}, [
            e("div", {className: "playerDivStyle"}, [
                e("p", null, "INFORMAZIONI GENERALI"),
                e("div", {className: "playerDivStyleElement"}, [
                    e(TextField, {id: "title", className: classes.input, value: title, label: "Titolo", type:"search", variant:"outlined", onChange: (e) => setTitle(e.target.value)})
                ]),
                e("div", {className: "playerDivStyleElement"}, [
                    e(FormControl, {id: "gender", variant: "outlined", className: classes.formControl, value: gender}, [
                        e(InputLabel, {htmlFor: "gender_label"}, "Genere"),
                        e(Select, {inputProps: {name: "Genere", id: "gender_label"}, label: "Genere", value: gender, onChange: (event) => setGender(event.target.value)}, [
                            e(MenuItem, {value: "Avventura"}, "Avventura"),
                            e(MenuItem, {value: "Thriller"}, "Thriller"),
                            e(MenuItem, {value: "Azione"}, "Azione"),
                            e(MenuItem, {value: "Storico"}, "Storico"),
                            e(MenuItem, {value: "Horror"}, "Horror"),
                            e(MenuItem, {value: "Fantasy"}, "Fantasy"),
                            e(MenuItem, {value: "Fantascienza"}, "Fantascienza"),
                            e(MenuItem, {value: "Spionaggio"}, "Spionaggio"),
                            e(MenuItem, {value: "Spaziale"}, "Spaziale"),
                            e(MenuItem, {value: "Western"}, "Western"),
                        ])
                    ])
                ]),
                e("div", {className: "playerDivStyleElement"}, [
                    e(TextField, {id: "objective", className: classes.input, value: objective, label: "Obbiettivo didattico", type:"search", variant:"outlined", onChange: (e) => setObjective(e.target.value)})
                ]),
                e("div", {className: "playerDivStyleElement"}, [
                    e(TextField, {id: "description", className: classes.input, value: description, multiline: true, rows: 2, inputProps: {maxLength: 140}, helperText: "Massimo 140 caratteri", label: "Breve descrizione", type:"search", variant:"outlined", onChange: (e) => setDescription(e.target.value)})
                ]),
            ]),
            e("div", {className: "playerDivStyle"}, [
                e("p", null, "INDICAZIONI PER L'USO DELLA STORIA"),
                e("div", {className: "playerDivStyleElement"}, [
                    e(FormControl, {id: "accessibility", variant: "outlined", className: classes.formControl, value: accessibility}, [
                        e(FormControlLabel, {className: classes.formControl, control: e(SwitchButton, {checked: accessibility, onChange: () => setaccessibility((prev) => !prev)}),  label: "Storia accessibile"})
                    ])
                ]),
                e("div", {className: "playerDivStyleElement"}, [
                    e(RadioGroup, {id: "participantsType", row: true, value: participantsType, onChange: (event) => setParticipantsType(event.target.value)}, [
                        e(FormControlLabel, {value: "singlePlayer", control: e(Radio, {color: "default"}), label: "Giocatore singolo"}),
                        e(FormControlLabel, {id: "participantsType_group", value: "group", control: e(Radio, {color: "default"}), label: "Gruppo singolo"}),
                        e(FormControlLabel, {id: "participantsType_differentGroup", value: "differentGroup", control: e(Radio, {color: "default"}), label: "Gruppi diversi"})
                    ]),
                ]),
                e("div", {className: "playerDivStyleElement"}, [
                    e(Typography, {htmlFor:"age", gutterBottom: true}, "Range et\xe0 consigliata (anni)"),
                    e(Slider, {id: "age", className: classes.age, value: age, onChange: (event, newEvent) => setAge(newEvent), valueLabelDisplay: "auto", color: "default", marks: marks})
                ]),
            ]),
            e("div", {className: "playerDivStyle"}, [
                e("p", null, "MESSAGIO FINALE IN BASE AL PUNTEGGIO"),
                e("div", {className: "playerDivStyleElement"}, [
                    e("div", {className: "sx_realize_option_message"}, [
                        e("div", {className: "sx_realize_option_message_firstColumn"}, [
                            e(TextField, {id: "messagge1", className: classes.inputMessage, value: finalMessage.message1, label: "Messaggio con score non buono", type:"search", variant:"outlined", onChange: (e) => setFinalMessage({...finalMessage, ["message1"]: e.target.value})}),
                            e(TextField, {id: "messagge2", className: classes.inputMessage, value: finalMessage.message2, label: "Messaggio con score nella media", type:"search", variant:"outlined", onChange: (e) => setFinalMessage({...finalMessage, ["message2"]: e.target.value})}),
                            e(TextField, {id: "messagge3", className: classes.inputMessage, value: finalMessage.message3, label: "Messaggio con score ottimo", type:"search", variant:"outlined", onChange: (e) => setFinalMessage({...finalMessage, ["message3"]: e.target.value})}),
                        ]),
                        e("div", {className: "sx_realize_option_message_secondColumn"}, [
                            e(TextField, {id: "value2", className: classes.rangeMessage, value: finalMessage.range1[1], label: "Valore", type:"number", variant:"outlined", onChange:  (e) => {
                                setFinalMessage({...finalMessage, ["range1"]: [-10000, parseInt(e.target.value)], ["range2"]: [parseInt(e.target.value) + 1, finalMessage.range2[1]]})
                            }}),
                            e(TextField, {id: "value1", className: classes.rangeMessage, value: finalMessage.range2[1], label: "Valore", type:"number", variant:"outlined", onChange:  (e) => {
                                setFinalMessage({...finalMessage, ["range2"]: [finalMessage.range2[0], parseInt(e.target.value)], ["range3"]: [parseInt(e.target.value) + 1, 10000]})
                            }}),
                        ]),
                        e("div", {className: "sx_realize_option_message_thirdColumn"}, [
                            e("div", null, `[-\u221E, ${finalMessage.range1[1]}]`),
                            e("div", null, `[${finalMessage.range2[0]}, ${finalMessage.range2[1]}]`),
                            e("div", null, `[${finalMessage.range3[0]}, \u221E]`)
                        ]),
                    ]),
                ]),
            ]),
            e(Button, {id: "sumbit_formInfo", variant: "contained", size: "large", endIcon: e(Icon, {children: "save"}), className: classes.saveButton, onClick: createNewJsonFile}, "SALVA"),
        ])
    )
}

export default Realize_info;