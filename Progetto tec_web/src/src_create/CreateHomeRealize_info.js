const e = React.createElement;
const {Radio, Select, MenuItem, Switch } = window['MaterialUI']; //to load the component from the library



function CreateHomeRealize_info(props){
    //const [accesibility, setAccesibility] = React.useState('Si');
    const [accesibility, setAccesibility] = React.useState(false);
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
                value: accesibility,
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
                colorFrame: "#ffffff",
                topFrame: "80px",
                leftFrame: "15px",
                thicknessFrame: "1px",
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
                    borderColor: "#ffffff",
                    textColor: "#ffffff",
                    height: "30px",
                    width: "60px",
                    top: "30px",
                    left: "125px",
                    borderRadius: "20px",
                },
                helpButton: {
                    backgroundColor: "#000000",
                    borderColor: "#ffffff",
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
            /*e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "accessibility"}, "Storia accessibile:"),
                e(Radio, {id: "accessibility_yes", checked: accesibility === 'Si', onChange: (event) => setAccesibility(event.target.value), color: "default", value: "Si", name: "radio-button-demo"}),
                e("label", {id: "label_accessibility_yes", htmlFor: "accessibility_yes"}, "SI"),
                e(Radio, {id: "accessibility_no", checked: accesibility === 'No', onChange: (event) => setAccesibility(event.target.value), color: "default", value: "No", name: "radio-button-demo"}),
                e("label", {id: "label_accessibility_no",htmlFor: "accessibility_no"}, "NO"),
            ]),*/
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "accessibility"}, "Storia accessibile:"),
                e(Switch, {checked: accesibility, onChange: () => setAccesibility((prev) => !prev)}),
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