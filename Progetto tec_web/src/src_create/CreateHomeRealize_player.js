const e = React.createElement;
const {Button, Icon, IconButton, Select, MenuItem, Switch, TextField, InputLabel, makeStyles, FormControl, FormControlLabel, withStyles} = window['MaterialUI']; //to load the component from the library





function CreateHomeRealize_player(props){

    const [backgroundColor, set_backgroundColor] = React.useState(props.story.player.background);
    const [frameColor, set_frameColor] = React.useState(props.story.player.frameColor);
    const [textColor, set_textColor] = React.useState(props.story.player.textColor);
    const [textBackgroundColor, set_textBackgroundColor] = React.useState(props.story.player.textBackgroundColor);
    const [backgroundColorChatButton, set_backgroundColorChatButton] = React.useState(props.story.player.chatButton.backgroundColor);
    const [frameColorChatButton, set_frameColorChatButton] = React.useState(props.story.player.chatButton.frameColor);
    const [textColorChatButton, set_textColorChatButton] = React.useState(props.story.player.chatButton.textColor); 
    const [backgroundColorHelpButton, set_backgroundColorHelpButton] = React.useState(props.story.player.chatButton.backgroundColor);
    const [frameColorHelpButton, set_frameColorHelpButton] = React.useState(props.story.player.helpButton.textColor);
    const [textColorHelpButton, set_textColorHelpButton] = React.useState(props.story.player.helpButton.textColor);
    //attenzione qui sotto
    const [font, set_font] = React.useState(props.story.player.fontFamily.split(",")[0]);
    //attenzione qui sopra
    const [immageUpload, set_immageUpload] = React.useState(true)
    const [textBackgroundColorActived, set_textBackgroundColorActived] = React.useState(false);

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
        buttonBackground: {
            backgroundColor: backgroundColor,
        },
        buttonFrameColor: {
            backgroundColor: frameColor,
        },
        buttonTextColor: {
            backgroundColor: textColor,
        },
        buttonTextBackgroundColor: {
            backgroundColor: textBackgroundColor,
        },
        buttonBackgroundColorChatButton: {
            backgroundColor: backgroundColorChatButton,
        },
        buttonFrameColorChatButton: {
            backgroundColor: frameColorChatButton,
        },
        buttonTextColorChatButton: {
            backgroundColor: textColorChatButton,
        },
        buttonBackgroundColorHelpButton: {
            backgroundColor: backgroundColorHelpButton,
        },
        buttonFrameColorHelpButton: {
            backgroundColor: frameColorHelpButton,
        },
        buttonTextColorHelpButton: {
            backgroundColor: textColorHelpButton,
        },
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


    function uploadImage(){
        const inpFile = document.getElementById("background_image");
        const imageScreen = document.getElementById("phoneImage")
        inpFile.addEventListener("change", function(){
            const file = this.files[0];
            if (file){
                const reader = new FileReader();
                reader.addEventListener("load", function(){
                    imageScreen.setAttribute("src", this.result)
                });
                reader.readAsDataURL(file);
                set_immageUpload(false)
            }
        })     
    }

    function deleteImage(){
        document.getElementById("phoneImage").setAttribute("src", "../../img/Empty.png")
        set_immageUpload(true)
    }

    const classes = useStyles();


    React.useEffect(() => {

        document.getElementById("containerHome_userSelected_realize_info").innerHTML = "Crea il layout al player (i valori sono tutti in pixel e la dimensione dello schermo è di 437 x 202, ovvero 6.1\")";
        
        document.getElementById("background_color").value = props.story.player.background;
        document.getElementById("heighImage").value = props.story.player.image.height.split("p")[0];
        document.getElementById("widthImage").value = props.story.player.image.width.split("p")[0];
        document.getElementById("topImage").value = props.story.player.image.top.split("p")[0];
        document.getElementById("leftImage").value = props.story.player.image.left.split("p")[0];

        document.getElementById("topFrame").value = props.story.player.topFrame.split("p")[0];
        document.getElementById("leftFrame").value = props.story.player.leftFrame.split("p")[0];
        document.getElementById("widthFrame").value = props.story.player.widthFrame.split("p")[0];
        document.getElementById("frameColor").value = props.story.player.frameColor;
        document.getElementById("weightFrame").value = props.story.player.weightFrame.split("p")[0];
        document.getElementById("borderRadiusFrame").value = props.story.player.borderRadiusFrame.split("p")[0];

        document.getElementById("textColor").value = props.story.player.textColor;
        document.getElementById("textBackgroundColor").value = props.story.player.textBackgroundColor;
        document.getElementById("fontFamily").value = props.story.player.fontFamily.split(",")[0];
        document.getElementById("sizeFont").value = props.story.player.sizeFont.split("p")[0];
        document.getElementById("weightFont").value = props.story.player.weightFont;

        document.getElementById("backgroundColorChatButton").value = props.story.player.chatButton.backgroundColor;
        document.getElementById("frameColorChatButton").value = props.story.player.chatButton.frameColor;
        document.getElementById("textColorChatButton").value = props.story.player.chatButton.textColor;
        document.getElementById("topChatButton").value = props.story.player.chatButton.top.split("p")[0];
        document.getElementById("leftChatButton").value = props.story.player.chatButton.left.split("p")[0];
        document.getElementById("heightChatButton").value = props.story.player.chatButton.height.split("p")[0];
        document.getElementById("widthChatButton").value = props.story.player.chatButton.width.split("p")[0];
        document.getElementById("borderRadiusChatButton").value = props.story.player.chatButton.borderRadius.split("p")[0];

        document.getElementById("backgroundColorHelpButton").value = props.story.player.helpButton.backgroundColor;
        document.getElementById("frameColorHelpButton").value = props.story.player.helpButton.frameColor
        document.getElementById("textColorHelpButton").value = props.story.player.helpButton.textColor
        document.getElementById("topHelpButton").value = props.story.player.helpButton.top.split("p")[0];
        document.getElementById("leftHelpButton").value = props.story.player.helpButton.left.split("p")[0];
        document.getElementById("heightHelpButton").value = props.story.player.helpButton.height.split("p")[0];
        document.getElementById("widthHelpButton").value = props.story.player.helpButton.width.split("p")[0];
        document.getElementById("borderRadiusHelpButton").value = props.story.player.helpButton.borderRadius.split("p")[0];

        const interval = setInterval(() => {
            document.getElementById("phoneInternal").style.background = document.getElementById("background_color").value;

            document.getElementById("phoneImage").style.height = `${document.getElementById("heighImage").value}px`;
            document.getElementById("phoneImage").style.width = `${document.getElementById("widthImage").value}px`;
            document.getElementById("phoneImage").style.top = `${document.getElementById("topImage").value}px`;
            document.getElementById("phoneImage").style.left = `${document.getElementById("leftImage").value}px`;

            document.getElementById("phoneText").style.borderColor = document.getElementById("frameColor").value;
            document.getElementById("phoneText").style.top = `${document.getElementById("topFrame").value}px`;
            document.getElementById("phoneText").style.left = `${document.getElementById("leftFrame").value}px`;
            document.getElementById("phoneText").style.width = `${document.getElementById("widthFrame").value}px`;
            document.getElementById("phoneText").style.borderWidth = `${document.getElementById("weightFrame").value}px`;
            document.getElementById("phoneText").style.borderRadius = `${document.getElementById("borderRadiusFrame").value}px`;

            document.getElementById("phoneText").style.color = document.getElementById("textColor").value;
            document.getElementById("phoneText").style.fontFamily = `${document.getElementById("fontFamily").value}, sans-serif`;
            document.getElementById("phoneText").style.fontSize = `${document.getElementById("sizeFont").value}px`;
            document.getElementById("phoneText").style.fontWeight = document.getElementById("weightFont").value;

            document.getElementById("chatButton").style.backgroundColor = document.getElementById("backgroundColorChatButton").value;
            document.getElementById("chatButton").style.borderColor = document.getElementById("frameColorChatButton").value;
            document.getElementById("chatButton").style.color = document.getElementById("textColorChatButton").value;
            document.getElementById("chatButton").style.top = `${document.getElementById("topChatButton").value}px`;
            document.getElementById("chatButton").style.left = `${document.getElementById("leftChatButton").value}px`;
            document.getElementById("chatButton").style.height = `${document.getElementById("heightChatButton").value}px`;
            document.getElementById("chatButton").style.width = `${document.getElementById("widthChatButton").value}px`;
            document.getElementById("chatButton").style.borderRadius = `${document.getElementById("borderRadiusChatButton").value}px`;

            document.getElementById("helpButton").style.backgroundColor = document.getElementById("backgroundColorHelpButton").value;
            document.getElementById("helpButton").style.borderColor = document.getElementById("frameColorHelpButton").value;
            document.getElementById("helpButton").style.color = document.getElementById("textColorHelpButton").value;
            document.getElementById("helpButton").style.top = `${document.getElementById("topHelpButton").value}px`;
            document.getElementById("helpButton").style.left = `${document.getElementById("leftHelpButton").value}px`;
            document.getElementById("helpButton").style.height = `${document.getElementById("heightHelpButton").value}px`;
            document.getElementById("helpButton").style.width = `${document.getElementById("widthHelpButton").value}px`;
            document.getElementById("helpButton").style.borderRadius = `${document.getElementById("borderRadiusHelpButton").value}px`;
        }, 300);
        return () => clearInterval(interval);
    }, [])

    function createNewJsonFile() {
        props.story.player.background = document.getElementById("background_color").value;

        props.story.player.image.height = `${document.getElementById("heighImage").value}px`;
        props.story.player.image.width = `${document.getElementById("widthImage").value}px`;
        props.story.player.image.top = `${document.getElementById("topImage").value}px`;
        props.story.player.image.left =`${ document.getElementById("leftImage").value}px`;

        props.story.player.topFrame = `${ document.getElementById("topFrame").value}px`;
        props.story.player.leftFrame =`${ document.getElementById("leftFrame").value}px`;
        props.story.player.widthFrame =`${ document.getElementById("widthFrame").value}px`;
        props.story.player.frameColor = document.getElementById("frameColor").value;
        props.story.player.weightFrame = `${document.getElementById("weightFrame").value}px`;
        props.story.player.borderRadiusFrame = `${document.getElementById("borderRadiusFrame").value}px`

        props.story.player.textColor = document.getElementById("textColor").value;
        props.story.player.textBackgroundColor = document.getElementById("textBackgroundColor").value;
        props.story.player.fontFamily = `${document.getElementById("fontFamily").value}, sans-serif`;
        props.story.player.sizeFont = `${document.getElementById("sizeFont").value}px`;
        props.story.player.weightFont = document.getElementById("weightFont").value;

        props.story.player.chatButton.backgroundColor = document.getElementById("backgroundColorChatButton").value;
        props.story.player.chatButton.frameColor = document.getElementById("frameColorChatButton").value;
        props.story.player.chatButton.textColor = document.getElementById("textColorChatButton").value;
        props.story.player.chatButton.top = `${document.getElementById("topChatButton").value}px`;
        props.story.player.chatButton.left =`${ document.getElementById("leftChatButton").value}px`;
        props.story.player.chatButton.height = `${document.getElementById("heightChatButton").value}px`;
        props.story.player.chatButton.width = `${document.getElementById("widthChatButton").value}px`;
        props.story.player.chatButton.borderRadius = `${document.getElementById("borderRadiusChatButton").value}px`;
        
        props.story.player.helpButton.backgroundColor = document.getElementById("backgroundColorHelpButton").value;
        props.story.player.helpButton.frameColor = document.getElementById("frameColorHelpButton").value;
        props.story.player.helpButton.textColor = document.getElementById("textColorHelpButton").value;
        props.story.player.helpButton.top = `${document.getElementById("topHelpButton").value}px`
        props.story.player.helpButton.left =`${ document.getElementById("leftHelpButton").value}px`
        props.story.player.helpButton.height = `${document.getElementById("heightHelpButton").value}px`
        props.story.player.helpButton.width = `${document.getElementById("widthHelpButton").value}px`
        props.story.player.helpButton.borderRadius = `${document.getElementById("borderRadiusHelpButton").value}px`

        props.setStep([true, true, false])
    }


    return(
        e("form", {id: props.id, className: props.className, onSubmit: createNewJsonFile}, [
            e("p", null, "SFONDO"),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "background_color", className: classes.hide, type: "color", onChange: (e) => set_backgroundColor(e.target.value)}),
                e("label", {htmlFor:"background_color"}, [
                    e(IconButton, {className: [classes.buttonBackground, classes.buttonStandard], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "background_image", className: classes.hide, type: "file", accept:"image/x-png,image/gif,image/jpeg"}),
                e("label", {htmlFor:"background_image"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonImage], component: "span", onClick: uploadImage}, 
                        e(Icon, {children: "image"}),  
                    ),
                    " AGGIUNGI IMMAGINE DELLO SFONDO"
                ]),
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
            e("p", null, "CORNICE TESTO"),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "frameColor", className: classes.hide, type: "color", onChange: (e) => set_frameColor(e.target.value)}),
                e("label", {htmlFor:"frameColor"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonFrameColor], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "topFrame", className: classes.input, label: "Distanza dal lato in alto", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "leftFrame", className: classes.input, label: "Distanza dal lato sinistro", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 0, max: 197}, id: "widthFrame", className: classes.input, label: "Larghezza", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 0, max: 8}, id: "weightFrame", className: classes.input, label: "Spessore", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 0, max: 25}, id: "borderRadiusFrame", className: classes.input, label: "Arrotondamento angoli", type:"number", variant:"outlined"})
            ]),

            e("hr", null),
            e("p", null, "TESTO"),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "textColor", className: classes.hide, type: "color", onChange: (e) => set_textColor(e.target.value)}),
                e("label", {htmlFor:"textColor"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonTextColor], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "textBackgroundColor", className: classes.hide, type: "color", disabled: !textBackgroundColorActived, onChange: (e) => {
                    set_textBackgroundColor(e.target.value)
                    document.getElementById("phoneText").style.background = document.getElementById("textBackgroundColor").value;
                }}),
                e("label", {htmlFor:"textBackgroundColor"}, [
                    e(IconButton, {disabled: !textBackgroundColorActived, className: [classes.buttonStandard, classes.buttonTextBackgroundColor], component: "span"}, 
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
                e(FormControl, {variant: "outlined", className: classes.formControl}, [
                    e(InputLabel, {htmlFor: "fontFamily"}, "Font"),
                    e(Select, {inputProps: {name: "Font", id: "fontFamily"}, label: "Font", value: font, onChange: (e) => set_font(e.target.value)}, [
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
            /*e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "fontFamily"}, "Stile (font): "),
                e("select", {id: "fontFamily"}, [
                    e("option", {value: "Arial", selected: true}, "Arial"),
                    e("option", {value: "Arial Black"}, "Arial Black"),
                    e("option", {value: "Verdana"}, "Verdana"),
                    e("option", {value: "Georgia"}, "Georgia"),
                    e("option", {value: "Comic Sans MS"}, "Comic Sans MS"),
                    e("option", {value: "Trebuchet MS"}, "Trebuchet MS"),
                    e("option", {value: "Impact"}, "Impact"),
                    e("option", {value: "Times New Roman"}, "Times New Roman"),
                    e("option", {value: "Courier"}, "Courier"),
                    e("option", {value: "Tahoma"}, "Tahoma"),
                ])
            ]),*/
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 0, max: 20}, id: "sizeFont", className: classes.input, label: "Dimensione", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 0, max: 800}, id: "weightFont", className: classes.input, label: "Pesantezza", type:"number", variant:"outlined"})
            ]),


            e("hr", null),
            e("p", null, "BOTTONE PER APRIRE LA CHAT"),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "backgroundColorChatButton", className: classes.hide, type: "color", onChange: (e) => set_backgroundColorChatButton(e.target.value)}),
                e("label", {htmlFor:"backgroundColorChatButton"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonBackgroundColorChatButton], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE DELLO SFONDO"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "frameColorChatButton", className: classes.hide, type: "color", onChange: (e) => set_frameColorChatButton(e.target.value)}),
                e("label", {htmlFor:"frameColorChatButton"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonFrameColorChatButton], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE DEL BORDO"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "textColorChatButton", className: classes.hide, type: "color", onChange: (e) => set_textColorChatButton(e.target.value)}),
                e("label", {htmlFor:"textColorChatButton"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonTextColorChatButton], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE DEL TESTO"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "topChatButton", className: classes.input, label: "Distanza dal lato in alto", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "leftChatButton", className: classes.input, label: "Distanza dal lato sinistro", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "heightChatButton", className: classes.input, label: "Altezza", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "widthChatButton", className: classes.input, label: "Larghezza", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 0, max: 30}, id: "borderRadiusChatButton", className: classes.input, label: "Arrotondamento angoli", type:"number", variant:"outlined"})
            ]),

            e("hr", null),
            e("p", null, "BOTTONE PER CHIEDERE AIUTO"),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "backgroundColorHelpButton", className: classes.hide, type: "color", onChange: (e) => set_backgroundColorHelpButton(e.target.value)}),
                e("label", {htmlFor:"backgroundColorHelpButton"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonBackgroundColorHelpButton], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE DELLO SFONDO"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "frameColorHelpButton", className: classes.hide, type: "color", onChange: (e) => set_frameColorHelpButton(e.target.value)}),
                e("label", {htmlFor:"frameColorHelpButton"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonFrameColorHelpButton], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE DEL BORDO"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("input", {id: "textColorHelpButton", className: classes.hide, type: "color", onChange: (e) => set_textColorHelpButton(e.target.value)}),
                e("label", {htmlFor:"textColorHelpButton"}, [
                    e(IconButton, {className: [classes.buttonStandard, classes.buttonTextColorHelpButton], component: "span"}, 
                        e(Icon, {children: "color_lens"}),  
                    ),
                    " COLORE DEL TESTO"
                ]),
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "topHelpButton", className: classes.input, label: "Distanza dal lato in alto", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 5}, id: "leftHelpButton", className: classes.input, label: "Distanza dal lato sinistro", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "heightHelpButton", className: classes.input, label: "Altezza", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {id: "widthHelpButton", className: classes.input, label: "Larghezza", type:"number", variant:"outlined"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e(TextField, {inputProps: {min: 0, max: 30}, id: "borderRadiusHelpButton", className: classes.input, label: "Arrotondamento angoli", type:"number", variant:"outlined"})
            ]),

            e(Button, {id: "sumbit_formInfo", variant: "contained", size: "large", endIcon: e(Icon, {children: "save"}), className: classes.saveButton, onClick: createNewJsonFile}, "SALVA"),
        ])
    )
}

