const e = React.createElement;
const {Button, Icon, Radio, Select, MenuItem, Switch, TextField, InputLabel, makeStyles, FormControl, FormControlLabel, RadioGroup, withStyles, Slider, Typography} = window['MaterialUI']; //to load the component from the library

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

    React.useEffect(() => {
        document.getElementById("containerHome_userSelected_realize_info").innerHTML = "Inserisci le informazioni generali della tua storia";
        if (props.story) {
            document.getElementById("title").value               =   props.story.title;
            document.getElementById("objective").value           =   props.story.objective;
            document.getElementById("description").value         =   props.story.description;
            document.getElementById("gender").value              =   props.story.gender;
            document.getElementById("accessibility").value       =   props.story.accessibility;
            document.getElementById("participantsType").value    =   props.story.participantsType;
            document.getElementById("age").value                 =   [props.story.ageStart, props.story.ageEnd]
            setTitle(props.story.title)
            setObjective(props.story.objective)
            setDescription(props.story.description)
            setGender(props.story.gender);
            setaccessibility(props.story.accessibility.value);
            setParticipantsType(props.story.participantsType.value);
            setAge([props.story.ageStart, props.story.ageEnd]);
            props.setStep([true, true, true, true])
        }
    }, [])
    
    
    function createNewJsonFile() {
        var c = true;
        var allFields = ["title", "gender", "objective", "description"]
        allFields.forEach((element) => {
            if (document.getElementById(element).value == "") c = false;
        })
        if (!c) {
            alert("Compila prima tutti i campi")  
        } else {
            var file = {}
            if (props.story) {
                file = props.story
                file.title = title.charAt(0).toUpperCase() + title.substring(1)
                file.gender = gender
                file.objective = objective.charAt(0).toUpperCase() + objective.substring(1)
                file.description = description.charAt(0).toUpperCase() + description.substring(1)
                file.accessibility.value = accessibility
                file.participantsType.value = participantsType
                file.ageStart = age[0]
                file.ageEnd = age[1]
            }
            else {
                file = {
                    id: "",
                    user: props.user,
                    toCopy: false,
                    published: false, 
                    title: title.charAt(0).toUpperCase() + title.substring(1),
                    gender: gender,
                    objective: objective.charAt(0).toUpperCase() + objective.substring(1),
                    description: description.charAt(0).toUpperCase() + description.substring(1),
                    accessibility: {
                        value: accessibility,
                        url: ""
                    },
                    participantsType: {
                        value: participantsType,
                        url: ""
                    }, 
                    participantsNumber: 0,
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
                        text: "",
                        backgroundImage: "",
                        activityImage: "",
                        correctAnswerGo: []
                    },
                    lastActivity: {
                        heightFrame: 160,
                        text: "",
                        backgroundImage: "",
                        activityImage: "",
                        correctAnswerGo: []
                    },
                    activities: [],
                    activitiesNotAssigned: []
                }
            }
            props.setStory(file)
            props.step[0] = true
            props.setStep(props.step)
        }
    }


    return(
        e("div", {id: props.id, className: props.className}, [
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "title", className: classes.input, label: "Titolo", type:"search", variant:"outlined", onChange: (e) => setTitle(e.target.value)})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(FormControl, {id: "gender", variant: "outlined", className: classes.formControl}, [
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
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "objective", className: classes.input, label: "Obbiettivo didattico", type:"search", variant:"outlined", onChange: (e) => setObjective(e.target.value)})
            ]),
            e("div", {className: "sx_realize_option_description"}, [
                e(TextField, {id: "description", className: classes.input, multiline: true, rows: 2, inputProps: {maxLength: 140}, helperText: "Massimo 140 caratteri", label: "Breve descrizione", type:"search", variant:"outlined", onChange: (e) => setDescription(e.target.value)})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(FormControl, {id: "accessibility", variant: "outlined", className: classes.formControl}, [
                    e(FormControlLabel, {className: classes.formControl, control: e(SwitchButton, {checked: accessibility, onChange: () => setaccessibility((prev) => !prev)}),  label: "Storia accessibile"})
                ])
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(RadioGroup, {id: "participantsType", row: true, value: participantsType, onChange: (event) => setParticipantsType(event.target.value)}, [
                    e(FormControlLabel, {value: "singlePlayer", control: e(Radio, {color: "default"}), label: "Giocatore single"}),
                    e(FormControlLabel, {id: "participantsType_group", value: "group", control: e(Radio, {color: "default"}), label: "Gruppo singolo"}),
                    e(FormControlLabel, {id: "participantsType_differentGroup", value: "differentGroup", control: e(Radio, {color: "default"}), label: "Gruppi diversi"})
                ]),
            ]),
            e("div", {className: "sx_realize_option_age"}, [
                e(Typography, {htmlFor:"age", gutterBottom: true}, "Range età consigliata (anni)"),
                e(Slider, {id: "age", className: classes.age, value: age, onChange: (event, newEvent) => setAge(newEvent), valueLabelDisplay: "auto", color: "default", marks: marks})
            ]),
            e(Button, {id: "sumbit_formInfo", variant: "contained", size: "large", endIcon: e(Icon, {children: "save"}), className: classes.saveButton, onClick: createNewJsonFile}, "SALVA"),
        ])
    )
}

export default Realize_info;