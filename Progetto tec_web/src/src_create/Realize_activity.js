const e = React.createElement;
const {TextField, IconButton, makeStyles, Button, Icon} = window['MaterialUI']; //to load the component from the library


const useStyles = makeStyles((theme) => ({
    input: {
        width: 233,
        [`& fieldset`]: {
            borderRadius: 15,
        }
    },
    input2: {
        [`& fieldset`]: {
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
}));

function Realize_activity(props){
    const classes = useStyles();
    const [immageUpload, set_immageUpload] = React.useState(true)
    const [activity, setActivity] = React.useState({
        heightFrame     :   160,
        question        :   "",
        answer          :   [],
        correctAnswers  :   [],
        correctAnswerGo :   0,
        wrongAnswerGo   :   0,
        score           :   0,
        media           :   false,
        type_           :   "",
    })


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
        if (props.activity == true){
            var i = props.firstLast;
            document.getElementById("heightFrame").value    =   props.story.activities[i].heightFrame;
            document.getElementById("activityText").value   =   props.story.activities[i].text;
            document.getElementById("heighImage").value     =   props.story.activities[i].text;
            document.getElementById("widthImage").value     =   props.story.activities[i].text;
            document.getElementById("topImage").value       =   props.story.activities[i].text;
            document.getElementById("leftImage").value      =   props.story.activities[i].text;
        } else {    
            document.getElementById("heightFrame").value    =   160;
            document.getElementById("activityText").value   =   "";
            document.getElementById("heighImage").value     =   50;
            document.getElementById("widthImage").value     =   170;
            document.getElementById("topImage").value       =   250;
            document.getElementById("leftImage").value      =   15;
        }

        const interval = setInterval(() => {
            document.getElementById("phoneText").style.height   = `${document.getElementById("heightFrame").value}px`;
            document.getElementById("phoneText").innerHTML      =    document.getElementById("activityText").value;
            document.getElementById("mediaDiv").style.height    = `${document.getElementById("heighImage").value}px`;
            document.getElementById("mediaDiv").style.width     = `${document.getElementById("widthImage").value}px`;
            document.getElementById("mediaDiv").style.top       = `${document.getElementById("topImage").value}px`;
            document.getElementById("mediaDiv").style.left      = `${document.getElementById("leftImage").value}px`;
        }, 100);
        return () => clearInterval(interval);
    })


    const createActivity = () => {
        var tmp = props.story;
        tmp.activities[props.firstLast] = {
            heightFrame :    document.getElementById("heightFrame").value,
            text        :    document.getElementById("activityText").value,
            heightImage :    document.getElementById("heighImage").value,
            widthImage  :    document.getElementById("widthImage").value,
            topImage    :    document.getElementById("topImage").value,
            leftImage   :    document.getElementById("leftImage").value,
        };
        props.setStory(tmp);
        props.setActivity(true);
    }

    return(
        e("form", {id: props.id, className: props.className}, [
            e("p", null, "CORNICE TESTO"),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "heightFrame", className: classes.input, label: "Altezza", type:"number", variant:"outlined"})
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
                e(TextField, {id: "topImage", disabled: immageUpload, className: classes.input, label: "Distanza dal lato in alto", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "leftImage", disabled: immageUpload, className: classes.input, label: "Distanza dal lato sinistro", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "heighImage", disabled: immageUpload, className: classes.input, label: "Altezza", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "widthImage", disabled: immageUpload, className: classes.input, label: "Larghezza", type:"number", variant:"outlined"})
            ]),
            e("hr", null),

            e("p", null, "TESTO"),
            e("div", {className: "sx_realize_option_description"}, [
                e(TextField, {id: "activityText", className: classes.input2, multiline: true, rows: 2, helperText: props.text, label: "Testo prima storia", type:"search", variant:"outlined"})
            ]),
            e(Button, {id: "sumbit_formInfo", variant: "contained", size: "large", endIcon: e(Icon, {children: "save"}), className: classes.saveButton, onClick: createActivity}, "SALVA"),
        ])    
    )


}

export default Realize_activity;
