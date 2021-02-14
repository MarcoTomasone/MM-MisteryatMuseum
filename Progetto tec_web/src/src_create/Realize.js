const e = React.createElement;

import CreateHomeRealize_info from "./Realize_info.js"
import CreateHomeRealize_player from "./Realize_player.js"
import CreateHomeRealize_activity from "./Realize_activity.js"
import CreateHomeRealize_firstLastActivity from "./Realize_FL_Activity.js"
import CreateHomeRealize_grafo from "./Realize_grafo.js"
import {DialogComponent} from "./Dialog.js"

const {Button, makeStyles, IconButton, Icon, Slider} = window['MaterialUI']; //to load the component from the library

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
    redButton: {
        backgroundColor: "red",
        minWidth: 110,
        color: "white",
        fontSize: 13,
        lineHeight: 1,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        margin: theme.spacing(0.4),
        "&:hover": {
            backgroundColor: 'orange',
            color: "black",
        }
    },
    buttonStandard: {
        color: "grey",
    }
}));


function Realize(props){
    /*window.addEventListener('beforeunload', function (e) {
        e.preventDefault(); 
        location.href = "./?#/Create/login"
    });*/

    const classes = useStyles();

    if (props.user == "") props.setUser(localStorage.getItem(`user0`));    
    else {
        localStorage.setItem(`user0`, props.user);
        props.setUser(localStorage.getItem(`user0`));    
    }
    const [step, setStep] =  React.useState([false, false]);
    const [story, setStory] =  React.useState(props.storyToModify);
    const [pageLoad, setPageLoad] =  React.useState(e(CreateHomeRealize_info, {
        id: "CreateHomeRealize_info",
        className: "CreateHomeRealize_info",
        user: props.user,
        story: story,
        setStory: setStory,
        step: step,
        setStep: setStep
    }));


    return e("div", {className: "containerHome"}, [
        e("div", {className:"containerHome_userSelected"}, [
            e("p", null, `UTENTE SELEZIONATO: ${props.user}`),
            e("p", {id: "containerHome_userSelected_realize_info"})
        ]),
        e("div", {className: "containerHome_realize"}, [
            e("div", {id: "sx_realize", className: "sx_realize"}, [
                e("div", {id: "sx_realize_top", className: "sx_realize_top"}, pageLoad),
                e("div", {className: "sx_realize_bottom"}, [
                    //e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => console.log(story)}, "JSON"),
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
                            var newStep = step
                            newStep[1] = true
                            setStep(newStep)
                            setPageLoad(e(CreateHomeRealize_player, {
                                id: "CreateHomeRealize_player", 
                                className: "CreateHomeRealize_player", 
                                user: props.user, 
                                story: story, 
                                setStep: setStep
                            }))
                        } else {
                            alert("Prima compila e salva i campi di info generali")
                        }
                    }},"PLAYER"),
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => {
                        if (step[1] == true){
                            setPageLoad(e(CreateHomeRealize_firstLastActivity, {
                                id: "CreateHomeRealize_firstActivity", 
                                className: "CreateHomeRealize_firstLastActivity", 
                                user: props.user, 
                                story: story, 
                                setStory: setStory, 
                                activity: story.firstActivity,
                                indexActivity: "firstActivity",
                                title: "Crea l'attivit\xe0 introduttiva alla tua storia",
                                text: "Inserisci un testo introduttivo alla tua storia, per far immergere al meglio il giocatore"
                            }))
                        } else {
                            alert("Prima controlla lo stile del player")
                        }
                    }}, "ATTIVIT\xc0 INTRODUTTIVA"),
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => {
                        if (step[1] == true){
                            setPageLoad(e(CreateHomeRealize_firstLastActivity, {
                                id: "CreateHomeRealize_firstActivity", 
                                className: "CreateHomeRealize_firstLastActivity", 
                                user: props.user, 
                                story: story, 
                                setStory: setStory,
                                activity: story.lastActivity,
                                indexActivity: "lastActivity",
                                title: "Crea l'attivit\xe0 conclusiva alla tua storia",
                                text: "Inserisci un testo finale alla tua storia, per far conludere al meglio il giocatore"
                            }))
                        } else {
                            alert("Prima controlla lo stile del player")
                        }
                    }}, "ATTIVIT\xc0 CONCLUSIVA"),
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => {
                        if (step[1] == true){
                            setPageLoad(e(CreateHomeRealize_activity, {
                                id: "CreateHomeRealize_activity", 
                                className: "CreateHomeRealize_activity", 
                                user: props.user, 
                                story: story,
                                setStory: setStory,
                            }))
                        } else {
                            alert("Prima controlla lo stile del player")
                        }
                    }}, "CREA/MODIFICA ATTIVIT\xc0"),
                    e(Button, {variant: "contained", size: "large", className: classes.button, onClick: () => {
                        if(step[0] == true){
                            setPageLoad(e(CreateHomeRealize_grafo, {
                                id: "CreateHomeRealize_lastActivity", 
                                className: "CreateHomeRealize_firstLastActivity CreateHomeRealize_graph", 
                                user: props.user, 
                                story: story, 
                            }))
                        } else {
                            alert("Prima compila e salva i campi di info generali")
                        }
                    }}, "GRAFO ATTIVIT\xc0"),
                   e(Button, {variant: "contained", size: "large", className: classes.redButton, onClick: () => {
                    if(step[0] == true){
                        axios.post(`http://localhost:8000/createStory/id`, {user: props.user, story: story})
                        .then((response) => alert(`Storia pubblicata correttamente. Vai nella sezione "SELZIONA" dove troverai il suo qr code`))
                        .catch((error) => console.log(error)); 
                    } else {
                        alert("Prima compila e salva i campi di info generali")
                    }
                    }}, "INVIA")
                ])
            ]),
            
            e("div", {id: "dx_realize", className: "dx_realize"}, [
                e("div", {id: "phone"}, [
                    e("div", {id: "phoneInternal"}, [
                        e("img", {id: "phoneImage", src: "", className: "hiddenClass"}),
                        e("div", {id: "scoreDiv"}, "Points: 520"),
                        e("div", {id: "chatButton"}, "CHAT"),
                        e("div", {id: "helpButton"}, "HELP"),
                        e("div", {id: "phoneText"}, [
                            e("div", {id: "textDiv"}, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.. It has survived not only five centuries... It has survived not only five centuries... It has survived not only five centuries...."),
                            e("img", {id: "mediaDiv", src: "", className: "hiddenClass"}),
                        ]),
                        e("div", {id: "inputDiv"}, [                  
                            e("div", {id: "Quattro opzioni div"}, [
                                e("div", {id: "option1", className: "optionFourChoices style"}, "Risposta 1"),
                                e("div", {id: "option2", className: "optionFourChoices style"}, "Risposta 2"),
                                e("div", {id: "option3", className: "optionFourChoices style"}, "Risposta 3"),
                                e("div", {id: "option4", className: "optionFourChoices style"}, "Risposta 4"),
                            ]),
                            e("div", {id: "Scelta multipla div", className: "hiddenClass"}, [
                                e("select", {id: "option5", className: "multOptions style"}, [
                                    e("option", null, "Risposta 1"),
                                    e("option", null, "Risposta 2"),
                                    e("option", null, "Risposta 3"),
                                    e("option", null, "Risposta 4"),
                                    e("option", null, "Risposta 5"),
                                    e("option", null, "Risposta 6"),
                                    e("option", null, "Risposta 7"),
                                ])
                            ]),
                            e("div", {id: "Vero o falso div", className: "hiddenClass"}, [
                                e("div", {id: "option6", className: "optionTrueFalse style"}, "Vero"),
                                e("div", {id: "option7", className: "optionTrueFalse style"}, "Falso"),
                            ]),
                            e("div", {id: "Input testuale automatico div", className: "hiddenClass"}, [
                                e("textarea", { id:"option8", className: "style"})
                            ]),
                            e("div", {id: "Input testuale valutatore div", className: "hiddenClass"}, [
                                e("textarea", { id:"option9", className: "style"})
                            ]),
                            e("div", {id: "Range div", className: "hiddenClass"}, [
                                e(Slider, { id:"option10"}),
                            ]),
                            e("div", {id: "Foto div", className: "hiddenClass"}, [
                                e("div", {id: "circleDiv"}, [
                                    e(IconButton, {id:"option11", className: [classes.buttonStandard], component: "span"}, 
                                        e(Icon, {children: "photo_camera", fontSize:"large"}),  
                                    ),   
                                ]), 
                            ]),
                        ]),
                        e("div", {id: "nextButton"}, "SUCCESSIVO")
                    ])
                ])
            ])
        ]),
        e(DialogComponent, {fun: props.setOpenErrorDialog, open: props.openErrorDialog, textError: props.textErrorDialog} )
    ])
}

export default Realize;