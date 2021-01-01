const e = React.createElement;
const {Button, Icon, IconButton, Select, MenuItem, Switch, TextField, InputLabel, makeStyles, FormControl, withStyles} = window['MaterialUI']; //to load the component from the library


function Realize_player(props){

    const [backgroundImageCheck, setBackgroundImageCheck] = React.useState(props.story.player.backgroundImageCheck)
    const [backgroundImageUrl, setBackgroundImageUrl] = React.useState(props.story.player.backgroundImageUrl)
    const [textBackgroundColorActived, set_textBackgroundColorActived] = React.useState(false);
    const [font, setFont] = React.useState(props.story.player.fontFamily) 
    const [playerStyle, setPlayerStyle] = React.useState({
        background_color           :   props.story.player.background,
        topImage                   :   props.story.player.image.top,
        leftImage                  :   props.story.player.image.left,
        heighImage                 :   props.story.player.image.height,
        widthImage                 :   props.story.player.image.width,
        textBackgroundColor        :   props.story.player.textBackgroundColor,
        frameColor                 :   props.story.player.frameColor,
        textColor                  :   props.story.player.textColor,
        topFrame                   :   props.story.player.topFrame,
        leftFrame                  :   props.story.player.leftFrame,
        widthFrame                 :   props.story.player.widthFrame,
        weightFrame                :   props.story.player.weightFrame,
        borderRadiusFrame          :   props.story.player.borderRadiusFrame,    
        sizeFont                   :   props.story.player.sizeFont,
        weightFont                 :   props.story.player.weightFont,
        backgroundColorNextButton  :   props.story.player.nextButton.backgroundColor,
        frameColorNextButton       :   props.story.player.nextButton.frameColor,
        textColorNextButton        :   props.story.player.nextButton.textColor,
        topNextButton              :   props.story.player.nextButton.top,
        leftNextButton             :   props.story.player.nextButton.left,
        heightNextButton           :   props.story.player.nextButton.height,
        widthNextButton            :   props.story.player.nextButton.width,
        borderRadiusNextButton     :   props.story.player.nextButton.borderRadius,
        backgroundColorChatButton  :   props.story.player.chatButton.backgroundColor,
        frameColorChatButton       :   props.story.player.chatButton.frameColor,
        textColorChatButton        :   props.story.player.chatButton.textColor,
        topChatButton              :   props.story.player.chatButton.top,
        leftChatButton             :   props.story.player.chatButton.left,
        heightChatButton           :   props.story.player.chatButton.height,
        widthChatButton            :   props.story.player.chatButton.width,
        borderRadiusChatButton     :   props.story.player.chatButton.borderRadius,
        backgroundColorHelpButton  :   props.story.player.helpButton.backgroundColor,
        frameColorHelpButton       :   props.story.player.helpButton.frameColor,
        textColorHelpButton        :   props.story.player.helpButton.textColor,
        topHelpButton              :   props.story.player.helpButton.top,
        leftHelpButton             :   props.story.player.helpButton.left,
        heightHelpButton           :   props.story.player.helpButton.height,
        widthHelpButton            :   props.story.player.helpButton.width,
        borderRadiusHelpButton     :   props.story.player.helpButton.borderRadius,
    })

    const useStyles = makeStyles((theme) => ({
        saveButton: {
            backgroundColor: "grey",
            color: "white",
            borderRadius: 10,
            minWidth: 110,
            fontSize: 15,
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
            marginTop: 50,
        },
        formControl: {
            margin: theme.spacing(1),
            width: 233,
            margin: 0,
            [`& fieldset`]: {
                borderRadius: 15,
            }
        },
        hide: {
            display: "none",
        },
        input: {
            width: 233,
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
        },
        buttonImage: { background: "grey"},
        buttonStandard: {
            color: "white",
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        },
        buttonBackground                :   { backgroundColor: playerStyle.background_color },
        buttonFrameColor                :   { backgroundColor: playerStyle.frameColor },
        buttonTextColor                 :   { backgroundColor: playerStyle.textColor },
        buttonTextBackgroundColor       :   { backgroundColor: playerStyle.textBackgroundColor },
        buttonBackgroundColorNextButton :   { backgroundColor: playerStyle.backgroundColorNextButton },
        buttonFrameColorNextButton      :   { backgroundColor: playerStyle.frameColorNextButton },
        buttonTextColorNextButton       :   { backgroundColor: playerStyle.textColorNextButton },
        buttonBackgroundColorChatButton :   { backgroundColor: playerStyle.backgroundColorChatButton },
        buttonFrameColorChatButton      :   { backgroundColor: playerStyle.frameColorChatButton },
        buttonTextColorChatButton       :   { backgroundColor: playerStyle.textColorChatButton },
        buttonBackgroundColorHelpButton :   { backgroundColor: playerStyle.backgroundColorHelpButton },
        buttonFrameColorHelpButton      :   { backgroundColor: playerStyle.frameColorHelpButton },
        buttonTextColorHelpButton       :   { backgroundColor: playerStyle.textColorHelpButton },
    }));

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
          },
        },
        checked: {},
        track: {},
    })(Switch);
    
    const classes = useStyles();
    
    React.useEffect(async () => {
        var tmp = ""
        var path = props.story.id.split(".")[0]
        await axios.post(`http://localhost:8000/check`, {
            id: `${path}_background`
        })
        .then((response) => {
            set_immageUpload(`../../server/upload/${response.data}`)
        })
        .catch(error => {console.log(error)})

        setBackgroundImageUrl("../../server/upload/Matteo_1_background.png")
        console.log(immageUpload.backgroundImageCheck)


        document.getElementById("containerHome_userSelected_realize_info").innerHTML = "Crea il layout al player (i valori sono tutti in pixel e la dimensione dello schermo è di 437 x 202, ovvero 6.1\")";
        document.getElementById("phoneImage").setAttribute("src", immageUpload.backgroundImageUrl)

        document.getElementById("phoneInternal").style.background   =      playerStyle.background_color
        document.getElementById("phoneImage").style.top             =   `${playerStyle.topImage}px`
        document.getElementById("phoneImage").style.left            =   `${playerStyle.leftImage}px`
        document.getElementById("phoneImage").style.height          =   `${playerStyle.heighImage}px`
        document.getElementById("phoneImage").style.width           =   `${playerStyle.widthImage}px`
        document.getElementById("phoneText").style.backgroundColor  =      playerStyle.textBackgroundColor
        document.getElementById("phoneText").style.borderColor      =      playerStyle.frameColor
        document.getElementById("phoneText").style.color            =      playerStyle.textColor
        document.getElementById("phoneText").style.top              =   `${playerStyle.topFrame}px`
        document.getElementById("phoneText").style.left             =   `${playerStyle.leftFrame}px`
        document.getElementById("phoneText").style.width            =   `${playerStyle.widthFrame}px`
        document.getElementById("phoneText").style.borderWidth      =   `${playerStyle.weightFrame}px`
        document.getElementById("phoneText").style.borderRadius     =   `${playerStyle.borderRadiusFrame}px`
        document.getElementById("phoneText").style.fontFamily       =      font
        document.getElementById("phoneText").style.fontSize         =   `${playerStyle.sizeFont}px`
        document.getElementById("phoneText").style.fontWeight       =      playerStyle.weightFont
        document.getElementById("nextButton").style.backgroundColor =      playerStyle.backgroundColorNextButton
        document.getElementById("nextButton").style.borderColor     =      playerStyle.frameColorNextButton
        document.getElementById("nextButton").style.color           =      playerStyle.textColorNextButton
        document.getElementById("nextButton").style.top             =   `${playerStyle.topNextButton}px`
        document.getElementById("nextButton").style.left            =   `${playerStyle.leftNextButton}px`
        document.getElementById("nextButton").style.height          =   `${playerStyle.heightNextButton}px`
        document.getElementById("nextButton").style.width           =   `${playerStyle.widthNextButton}px`
        document.getElementById("nextButton").style.borderRadius    =   `${playerStyle.borderRadiusNextButton}px`
        document.getElementById("chatButton").style.backgroundColor =      playerStyle.backgroundColorChatButton
        document.getElementById("chatButton").style.borderColor     =      playerStyle.frameColorChatButton
        document.getElementById("chatButton").style.color           =      playerStyle.textColorChatButton
        document.getElementById("chatButton").style.top             =   `${playerStyle.topChatButton}px`
        document.getElementById("chatButton").style.left            =   `${playerStyle.leftChatButton}px`
        document.getElementById("chatButton").style.height          =   `${playerStyle.heightChatButton}px`
        document.getElementById("chatButton").style.width           =   `${playerStyle.widthChatButton}px`
        document.getElementById("chatButton").style.borderRadius    =   `${playerStyle.borderRadiusChatButton}px`
        document.getElementById("helpButton").style.backgroundColor =      playerStyle.backgroundColorHelpButton
        document.getElementById("helpButton").style.borderColor     =      playerStyle.frameColorHelpButton
        document.getElementById("helpButton").style.color           =      playerStyle.textColorHelpButton
        document.getElementById("helpButton").style.top             =   `${playerStyle.topHelpButton}px`
        document.getElementById("helpButton").style.left            =   `${playerStyle.leftHelpButton}px`
        document.getElementById("helpButton").style.height          =   `${playerStyle.heightHelpButton}px`
        document.getElementById("helpButton").style.width           =   `${playerStyle.widthHelpButton}px`
        document.getElementById("helpButton").style.borderRadius    =   `${playerStyle.borderRadiusHelpButton}px`
    }, [playerStyle, font, backgroundImageCheck, backgroundImageUrl])


    function createNewJsonFile() {
        props.story.player.background                   =   playerStyle.background_color
        props.story.player.backgroundImageCheck         =   backgroundImageCheck,
        props.story.player.backgroundImageUrl           =   backgroundImageUrl,
        props.story.player.image.top                    =   parseInt(playerStyle.topImage)
        props.story.player.image.left                   =   parseInt(playerStyle.leftImage)
        props.story.player.image.height                 =   parseInt(playerStyle.heighImage)
        props.story.player.image.width                  =   parseInt(playerStyle.widthImage)
        props.story.player.textBackgroundColor          =   playerStyle.textBackgroundColor
        props.story.player.frameColor                   =   playerStyle.frameColor
        props.story.player.textColor                    =   playerStyle.textColor
        props.story.player.topFrame                     =   parseInt(playerStyle.topFrame)
        props.story.player.leftFrame                    =   parseInt(playerStyle.leftFrame)
        props.story.player.widthFrame                   =   parseInt(playerStyle.widthFrame)
        props.story.player.weightFrame                  =   parseInt(playerStyle.weightFrame)
        props.story.player.borderRadiusFrame            =   parseInt(playerStyle.borderRadiusFrame)
        props.story.player.fontFamily                   =   font
        props.story.player.sizeFont                     =   parseInt(playerStyle.sizeFont)
        props.story.player.weightFont                   =   parseInt(playerStyle.weightFont)
        props.story.player.nextButton.backgroundColor   =   playerStyle.backgroundColorNextButton
        props.story.player.nextButton.frameColor        =   playerStyle.frameColorNextButton
        props.story.player.nextButton.textColor         =   playerStyle.textColorNextButton
        props.story.player.nextButton.top               =   parseInt(playerStyle.topNextButton)
        props.story.player.nextButton.left              =   parseInt(playerStyle.leftNextButton)
        props.story.player.nextButton.height            =   parseInt(playerStyle.heightNextButton)
        props.story.player.nextButton.width             =   parseInt(playerStyle.widthNextButton)
        props.story.player.nextButton.borderRadius      =   parseInt(playerStyle.borderRadiusNextButton)
        props.story.player.chatButton.backgroundColor   =   playerStyle.backgroundColorChatButton
        props.story.player.chatButton.frameColor        =   playerStyle.frameColorChatButton
        props.story.player.chatButton.textColor         =   playerStyle.textColorChatButton
        props.story.player.chatButton.top               =   parseInt(playerStyle.topChatButton)
        props.story.player.chatButton.left              =   parseInt(playerStyle.leftChatButton)
        props.story.player.chatButton.height            =   parseInt(playerStyle.heightChatButton)
        props.story.player.chatButton.width             =   parseInt(playerStyle.widthChatButton)
        props.story.player.chatButton.borderRadius      =   parseInt(playerStyle.borderRadiusChatButton)
        props.story.player.helpButton.backgroundColor   =   playerStyle.backgroundColorHelpButton
        props.story.player.helpButton.frameColor        =   playerStyle.frameColorHelpButton
        props.story.player.helpButton.textColor         =   playerStyle.textColorHelpButton
        props.story.player.helpButton.top               =   parseInt(playerStyle.topHelpButton)
        props.story.player.helpButton.left              =   parseInt(playerStyle.leftHelpButton)
        props.story.player.helpButton.height            =   parseInt(playerStyle.heightHelpButton)
        props.story.player.helpButton.width             =   parseInt(playerStyle.widthHelpButton)
        props.story.player.helpButton.borderRadius      =   parseInt(playerStyle.borderRadiusHelpButton)

        props.setStep([true, true, false, false])
    }

    function addImage(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", e.target.files[0])
        axios.post(`http://localhost:8000/addImage/${props.story.id}/bckgrnd`, formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
        .then((response) => {
            setBackgroundImageCheck(false)
            setBackgroundImageUrl(`../../server/upload/${response.data}`)
        })
        .catch(error => {
            if (error.response.status === 500) {
                console.log("Errore con il server")
            } else {
                console.log(error)
            }
        })  
    }

    function deleteImage(){
        axios.delete(`http://localhost:8000/deleteImage/${props.story.id}/bckgrnd`)
        .then((response) => {
            setBackgroundImageCheck(true)
            setBackgroundImageUrl(`../../server/upload/${response.data}`)
        })
        .catch(error => console.log(error))
    }

    function updateField(e){
        setPlayerStyle({
            ...playerStyle,
            [e.target.name]: e.target.value
        });
    };


    return(
        e("div", {id: props.id, className: props.className}, [
            e("p", null, "SFONDO"),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "background_color", className: classes.hide, value: playerStyle.background_color, name:"background_color", type: "color", onChange:  (e) => updateField(e)}),
                e("label", {htmlFor:"background_color"}, [
                    e(IconButton, {className: [classes.buttonBackground, classes.buttonStandard], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "background_image", name: "upload", className: classes.hide, type: "file", accept:"image/x-png,image/gif,image/jpeg", onChange: addImage}),
                e("label", {htmlFor:"background_image"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonImage], component: "span"}, 
                        e(Icon, {children: "image"}),  
                    ),
                    " AGGIUNGI IMMAGINE DELLO SFONDO"
                ])
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor:"delete_background_image"}, [
                    e(IconButton, {id: "delete_background_image", className: [classes.buttonStandard, classes.buttonImage], component: "span", onClick: deleteImage}, 
                        e(Icon, {children: "cancel"}),  
                    ),
                    " ELIMINA IMMAGINE DELLO SFONDO"
                ]),
            ]),
            e("hr", null),
            e("p", null, "IMMAGINE COME SFONDO"),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "topImage", disabled: backgroundImageCheck, className: classes.input, value: playerStyle.topImage, name:"topImage", label: "Distanza dal lato in alto", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "leftImage", disabled: backgroundImageCheck, className: classes.input, value: playerStyle.leftImage, name:"leftImage", label: "Distanza dal lato sinistro", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "heighImage", disabled: backgroundImageCheck, className: classes.input, value: playerStyle.heighImage, name:"heighImage", label: "Altezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "widthImage", disabled: backgroundImageCheck, className: classes.input, value: playerStyle.widthImage, name:"widthImage", label: "Larghezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),

            e("hr", null),
            e("p", null, "CORNICE TESTO"),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "frameColor", className: classes.hide, value: playerStyle.frameColor, name:"frameColor", type: "color", onChange:  (e) => updateField(e)}),
                e("label", {htmlFor:"frameColor"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonTextColor], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "textBackgroundColor", className: classes.hide, value: playerStyle.textBackgroundColor, name:"textBackgroundColor", type: "color", disabled: !textBackgroundColorActived, onChange:  (e) => updateField(e)}),
                e("label", {htmlFor:"textBackgroundColor"}, [
                    e(IconButton, {disabled: !textBackgroundColorActived, className: [classes.buttonStandard, classes.buttonTextColor], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE SFONDO"
                ]),
                e(SwitchButton, {checked: textBackgroundColorActived, onChange: () => {
                    set_textBackgroundColorActived((prev) => !prev)
                    if(textBackgroundColorActived) document.getElementById("phoneText").style.removeProperty("background")
                    else document.getElementById("phoneText").style.setProperty("background", textBackgroundColor)
                }}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, value: 2, id: "topFrame", className: classes.input, value: playerStyle.topFrame, name:"topFrame", label: "Distanza dal lato in alto", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "leftFrame", className: classes.input, value: playerStyle.leftFrame, name:"leftFrame", label: "Distanza dal lato sinistro", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 0, max: 197}, id: "widthFrame", className: classes.input, value: playerStyle.widthFrame, name:"widthFrame", label: "Larghezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 0, max: 8}, id: "weightFrame", className: classes.input, value: playerStyle.weightFrame, name:"weightFrame", label: "Spessore", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 0, max: 25}, id: "borderRadiusFrame", className: classes.input, value: playerStyle.borderRadiusFrame, name:"borderRadiusFrame", label: "Arrotondamento angoli", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),

            e("hr", null),
            e("p", null, "TESTO"),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "textColor", className: classes.hide, value: playerStyle.textColor, name:"textColor", type: "color", onChange:  (e) => updateField(e)}),
                e("label", {htmlFor:"textColor"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonTextColor], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(FormControl, {variant: "outlined", className: classes.formControl}, [
                    e(InputLabel, {htmlFor: "fontFamily"}, "Font"),
                    e(Select, {inputProps: {name: "Font", id: "fontFamily"}, label: "Font", value: font, name:"fontFamily", onChange: (e) => setFont(e.target.value)}, [
                        e(MenuItem, {value: "Arial", selected: true}, "Arial"),
                        e(MenuItem, {value: "Arial Black"}, "Arial Black"),
                        e(MenuItem, {value: "Verdana"}, "Verdana"),
                        e(MenuItem, {value: "Georgia"}, "Georgia"),
                        e(MenuItem, {value: "Comic Sans MS"}, "Comic Sans MS"),
                        e(MenuItem, {value: "Impact"}, "Impact"),
                        e(MenuItem, {value: "Times New Roman"}, "Times New Roman"),
                        e(MenuItem, {value: "Courier"}, "Courier"),
                        e(MenuItem, {value: "Tahoma"}, "Tahoma"),
                    ])
                ])
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 0, max: 20}, id: "sizeFont", className: classes.input, value: playerStyle.sizeFont, name:"sizeFont", label: "Dimensione", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 0, max: 800}, id: "weightFont", className: classes.input, value: playerStyle.weightFont, name:"weightFont", label: "Pesantezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),

            e("hr", null),
            e("p", null, "BOTTONE ATTIVITA' SUCCESSIVA"),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "backgroundColorNextButton", className: classes.hide, value: playerStyle.backgroundColorNextButton, name:"backgroundColorNextButton", type: "color", onChange:  (e) => updateField(e)}),
                e("label", {htmlFor:"backgroundColorNextButton"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonBackgroundColorNextButton], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE DELLO SFONDO"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "frameColorNextButton", className: classes.hide, value: playerStyle.frameColorNextButton, name:"frameColorNextButton", type: "color", onChange:  (e) => updateField(e)}),
                e("label", {htmlFor:"frameColorNextButton"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonFrameColorNextButton], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE DEL BORDO"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "textColorNextButton", className: classes.hide, value: playerStyle.textBackgroundColor, name:"textBackgroundColor", type: "color", onChange:  (e) => updateField(e)}),
                e("label", {htmlFor:"textColorNextButton"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonTextColorNextButton], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE DEL TESTO"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "topNextButton", className: classes.input, value: playerStyle.topNextButton, name:"topNextButton", label: "Distanza dal lato in alto", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "leftNextButton", className: classes.input, value: playerStyle.leftNextButton, name:"leftNextButton", label: "Distanza dal lato sinistro", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "heightNextButton", className: classes.input, value: playerStyle.heightNextButton, name:"heightNextButton", label: "Altezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "widthNextButton", className: classes.input, value: playerStyle.widthNextButton, name:"widthNextButton", label: "Larghezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 0, max: 30}, id: "borderRadiusNextButton", className: classes.input, value: playerStyle.borderRadiusNextButton, name:"borderRadiusNextButton", label: "Arrotondamento angoli", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),

            e("hr", null),
            e("p", null, "BOTTONE PER APRIRE LA CHAT"),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "backgroundColorChatButton", className: classes.hide, value: playerStyle.backgroundColorChatButton, name:"backgroundColorChatButton", type: "color", onChange:  (e) => updateField(e)}),
                e("label", {htmlFor:"backgroundColorChatButton"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonBackgroundColorChatButton], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE DELLO SFONDO"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "frameColorChatButton", className: classes.hide, value: playerStyle.frameColorChatButton, name:"frameColorChatButton", type: "color", onChange:  (e) => updateField(e)}),
                e("label", {htmlFor:"frameColorChatButton"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonFrameColorChatButton], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE DEL BORDO"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "textColorChatButton", className: classes.hide, value: playerStyle.textColorChatButton, name:"textColorChatButton", type: "color", onChange:  (e) => updateField(e)}),
                e("label", {htmlFor:"textColorChatButton"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonTextColorChatButton], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE DEL TESTO"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "topChatButton", className: classes.input, value: playerStyle.topChatButton, name:"topChatButton", label: "Distanza dal lato in alto", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "leftChatButton", className: classes.input, value: playerStyle.leftChatButton, name:"leftChatButton", label: "Distanza dal lato sinistro", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "heightChatButton", className: classes.input, value: playerStyle.heightChatButton, name:"heightChatButton", label: "Altezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "widthChatButton", className: classes.input, value: playerStyle.widthChatButton, name:"widthChatButton", label: "Larghezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 0, max: 30}, id: "borderRadiusChatButton", className: classes.input, value: playerStyle.borderRadiusChatButton, name:"borderRadiusChatButton", label: "Arrotondamento angoli", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),

            e("hr", null),
            e("p", null, "BOTTONE PER CHIEDERE AIUTO"),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "backgroundColorHelpButton", className: classes.hide, value: playerStyle.backgroundColorHelpButton, name:"backgroundColorHelpButton", type: "color", onChange:  (e) => updateField(e)}),
                e("label", {htmlFor:"backgroundColorHelpButton"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonBackgroundColorHelpButton], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE DELLO SFONDO"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "frameColorHelpButton", className: classes.hide, value: playerStyle.frameColorHelpButton, name:"frameColorHelpButton", type: "color", onChange:  (e) => updateField(e)}),
                e("label", {htmlFor:"frameColorHelpButton"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonFrameColorHelpButton], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE DEL BORDO"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "textColorHelpButton", className: classes.hide, value: playerStyle.textColorHelpButton, name:"textColorHelpButton", type: "color", onChange:  (e) => updateField(e)}),
                e("label", {htmlFor:"textColorHelpButton"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonTextColorHelpButton], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE DEL TESTO"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "topHelpButton", className: classes.input, value: playerStyle.topHelpButton, name:"topHelpButton", label: "Distanza dal lato in alto", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "leftHelpButton", className: classes.input, value: playerStyle.leftHelpButton, name:"leftHelpButton", label: "Distanza dal lato sinistro", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "heightHelpButton", className: classes.input, value: playerStyle.heightHelpButton, name:"heightHelpButton", label: "Altezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "widthHelpButton", className: classes.input, value: playerStyle.widthHelpButton, name:"widthHelpButton", label: "Larghezza", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 0, max: 30}, id: "borderRadiusHelpButton", className: classes.input, value: playerStyle.borderRadiusHelpButton, name:"borderRadiusHelpButton", label: "Arrotondamento angoli", type:"number", variant:"outlined", onChange:  (e) => updateField(e)}),
            ]),
            e(Button, {id: "sumbit_formInfo", variant: "contained", size: "large", endIcon: e(Icon, {children: "save"}), className: classes.saveButton, onClick: (e) => createNewJsonFile(e)}, "SALVA"),
        ])
    )
}

export default Realize_player;