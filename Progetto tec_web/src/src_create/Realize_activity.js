const e = React.createElement;
const {TextField, IconButton, makeStyles, Button, Icon, FormControl, InputLabel, Select, MenuItem, Tooltip} = window['MaterialUI']; //to load the component from the library
import {DialogComponent, DialogComponent2} from "./Dialog.js"


const useStyles = makeStyles((theme) => ({
    input: {
        width: 233,
        [`& fieldset`]: {
            borderRadius: 15,
        }
    },
    input2: {
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
        marginLeft: 20,
        marginRight: 10,
    }
}));

function Realize_activity(props){
    const classes = useStyles();
    const [immageUpload, set_immageUpload] = React.useState(true)
    const [activitySaved, setActivitySaved] = React.useState(false)
    const [activity, setActivity] = React.useState({
        title           :   "",
        heightFrame     :   160,
        text            :   "",
        media           :   false,
        topImage        :   250,
        leftImage       :   15,
        heightImage     :   50,
        widthImage      :   170,
        score           :   0,
        widgetType      :   "Quattro opzioni",
        answer          :   [],
        correctAnswers  :   [],
        correctAnswerGo :   0,
        wrongAnswerGo   :   0,
    })
    const [openInfoDialog, setOpenInfoDialog] = React.useState(false);
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const [answer, setAnswer] = React.useState()
    const [arrayOfAnswer, setArrayOfAnswer] = React.useState({
        number: 0,
        array: []
    })
    const [arrayOfMenuItem, setArrayOfMenuItem] = React.useState([])
    const [answerSelect, setAnswerSelect] = React.useState("")
    const [score, setScore] = React.useState(0)

    


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
        document.getElementById("containerHome_userSelected_realize_info").innerHTML = "Crea una nuova attività";
        document.getElementById("phoneText").style.height   = `${activity.heightFrame}px`;
        document.getElementById("phoneText").innerHTML      =    activity.text;
        document.getElementById("mediaDiv").style.top       = `${activity.topImage}px`;
        document.getElementById("mediaDiv").style.left      = `${activity.leftImage}px`;
        document.getElementById("mediaDiv").style.height    = `${activity.heightImage}px`;
        document.getElementById("mediaDiv").style.width     = `${activity.widthImage}px`;
    }, [activity])

    
    React.useEffect(() => {
        var tmp = []
        for (var i = 0; i < arrayOfAnswer.number; i++){
            if (i == 0) tmp.push(e(MenuItem, {value: arrayOfAnswer.array[0].text, selected: true}, arrayOfAnswer.array[0].text))
            else tmp.push(e(MenuItem, {value: arrayOfAnswer.array[i].text}, arrayOfAnswer.array[i].text))
        }
        setArrayOfMenuItem(tmp)

    }, [arrayOfAnswer])


    const createActivity = () => {
        var oldStory = props.story;
        var tmp = {
            title           :   activity.title,
            heightFrame     :   activity.heightFrame,
            text            :   activity.text,
            media           :   activity.media,
            topImage        :   activity.topImage,
            leftImage       :   activity.leftImage,
            heightImage     :   activity.heightImage,
            widthImage      :   activity.widthImage,
            score           :   activity.score,
            widgetType      :   activity.widgetType,
            answer          :   arrayOfAnswer.array,
            correctAnswers  :   activity.correctAnswers,
            correctAnswerGo :   activity.correctAnswerGo,
            wrongAnswerGo   :   activity.wrongAnswerGo
        };
        if (activitySaved == false){
            oldStory.activities.push(tmp)
            setActivitySaved(true)
            props.setStep([true, true, true, true])
        } else {
            const lenght = oldStory.activities.lenght - 1;
            oldStory.activities.splice(lenght, 1, tmp)
        }
        props.setStory(oldStory);
    }

    function addAnswer(){
        if ((activity.widgetType == "Quattro opzioni" && arrayOfAnswer.number >= 4) || (activity.widgetType == "Vero o falso" && arrayOfAnswer.number >= 2)){
            setOpenErrorDialog(true)
            setAnswer("")
        } else {
            const newAnswer = {
                text: answer,
                score: 0,
            }
            setArrayOfAnswer({
                number: arrayOfAnswer.number +1,
                array: [...arrayOfAnswer.array, newAnswer]
            })
            setAnswer("")
            var node = document.createElement("LI");
            node.setAttribute("id", answer)
            node.style.color = "red"
            var textnode = document.createTextNode(`${answer}   -   0pt`);
            node.addEventListener("click", function () {
                this.parentNode.removeChild(this);
                var liChild = document.getElementById("answerList").children
                var newArray = []
                for (var i = 0; i < liChild.length; i++) {
                    const newAnswer = {
                        text: liChild[i].text,
                        score: liChild[i].score,
                    }
                    newArray.push(newAnswer)
                }
                setArrayOfAnswer({
                    number: newArray.length,
                    array: newArray
                })
            });
            node.appendChild(textnode);
            document.getElementById("answerList").appendChild(node);
        }
    }

    function deleteAllAnswer(){
        setArrayOfAnswer({
            number: 0,
            array: []
        })
        var ul = document.getElementById("answerList");
        if (ul) {
          while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
          }
        }
    }

    function updateField(e){
        setActivity({
            ...activity,
            [e.target.name]: e.target.value
        });
    };

    function updateScore(){
        var tmp = document.getElementById(answerSelect)
        tmp.style.color = "green"
    }

    return(
        e("form", {id: props.id, className: props.className}, [
            e("p", null, "TTITOLO ATTIVITA'"),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "title", className: classes.input, value: activity.title, name: "title", label: "Titolo", inputProps: {maxLength: 20}, variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("hr", null),

            e("p", null, "DOMANDA"),
            e("div", {className: "sx_realize_option_description"}, [
                e(TextField, {id: "activityText", className: classes.input2, multiline: true, rows: 2, helperText: props.text, value: activity.text, name: "text", label: "Testo prima storia", type:"search", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("hr", null),

            e("p", null, "CORNICE TESTO"),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "heightFrame", className: classes.input, value: activity.heightFrame, name: "heightFrame", label: "Altezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
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
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "topImage", disabled: immageUpload, className: classes.input, value: activity.topImage, name: "topImage", label: "Distanza dal lato in alto", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "leftImage", disabled: immageUpload, className: classes.input, value: activity.leftImage, name: "leftImage", label: "Distanza dal lato sinistro", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "heighImage", disabled: immageUpload, className: classes.input, value: activity.heighImage, name: "heighImage", label: "Altezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "widthImage", disabled: immageUpload, className: classes.input, value: activity.widthImage, name: "widthImage", label: "Larghezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("hr", null),

            e("p", null, "RISPOSTA"),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "score", className: classes.input, value: activity.score, name: "score", label: "Punteggio", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(FormControl, {variant: "outlined", className: classes.input}, [
                    e(InputLabel, {htmlFor: "widgetType"}, "Tipo di widget"),
                    e(Select, {id: "widgetType", label: "Tipo di widget", value: activity.widgetType, name:"widgetType", onChange:  (e) => {updateField(e), deleteAllAnswer()}}, [
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


            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "answer", className: classes.input, value: answer, name: "answer", label: "Risposta", variant:"outlined", onChange:  (e) => setAnswer(e.target.value)}),
                e(IconButton, {id: "leggend", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: addAnswer}, 
                    e(Icon, {children: "add"}),  
                ),
            ]),
            e("div", null, [
                e("p", {id: "p_answerList"}, "Qui sotto le risposte inserite (cliccaci sopra per eliminarle)"),
                e("ul", {id: "answerList"})
            ]),
            
            e("div", {className: "sx_realize_option"}, [
                e(FormControl, {variant: "outlined", className: classes.input}, [
                    e(InputLabel, {htmlFor: "correctAnswer"}, "Risposta esatta"),
                    e(Select, {id: "correctAnswer", label: "Risposta esatta", name:"correctAnswer", onChange: (e) => setAnswerSelect(e.target.value)}, arrayOfMenuItem)
                ]),
                e(TextField, {id: "score", className: [classes.input, classes.score], value: score, name: "score", label: "Punteggio", type:"number", variant:"outlined", onChange:  (e) => setScore(e.target.value)}),
                e(IconButton, {id: "changeScore", className: [classes.buttonStandard, classes.buttonImage, classes.leggendButton], component: "span", onClick: updateScore}, 
                    e(Icon, {children: "update"}),  
                ),
            ]),

            e(DialogComponent, {fun: setOpenErrorDialog, open: openErrorDialog, textError: "Raggiunto limite risposte per questo tipo di widget"} ),
            e(Button, {id: "sumbit_formInfo", variant: "contained", size: "large", endIcon: e(Icon, {children: "save"}), className: classes.saveButton, onClick: () => console.log(answerSelect)}, "SALVA"),
            e(Button, {id: "sumbit_formInfo", variant: "contained", size: "large", endIcon: e(Icon, {children: "save"}), className: classes.saveButton, onClick: createActivity}, "SALVA"),
        ])    
    )


}

export default Realize_activity;