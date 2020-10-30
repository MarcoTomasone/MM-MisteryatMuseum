const e = React.createElement;

import CreateHomeRealize_info from "./CreateHomeRealize_info.js"
import CreateHomeRealize_player from "./CreateHomeRealize_player.js"
import CreateHomeRealize_activity from "./CreateHomeRealize_activity.js"
import CreateHomeRealize_firstLastActivity from "./CreateHomeRealize_firstLastActivity.js"

const {Button, makeStyles} = window['MaterialUI']; //to load the component from the library

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button: {
        backgroundColor: "grey",
        color: "white",
        borderRadius: 10,
        minWidth: 110,
        fontSize: 13,
        lineHeight: 1,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        margin: theme.spacing(0.4),
    },
}));

const text1 = "Inserisci un testo introduttivo alla tua storia, per far immergere al meglio il giocatore"
const text2 = "Inserisci un testo finale alla tua storia, per far conludere al meglio il giocatore ed eventualmente lasciargli un ultimo messaggio"


function CreateHomeRealize(props){
    /*window.addEventListener('beforeunload', function (e) {
        e.preventDefault(); 
        e.returnValue = ''; 
    });*/

    const classes = useStyles();

    if (props.user == "") props.setUser(localStorage.getItem(`user0`));    
    else {
        localStorage.setItem(`user0`, props.user);
        props.setUser(localStorage.getItem(`user0`));    
    }

    const [story, setStory] =  React.useState({});
    const [step, setStep] =  React.useState([false, false, false]);
    const [firstActivity, setFirstActivity] =  React.useState(false);
    const [lastActivity, setLastActivity] =  React.useState(false);
    const [pageLoad, setPageLoad] =  React.useState(e(CreateHomeRealize_info, {id: "CreateHomeRealize_info", className: "CreateHomeRealize_info", user: props.user, story: story, setStory: setStory, step: step, setStep: setStep}));
    const [x, setX] =  React.useState(true);

    function blinkHelpButton(){
            if (x==true) document.getElementById("helpButton").classList.add("blinkHelpButton")
            else document.getElementById("helpButton").classList.remove("blinkHelpButton")
            setX((prev) => !prev)
    }

    return e("div", {className: "containerHome"}, [
        e("div", {className:"containerHome_userSelected"}, [
            e("p", null, `UTENTE SELEZIONATO: ${props.user}`),
            e("p", {id: "containerHome_userSelected_realize_info"})
        ]),
        e("div", {className: "containerHome_realize"}, [
            e("div", {id: "sx_realize", className: "sx_realize"}, [
                e("div", {id: "sx_realize_top", className: "sx_realize_top"}, pageLoad),
                e("div", {className: "sx_realize_bottom"}, [
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => console.log(story)}, "JSON"),
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => {
                        setPageLoad(e(CreateHomeRealize_info, {id: "CreateHomeRealize_info", className: "CreateHomeRealize_info", user: props.user, story: story, setStory: setStory, step: step, setStep: setStep}))
                    }}, "INFO"),
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => {
                        //if(step[0] == true){
                            setPageLoad(e(CreateHomeRealize_player, {id: "CreateHomeRealize_player", className: "CreateHomeRealize_player", user: props.user, story: story, setStory: setStory, step: step, setStep: setStep}))
                        /*} else {
                            alert("Prima compila e conferma i campi di info generali")
                        }*/
                    }},"PLAYER"),
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => {
                        //if (step[1] == true){
                            setPageLoad(e(CreateHomeRealize_firstLastActivity, {
                                id: "CreateHomeRealize_firstActivity", 
                                className: "CreateHomeRealize_firstLastActivity", 
                                user: props.user, 
                                story: story, 
                                setStory: setStory, 
                                step: step, 
                                setStep: setStep, 
                                firstLast: 0,
                                activity: firstActivity,
                                setActivity: setFirstActivity,
                                text: text1
                            }))
                        /*} else {
                            alert("Prima compila e conferma i campi sullo stile del player")
                        }*/
                    }}, "ATTIVITA' INTRODUTTIVA"),
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => {
                        //if (step[1] == true){
                            setPageLoad(e(CreateHomeRealize_firstLastActivity, {
                                id: "CreateHomeRealize_firstActivity", 
                                className: "CreateHomeRealize_firstLastActivity", 
                                user: props.user, 
                                story: story, 
                                setStory: setStory, 
                                step: step, 
                                setStep: setStep, 
                                firstLast: story.activities.length,
                                activity: lastActivity,
                                setActivity: setLastActivity,
                                text: text2
                            }))
                        /*} else {
                            alert("Prima compila e conferma i campi sullo stile del player")
                        }*/
                    }}, "ATTIVITA' CONCLUSIVA"),
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => {
                        if (step[2] == true){
                            setPageLoad(e(CreateHomeRealize_activity, {id: "CreateHomeRealize_activity", className: "CreateHomeRealize_activity", user: props.user, story: story, setStory: setStory, step: step, setStep: setStep}))
                        } else {
                            alert("Crea almeno un'attività")
                        }
                    }}, "CREA ATTIVITA'"),
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => {
                        //if (step[1] == true){
                            seFirstLast("last");
                            setPageLoad(e(CreateHomeRealize_firstLastActivity, {id: "CreateHomeRealize_lastActivity", className: "CreateHomeRealize_firstLastActivity", user: props.user, story: story, setStory: setStory, step: step, setStep: setStep, firstLast: firstLast}))
                        /*} else {
                            alert("Prima compila e conferma i campi sullo stile del player")
                        }*/
                    }}, "MODIFICA ATTIVITA'")
                ])
            ]),
            e("div", {id: "dx_realize", className: "dx_realize"}, [
                e("div", {id: "phone"}, [
                    e("div", {id: "phoneInternal"}, [
                        e("img", {id: "phoneImage"}),
                        e("button", {id: "chatButton"}, "CHAT"),
                        e("button", {id: "helpButton", onClick: blinkHelpButton}, "HELP"),
                        e("div", {id: "phoneText"}, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.. It has survived not only five centuries... It has survived not only five centuries... It has survived not only five centuries...."),
                        e("div", {id: "mediaDiv"}),
                        e("button", {id: "inputDiv"}),
                        e("button", {id: "nextButton"}, "SUCCESSIVO")
                    ])
                ])
            ])
        ])
    ])
}

export default CreateHomeRealize;






/*function prova(){
    const colorInputEl = document.getElementById("color")
    colorInputEl.addEventListener("input", (event) => {
        const color = event.target.value
        const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
        if (color.match(hexColorRegex)){
            colorInputEl.style.borderColor = color
        } else {
            colorInputEl.style.borderColor = "rgb(266, 266, 266)"
        }
    })
}




function labelAndButton(props){
    return e("div", null, [
        e("label", {id: props.labelId, htmlFor: props.inputID}, props.labelText),
        e("input", {id: props.inputID, type: props.inputType})
    ])
}

function submitAction(e){
    e.preventDefault();
    const storia = {
        titolo: document.getElementById("titolo").value,
        numero: parseInt(document.getElementById("number").value),
        genere: document.getElementById("gender").value,
        genere: document.getElementById("gender2").value
    }
    console.log(storia)
}
*/


/*if (c) {

    //location.href = "./#/Create/realize/player"
    /*axios.post('http://localhost:8000/createStory', {
        user: props.user,
        file
    })
    .catch((error) => console.log(error));
    props.setArrayActivities(["ciao"])
    alert(arrayActivities)
}*/