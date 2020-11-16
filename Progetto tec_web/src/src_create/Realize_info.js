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
        if (props.step[0] == true) {
            document.getElementById("title").value          =   props.story.title;
            setGender(props.story.gender);
            document.getElementById("objective").value      =   props.story.objective;
            document.getElementById("description").value    =   props.story.description;
            setaccessibility(props.story.accessibility.value);
            setParticipantsType(props.story.participantsType.value);
            setAge([props.story.ageStart, props.story.ageEnd]);
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
            axios.get(`http://localhost:8000/createStory/id/${props.user}`)
            .then((response) => {
                var file = {
                    id: response.data,
                    user: props.user, 
                    published: false, 
                    title: title.charAt(0).toUpperCase() + title.substring(1),
                    gender: gender,
                    objective: objective.charAt(0).toUpperCase() + title.substring(1),
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
                        backgroundImageCheck: true,
                        backgroundImageUrl: "../../server/upload/Empty.png",
                        frameColor: "#ffffff",
                        topFrame: 80,
                        leftFrame: 15,
                        widthFrame: 170,
                        weightFrame: 1,
                        borderRadiusFrame: 0,
                        textColor: "#ffffff",
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
                            top: 30,
                            left: 125,
                            borderRadius: 20,
                        },
                        helpButton: {
                            backgroundColor: "#000000",
                            frameColor: "#ffffff",
                            textColor: "#ffffff",
                            height: 30,
                            width: 60,
                            top: 30,
                            left: 15,
                            borderRadius: 20,
                        }
                    },
                    firstActivity: {
                        heightFrame: 160,
                        text: "",
                        topImage: 250,
                        leftImage: 15,
                        heightImage: 50,
                        widthImage: 170
                    },
                    lastActivity: {
                        heightFrame: 160,
                        text: "",
                        topImage: 250,
                        leftImage: 15,
                        heightImage: 50,
                        widthImage: 170
                    },
                    activities: []
                }
                props.setStory(file)
                props.setStep([true, false, false])
            })
            .catch((error) => console.log(error))
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



/*e("label", {htmlFor: "accessibility"}, "Storia accessibile:"),
e("select", {id: "accessibility"}, [
    e("option", {value: ""}, "-----"),
    e("option", {value: "Si"}, "Si"),
    e("option", {value: "No"}, "No")
])*/

/*
e("select", {id: "participantsType"}, [
    e("option", {value: ""}, "----------------------"),
    e("option", {value: "singlePlayer"}, "Giocatore singolo"),
    e("option", {value: "group"}, "Gruppo singolo"),
    e("option", {value: "differentGroup"}, "Gruppi diversi"),
])
 */

/*e("div", {className: "sx_realize_option"}, [
    e("label", {htmlFor: "gender"}, "Genere storia:"),
    e("select", {id: "gender"}, [
        e("option", {value: ""}, "------------------"),
        e("option", {value: "Avventura"}, "Avventura"),
        e("option", {value: "Thriller"}, "Thriller"),
        e("option", {value: "Azione"}, "Azione"),
        e("option", {value: "Storico"}, "Storico"),
        e("option", {value: "Horror"}, "Horror"),
        e("option", {value: "Fantasy"}, "Fantasy"),
        e("option", {value: "Fantascienza"}, "Fantascienza"),
        e("option", {value: "Spionaggio"}, "Spionaggio"),
        e("option", {value: "Spaziale"}, "Spaziale"),
        e("option", {value: "Western"}, "Western")
    ])
]),*/

/*e("div", {className: "sx_realize_option"}, [
    e("label", {htmlFor: "accessibility"}, "Storia accessibile:"),
    e(Radio, {id: "accessibility_yes", checked: accessibility === 'Si', onChange: (event) => setaccessibility(event.target.value), color: "default", value: "Si", name: "radio-button-demo"}),
    e("label", {id: "label_accessibility_yes", htmlFor: "accessibility_yes"}, "SI"),
    e(Radio, {id: "accessibility_no", checked: accessibility === 'No', onChange: (event) => setaccessibility(event.target.value), color: "default", value: "No", name: "radio-button-demo"}),
    e("label", {id: "label_accessibility_no",htmlFor: "accessibility_no"}, "NO"),
]),*/