export default CreateHomeRealize_player;




/*

    const [backgroundColor, set_backgroundColor] = React.useState("black");
    const [heighBackgroundImage, set_heighBackgroundImage] = React.useState("");
    const [widthBackgroundImage, set_widthBackgroundImage] = React.useState("");
    const [topBackgroundImage, set_topBackgroundImage] = React.useState("");
    const [leftBackgroundImage, set_leftBackgroundImage] = React.useState("");

    const [frame, setFrame] = React.useState({
        color: props.story.player.frameColor,
        top: props.story.player.topFrame.split("p")[0],
        left: props.story.player.leftFrame.split("p")[0],
        width: props.story.player.widthFrame.split("p")[0],
        weight: props.story.player.weightFrame.split("p")[0],
        borderRadius: props.story.player.borderRadiusFrame.split("p")[0],
    });
    const [frameColor, set_frameColor] = React.useState("white");


    /*const [topFrame, set_topFrame] = React.useState(props.story.player.topFrame.split("p")[0]);
    const [leftFrame, set_leftFrame] = React.useState("");
    const [widthFrame, set_widthFrame] = React.useState("");
    const [weightFrame, set_weightFrame] = React.useState("");
    const [borderRadiusFrame, set_borderRadiusFrame] = React.useState("");

    const [text, setText] = React.useState({
        color: props.story.player.textColor, 
        fontFamily: props.story.player.fontFamily,
        sizeFont: props.story.player.sizeFont.split("p")[0],
        weightFont: props.story.player.weightFont,
    });
    //const [fontFamilyText, set_fontFamilyText] = React.useState("");
    //const [sizeFontText, set_sizeFontText] = React.useState("");
    //const [weightFontText, set_weightFontText] = React.useState("");
    
    const [backgroundColorChatButton, set_backgroundColorChatButton] = React.useState("white");
    const [frameColorChatButton, set_frameColorChatButton] = React.useState("white");
    const [textColorChatButton, set_textColorChatButton] = React.useState("white");
    const [heightChatButton, set_heightChatButton] = React.useState("");
    const [widthChatButton, set_widthChatButton] = React.useState("");
    const [topChatButton, set_topChatButton] = React.useState("");
    const [leftChatButton, set_leftChatButton] = React.useState("");
    const [borderRadiusChatButton, set_borderRadiusChatButton] = React.useState("");

    const [backgroundColorHelpButton, set_backgroundColorHelpButton] = React.useState("white");
    const [frameColorHelpButton, set_frameColorHelpButton] = React.useState("white");
    const [textColorHelpButton, set_textColorHelpButton] = React.useState("white");
    const [heightHelpButton, set_heightHelpButton] = React.useState("");
    const [widthHelpButton, set_widthHelpButton] = React.useState("");
    const [topHelpButton, set_topHelpButton] = React.useState("");
    const [leftHelpButton, set_leftHelpButton] = React.useState("");
    const [borderRadiusHelpButton, set_borderRadiusHelpButton] = React.useState("");
*/