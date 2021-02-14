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
    const [activity, setActivity] = React.useState({
        heightFrame     : props.activity.heightFrame,
        activityText    : props.activity.activityText,
        backgroundImage : props.activity.backgroundImage,
        activityImage   : props.activity.activityImage,
        altActivityImage: props.activity.altActivityImage,
        streamVideo     : props.activity.streamVideo,
        widgetType      : "Nessuno",
        correctAnswerGo : props.activity.correctAnswerGo,
    })
    const [imageBackground, setImageBackground] = React.useState(null)
    const [imageActivity, setImageActivity] = React.useState(null)
    const [isDeleteBackgroundImage, setIsDeleteBackgroundImage] = React.useState(false)
    const [isDeleteActivityImage, setIsDeleteActivityImage] = React.useState(false)

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

    function updateBackgroundImage(){
        if (props.story.player.backgroundImage == ""){
            document.getElementById("phoneImage").classList.add("hiddenClass")
            document.getElementById("phoneImage").setAttribute("src", ``)        }
        else {
            document.getElementById("phoneImage").classList.remove("hiddenClass")
            document.getElementById("phoneImage").setAttribute("src", `../../server/upload/${props.story.player.backgroundImage}`)
        }
    }

    function addBackgroundImage(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", e.target.files[0])
        setImageBackground(formData)
        setIsDeleteBackgroundImage(false)
        var reader = new FileReader();
        reader.onload = function(){
            document.getElementById("phoneImage").setAttribute("src", reader.result)
            document.getElementById("phoneImage").classList.remove("hiddenClass")
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    function addActivityImage(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", e.target.files[0])
        setImageActivity(formData)
        setIsDeleteActivityImage(false)
        var reader = new FileReader();
        reader.onload = function(){
            document.getElementById("mediaDiv").classList.remove("hiddenClass")
            document.getElementById("mediaDiv").style.borderRadius =  `${props.story.player.borderRadiusFrame}px` 
            document.getElementById("mediaDiv").setAttribute("src",  reader.result)
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    function deleteBackgroundImage(){
        setIsDeleteBackgroundImage(true)
        setImageBackground(null)
        updateBackgroundImage()
    }

    function deleteActivityImage(){
        setIsDeleteActivityImage(true)
        setImageActivity(null)
        document.getElementById("mediaDiv").classList.add("hiddenClass")
        document.getElementById("mediaDiv").setAttribute("src", ``)  
    }

    function updateField(e){
        setActivity({...activity, [e.target.name]: changeLetter(e.target.value)});
    };


    React.useEffect(() => {
        document.getElementById("inputDiv").classList.add("hiddenClass")
    }, [])
    
    React.useEffect(() => {
        document.getElementById("phoneText").style.height             = `${activity.heightFrame}px`;
        document.getElementById("textDiv").innerHTML                  =    activity.activityText;
    }, [activity])

    React.useEffect(() => {
        document.getElementById("containerHome_userSelected_realize_info").innerHTML = props.title
        setActivity(props.activity)
        setImageBackground(null)
        setImageActivity(null)
        setIsDeleteBackgroundImage(false)
        setIsDeleteActivityImage(false)
        if (props.activity.backgroundImage != ""){
            document.getElementById("phoneImage").setAttribute("src", `../../server/upload/${props.activity.backgroundImage}`)
            document.getElementById("phoneImage").classList.remove("hiddenClass")
        } else {
            updateBackgroundImage()
        }
        if (props.activity.activityImage != ""){
            document.getElementById("mediaDiv").setAttribute("src", `../../server/upload/${props.activity.activityImage}`)
            document.getElementById("mediaDiv").classList.remove("hiddenClass")
        } else{
            document.getElementById("mediaDiv").classList.add("hiddenClass")
            document.getElementById("mediaDiv").setAttribute("src", ``)  
        }
    }, [props.indexActivity])


    async function createActivity(){
        var backgroundImageTmp = activity.backgroundImage
        var activityImageTmp = activity.activityImage
        if (imageBackground != null){
            await axios.post(`http://localhost:8000/addImage/${props.story.id}/${props.indexActivity}_background`, imageBackground, {
                headers:{ "Content-Type": "multipart/form-data" }
            })
            .then((response) => {
                backgroundImageTmp = response.data
                setActivity({...activity, ["backgroundImage"]: response.data});
            })
            .catch(error => {
                if (error.response.status === 500) console.log("Errore con il server")
                else console.log(error)
            })
        }
        if (imageActivity != null){
            await axios.post(`http://localhost:8000/addImage/${props.story.id}/${props.indexActivity}_activity`, imageActivity, {
                headers:{ "Content-Type": "multipart/form-data" }
            })
            .then((response) => {
                activityImageTmp = response.data
                setActivity({...activity, ["activityImage"]: response.data});
            })
            .catch(error => {
                if (error.response.status === 500) console.log("Errore con il server")
                else console.log(error)
            })
        }
        if (isDeleteBackgroundImage){
            await axios.delete(`http://localhost:8000/deleteImage/${activity.backgroundImage}`)
            .then(() => {
                setIsDeleteBackgroundImage(false)
                backgroundImageTmp = ""
                setActivity({...activity, ["backgroundImage"]: ``});
            })
            .catch(error => console.log(error))
        }
        if (isDeleteActivityImage){
            await axios.delete(`http://localhost:8000/deleteImage/${activity.activityImage}`)
            .then(() => {
                setIsDeleteActivityImage(false)
                activityImageTmp = ""
                setActivity({...activity, ["activityImage"]: ``});
            })
            .catch(error => console.log(error))
        }
        var tmp = {
            heightFrame     : parseInt(activity.heightFrame),
            activityText    : changeLetter(activity.activityText),
            backgroundImage : backgroundImageTmp,
            activityImage   : activityImageTmp,
            altActivityImage: changeLetter(activity.altActivityImage),
            streamVideo     : activity.streamVideo,
            widgetType      : "Nessuno",
            correctAnswerGo : activity.correctAnswerGo,
        };
        props.setStory({...props.story, [props.indexActivity]: tmp} )
    }
        

    return(
        e("form", {id: props.id, className: props.className}, [
            e("div", {className: "playerDivStyle"}, [
                e("p", null, "CORNICE TESTO"),
                e("div", {className: "playerDivStyleElement"}, [
                    e(TextField, {inputProps: {min: 5}, id: "heightFrame", className: classes.input, value: activity.heightFrame, name: "heightFrame", label: "Altezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
                ])
            ]),
            e("div", {className: "playerDivStyle"}, [
                e("p", null, "IMMAGINE SFONDO"),
                e("div", {className: "playerDivStyleElement"}, [
                    e("input", {id: "background_image", className: classes.hide, type: "file", accept:".png,.jpeg,.jpg", onChange: addBackgroundImage}),
                    e("label", {htmlFor:"background_image"}, [
                        e(IconButton, {className: [classes.buttonStandard, classes.buttonImage], component: "span"}, 
                            e(Icon, {children: "image"}),  
                        ),
                        " AGGIUNGI IMMAGINE"
                    ]),
                ]),
                e("div", {className: "playerDivStyleElement"}, [
                    e("label", {htmlFor:"delete_background_image"}, [
                        e(IconButton, {id: "delete_background_image", className: [classes.buttonStandard, classes.buttonImage], component: "span", onClick: deleteBackgroundImage}, 
                            e(Icon, {children: "cancel"}),  
                        ),
                        " ELIMINA IMMAGINE"
                    ]),
                ]),
            ]),
            e("div", {className: "playerDivStyle"}, [
                e("p", null, "IMMAGINE ATTIVIT\xc0"),
                e("div", {className: "playerDivStyleElement"}, [
                    e("input", {id: "activity_image", className: classes.hide, type: "file", accept:".png,.jpeg,.jpg", onChange: addActivityImage}),
                    e("label", {htmlFor:"activity_image"}, [
                        e(IconButton, {className: [classes.buttonStandard, classes.buttonImage], component: "span"}, 
                            e(Icon, {children: "image"}),  
                        ),
                        " AGGIUNGI IMMAGINE"
                    ]), 
                ]),
                e("div", {className: "playerDivStyleElement"}, [
                    e("label", {htmlFor:"delete_activity_image"}, [
                        e(IconButton, {id: "delete_activity_image", className: [classes.buttonStandard, classes.buttonImage], component: "span", onClick: deleteActivityImage}, 
                            e(Icon, {children: "cancel"}),  
                        ),
                        " ELIMINA IMMAGINE"
                    ]),
                ]),
                e("div", {className: "playerDivStyleElement"}, [
                    e(TextField, {id: "altActivityImage", className: classes.input2, helperText: "Inserisci una descrizione in per una migliore accessibilit\xe0", value: activity.altActivityImage, name: "altActivityImage", label: "Descrizione immagine", type:"search", variant:"outlined", onChange:  (e) => updateField(e)}),
                ]),
            ]),
            e("div", {className: "playerDivStyle"}, [
                e("p", null, "VIDEO YOUTUBE"),
                e("div", {className: "playerDivStyleElement"}, [
                    e(TextField, {id: "streamVideo", className: classes.input2, helperText: "Inserisci il link di un video preso da Youtube", value: activity.streamVideo, name: "streamVideo", label: "Link YouTube", type:"search", variant:"outlined", onChange:  (e) => updateField(e)}),
                ]),
            ]),
            e("div", {className: "playerDivStyle"}, [
                e("p", null, "TESTO"),
                e("div", {className: "playerDivStyleElement"}, [
                    e(TextField, {id: "activityText", className: classes.input2, multiline: true, rows: 2, helperText: props.text, value: activity.activityText, name: "activityText", label: "Testo", type:"search", variant:"outlined", onChange:  (e) => updateField(e)}),
                ]),
            ]),
            e(Button, {id: "sumbit_formInfo", variant: "contained", size: "large", endIcon: e(Icon, {children: "save"}), className: classes.saveButton, onClick: createActivity}, "SALVA"),
        ])    
    )


}

export default Realize_FL_Activity;