/*
const e = React.createElement;
const {Radio, Select, MenuItem, Switch, TextField } = window['MaterialUI']; //to load the component from the library



function CreateHomeRealize_info(props){
    const [title, setTitle] = React.useState("");
    const [accessibility, setaccessibility] = React.useState(false);
    const [participantsType, setParticipantsType] = React.useState('singlePlayer');
    const [gender, setGender] = React.useState("Avventura");

    React.useEffect(() => {
        document.getElementById("containerHome_userSelected_realize_info").innerHTML = "Inserisci le informazioni generali della tua storia";
        if (props.step[0] == true) {
            document.getElementById("title").value = props.story.title;
            document.getElementById("gender").value = props.story.gender;
            document.getElementById("objective").value = props.story.objective;
            document.getElementById("description").value = props.story.description;
            document.getElementById("accessibility").value = props.story.accessibility.value;
            document.getElementById("participantsType").value = props.story.participantsType.value;
            document.getElementById("ageStart").value = props.story.ageStart;
            document.getElementById("ageEnd").value = props.story.ageEnd;
        }
        if (props.realizeMode == "info"){
            document.getElementById("containerHome_userSelected_realize_info").innerHTML = "Inserisci le informazioni generali";
        }
    }, [])
    
    function createNewJsonFile() {
        var c = true;
        var allFields = ["title", "description", "ageStart", "ageEnd"]
        allFields.forEach((element) => {
            if (document.getElementById(element).value == "") c = false;
        })
        var file = {
            id: "",
            user: props.user, 
            published: false, 
            title: document.getElementById("title").value.charAt(0).toUpperCase() + document.getElementById("title").value.substring(1),
            gender: gender,
            objective: document.getElementById("objective").value,
            description: document.getElementById("description").value.charAt(0).toUpperCase() + document.getElementById("description").value.substring(1),
            accessibility: {
                value: accessibility,
                url: ""
            },
            participantsType: {
                value: participantsType,
                url: ""
            }, 
            participantsNumber: 0,
            ageStart: document.getElementById("ageStart").value,
            ageEnd: document.getElementById("ageEnd").value,
            player: {
                background: "#000000",
                frameColor: "#ffffff",
                topFrame: "80px",
                leftFrame: "15px",
                weightFrame: "1px",
                widthFrame: "170px",
                borderRadiusFrame: "0px",
                textColor: "#ffffff",
                fontFamily: "Arial, sans-serif",
                sizeFont: "14px",
                weightFont: 500,
                image: {
                    height: "437px",
                    width: "202px",
                    top: "0px",
                    left: "0px",
                },
                chatButton: {
                    backgroundColor: "#000000",
                    frameColor: "#ffffff",
                    textColor: "#ffffff",
                    height: "30px",
                    width: "60px",
                    top: "30px",
                    left: "125px",
                    borderRadius: "20px",
                },
                helpButton: {
                    backgroundColor: "#000000",
                    frameColor: "#ffffff",
                    textColor: "#ffffff",
                    height: "30px",
                    width: "60px",
                    top: "30px",
                    left: "15px",
                    borderRadius: "20px",
                }
            },
            activities: []
        }
        if (!c) {
            alert("Compila prima tutti i campi")  
        } else {
            props.setStory(file)
            props.setStep([true, false, false])
        }
    }


    return(
        e("form", {id: props.id, className: props.className, onSubmit: createNewJsonFile}, [
            e("div", {className: "sx_realize_option"}, [
                //e(TextField, {id: "title", required: true, label: "Titolo", type:"search", variant:"outlined"}),
                e("label", {htmlFor: "title"}, "Titolo:"),
                e("input", {id: "title"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "gender"}, "Genere storia:"),
                e(Select, {value: gender, onChange: (event) => setGender(event.target.value)}, [
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
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "objective"}, "Obbiettivo didattico:"),
                e("input", {id: "objective"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "description"}, "Descrizione:"),
                e("textarea", {id: "description", placeholder: "Scrivi qui una breve descrizione della tua storia"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "accessibility"}, "Storia accessibile:"),
                e(Switch, {checked: accessibility, onChange: () => setaccessibility((prev) => !prev)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "participantsType"}, "Tipo partecipanti: "),
                e(Radio, {id: "participantsType_single", checked: participantsType === 'singlePlayer', onChange: (event) => setParticipantsType(event.target.value), color: "default", value: "singlePlayer", name: "radio-button-demo"}),
                e("label", {id: "label_participantsType_single", htmlFor: "participantsType_single"}, "Giocatore singolo"),
                e(Radio, {id: "participantsType_group", checked: participantsType === 'group', onChange: (event) => setParticipantsType(event.target.value), color: "default", value: "group", name: "radio-button-demo"}),
                e("label", {id: "label_participantsType_group",htmlFor: "participantsType_group"}, "Gruppo singolo"),
                e(Radio, {id: "participantsType_differentGroup", checked: participantsType === 'differentGroup', onChange: (event) => setParticipantsType(event.target.value), color: "default", value: "differentGroup", name: "radio-button-demo"}),
                e("label", {id: "label_participantsType_differentGroup",htmlFor: "participantsType_differentGroup"}, "Gruppi diversi"),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "age"}, "Fascia di eta:"),
                e("div", {id: "age"}, [
                    e("input", {id: "ageStart", type: "number"}),
                    e("div", {id: "ageSeparator"}, "-"),
                    e("input", {id: "ageEnd", type: "number"})
                ])
            ]),
            e("input", {id: "sumbit_formInfo", type: "submit", value: "SALVA"}),
        ])
    )
}

export default CreateHomeRealize_info;
*/