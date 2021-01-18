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


function Realize_FL_Activity(props){

    const classes = useStyles();
    const [immageUpload, set_immageUpload] = React.useState(true)
    const [activity, setActivity] = React.useState({
        heightFrame     : props.activity.heightFrame,
        text            : props.activity.text,
        image           : props.activity.image,
    })

    React.useEffect(() => {
        document.getElementById("phoneText").style.height   = `${activity.heightFrame}px`;
        document.getElementById("textDiv").innerHTML      =    activity.text;
        document.getElementById("mediaDiv").innerHTML      =    activity.text;
    }, [activity])

    React.useEffect(() => {
        document.getElementById("inputDiv").classList.add("hiddenClass")
    })

    React.useEffect(() => {
        document.getElementById("containerHome_userSelected_realize_info").innerHTML = props.title;
        setActivity({
            heightFrame     : props.activity.heightFrame,
            text            : props.activity.text,
        })
    }, [props.title])

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
    
    function createActivity(){
        var oldStory = props.story;
        var tmp = {
            heightFrame :    parseInt(activity.heightFrame),
            text        :             activity.text,
            topImage    :    parseInt(activity.topImage),
            leftImage   :    parseInt(activity.leftImage),
            heightImage :    parseInt(activity.heightImage),
            widthImage  :    parseInt(activity.widthImage),
        };
        if (props.indexActivity == "firstActivity") oldStory.firstActivity = tmp
        else {
            oldStory.lastActivity = tmp
            props.setStep([true, true, true, false])
        }
        props.setStory(oldStory);
    }

    function updateField(e){
        setActivity({
            ...activity,
            [e.target.name]: e.target.value
        });
    };
        

    return(
        e("form", {id: props.id, className: props.className}, [
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
            e("hr", null),

            e("p", null, "TESTO"),
            e("div", {className: "sx_realize_option_description"}, [
                e(TextField, {id: "activityText", className: classes.input2, multiline: true, rows: 2, helperText: props.text, value: activity.text, name: "text", label: "Testo", type:"search", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e(Button, {id: "sumbit_formInfo", variant: "contained", size: "large", endIcon: e(Icon, {children: "save"}), className: classes.saveButton, onClick: createActivity}, "SALVA"),
        ])    
    )


}

export default Realize_FL_Activity;