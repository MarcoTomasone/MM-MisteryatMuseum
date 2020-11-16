const e = React.createElement;

import CreateHomeRealize_info from "./Realize_info.js"
import CreateHomeRealize_player from "./Realize_player.js"
import CreateHomeRealize_activity from "./Realize_activity.js"
import CreateHomeRealize_firstLastActivity from "./Realize_FL_Activity.js"
import DialogComponent from "./Dialog.js"

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


function Realize(props){
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
    const [step, setStep] =  React.useState([false, false, false, false]);
    const [pageLoad, setPageLoad] =  React.useState(e(CreateHomeRealize_info, {id: "CreateHomeRealize_info", className: "CreateHomeRealize_info", user: props.user, story: story, setStory: setStory, step: step, setStep: setStep}));
    const [x, setX] =  React.useState(true);
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const [textErrorDialog, setTextErrorDialog] = React.useState("");


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
                        setPageLoad(e(CreateHomeRealize_info, {
                            id: "CreateHomeRealize_info", 
                            className: "CreateHomeRealize_info", 
                            user: props.user, 
                            story: story, 
                            setStory: setStory, 
                            step: step, 
                            setStep: setStep
                        }))
                    }}, "INFO"),
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => {
                        if(step[0] == true){
                            setPageLoad(e(CreateHomeRealize_player, {
                                id: "CreateHomeRealize_player", 
                                className: "CreateHomeRealize_player", 
                                user: props.user, 
                                story: story, 
                                setStory: setStory, 
                                setStep: setStep
                            }))
                        } else {
                            setTextErrorDialog("Prima compila e salva i campi di info generali")
                            setOpenErrorDialog(true)
                        }
                    }},"PLAYER"),
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => {
                        //if (step[1] == true){
                            setPageLoad(e(CreateHomeRealize_firstLastActivity, {
                                id: "CreateHomeRealize_firstActivity", 
                                className: "CreateHomeRealize_firstLastActivity", 
                                user: props.user, 
                                story: story, 
                                setStory: setStory, 
                                setStep: setStep, 
                                activity: story.firstActivity,
                                indexActivity: "firstActivity",
                                title: "Crea l'attività introduttiva alla tua storia",
                                text: "Inserisci un testo introduttivo alla tua storia, per far immergere al meglio il giocatore"
                            }))
                        /*} else {
                            setTextErrorDialog("Prima compila e salva i campi sullo stile del player")
                            setOpenErrorDialog(true)
                        }*/
                    }}, "ATTIVITA' INTRODUTTIVA"),
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => {
                        //if (step[2] == true){
                            setPageLoad(e(CreateHomeRealize_firstLastActivity, {
                                id: "CreateHomeRealize_firstActivity", 
                                className: "CreateHomeRealize_firstLastActivity", 
                                user: props.user, 
                                story: story, 
                                setStory: setStory, 
                                setStep: setStep, 
                                activity: story.lastActivity,
                                indexActivity: "lastActivity",
                                title: "Crea l'attività conclusiva alla tua storia",
                                text: "Inserisci un testo finale alla tua storia, per far conludere al meglio il giocatore ed eventualmente lasciargli un ultimo messaggio"
                            }))
                        /*} else {
                            setTextErrorDialog("Prima crea e salva l'attività introduttiva")
                            setOpenErrorDialog(true)          
                        }*/
                    }}, "ATTIVITA' CONCLUSIVA"),
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => {
                        //if (step[2] == true){
                            setPageLoad(e(CreateHomeRealize_activity, {
                                id: "CreateHomeRealize_activity", 
                                className: "CreateHomeRealize_activity", 
                                user: props.user, 
                                story: story,
                                setStep: setStep,
                                setStory: setStory,
                                lenght: story.activities.lenght
                            }))
                        /*} else {
                            setTextErrorDialog("Prima crea e salva l'attività introduttiva")
                            setOpenErrorDialog(true)   
                        }*/
                    }}, "CREA ATTIVITA'"),
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => {
                        //if (step[3] == true){
                            seFirstLast("last");
                            setPageLoad(e(CreateHomeRealize_firstLastActivity, {
                                id: "CreateHomeRealize_lastActivity", 
                                className: "CreateHomeRealize_firstLastActivity", 
                                user: props.user, 
                                story: story, 
                                setStory: setStory, 
                            }))
                        /*} else {
                            setTextErrorDialog("Prima crea e salva almeno un'attività diversa da quella introduttiva")
                            setOpenErrorDialog(true)   
                        }*/
                    }}, "MODIFICA ATTIVITA'")
                ])
            ]),
            e("div", {id: "dx_realize", className: "dx_realize"}, [
                e("div", {id: "phone"}, [
                    e("div", {id: "phoneInternal"}, [
                        e("img", {id: "phoneImage", src: "../../img/Empty.png"}),
                        e("button", {id: "chatButton"}, "CHAT"),
                        e("button", {id: "helpButton", onClick: blinkHelpButton}, "HELP"),
                        e("div", {id: "phoneText"}, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.. It has survived not only five centuries... It has survived not only five centuries... It has survived not only five centuries...."),
                        e("img", {id: "mediaDiv", src: "../../img/Empty.png"}),
                        e("div", {id: "inputDiv"}),
                        e("button", {id: "nextButton"}, "SUCCESSIVO")
                    ])
                ])
            ])
        ]),
        e(DialogComponent, {fun: setOpenErrorDialog, open: openErrorDialog, textError: textErrorDialog} )
    ])
}

export default Realize;