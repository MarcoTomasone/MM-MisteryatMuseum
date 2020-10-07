const e = React.createElement;

const imageSetup = ["heighImage", "widthImage", "topImage", "leftImage"]
function uploadImage(){
    const inpFile = document.getElementById("background_image");
    const imageScreen = document.getElementById("phoneImage")
    inpFile.addEventListener("click", function(){
        imageScreen.style.display = "block"
    })
    inpFile.addEventListener("change", function(){
        const file = this.files[0];
        if (file){
            const reader = new FileReader();
            reader.addEventListener("load", function(){
                imageScreen.setAttribute("src", this.result)
            });
            reader.readAsDataURL(file);
        }
        imageSetup.forEach((element) => {
            document.getElementById(element).removeAttribute("disabled")
        })
    })
}
const deleteImage = () =>{
    const imageScreen = document.getElementById("phoneImage")
    imageSetup.forEach((element) => {
        document.getElementById(element).setAttribute("disabled", "true")
    })
    imageScreen.style.display =  "none"
}

const showImage = () =>{
    const imageScreen = document.getElementById("phoneImage")
    imageSetup.forEach((element) => {
        document.getElementById(element).removeAttribute("disabled")
    })
    imageScreen.style.display =  "block"
}

function CreateHomeRealize_player(props){
    /*window.addEventListener('beforeunload', function (e) {
        e.preventDefault(); 
        e.returnValue = ''; 
    });*/

    React.useEffect(() => {
        uploadImage();
        document.getElementById("containerHome_userSelected_realize_info").innerHTML = "Crea il layout al player (i valori sono tutti in pixel e la dimensione dello schermo è di 437 x 202, ovvero 6.1\")";
        
        document.getElementById("background_color").value = props.story.player.background;
        document.getElementById("heighImage").value = props.story.player.image.height.split("p")[0];
        document.getElementById("widthImage").value = props.story.player.image.width.split("p")[0];
        document.getElementById("topImage").value = props.story.player.image.top.split("p")[0];
        document.getElementById("leftImage").value = props.story.player.image.left.split("p")[0];
        document.getElementById("topFrame").value = props.story.player.topFrame.split("p")[0];
        document.getElementById("leftFrame").value = props.story.player.leftFrame.split("p")[0];
        document.getElementById("widthFrame").value = props.story.player.widthFrame.split("p")[0];
        document.getElementById("colorFrame").value = props.story.player.colorFrame;
        document.getElementById("thicknessFrame").value = props.story.player.thicknessFrame.split("p")[0];
        document.getElementById("borderRadiusFrame").value = props.story.player.borderRadiusFrame.split("p")[0];
        document.getElementById("textColor").value = props.story.player.textColor;
        document.getElementById("fontFamily").value = props.story.player.fontFamily.split(",")[0];
        document.getElementById("sizeFont").value = props.story.player.sizeFont.split("p")[0];
        document.getElementById("weightFont").value = props.story.player.weightFont;
        document.getElementById("heightChatButton").value = props.story.player.chatButton.height.split("p")[0];
        document.getElementById("widthChatButton").value = props.story.player.chatButton.width.split("p")[0];
        document.getElementById("topChatButton").value = props.story.player.chatButton.top.split("p")[0];
        document.getElementById("leftChatButton").value = props.story.player.chatButton.left.split("p")[0];
        document.getElementById("background_colorChatButton").value = props.story.player.chatButton.backgroundColor
        document.getElementById("frame_colorChatButton").value = props.story.player.chatButton.borderColor
        document.getElementById("text_colorChatButton").value = props.story.player.chatButton.textColor
        document.getElementById("borderRadiusChatButton").value = props.story.player.chatButton.borderRadius.split("p")[0];
        document.getElementById("heightHelpButton").value = props.story.player.helpButton.height.split("p")[0];
        document.getElementById("widthHelpButton").value = props.story.player.helpButton.width.split("p")[0];
        document.getElementById("topHelpButton").value = props.story.player.helpButton.top.split("p")[0];
        document.getElementById("leftHelpButton").value = props.story.player.helpButton.left.split("p")[0];
        document.getElementById("background_colorHelpButton").value = props.story.player.helpButton.backgroundColor
        document.getElementById("frame_colorHelpButton").value = props.story.player.helpButton.borderColor
        document.getElementById("text_colorHelpButton").value = props.story.player.helpButton.textColor
        document.getElementById("borderRadiusHelpButton").value = props.story.player.helpButton.borderRadius.split("p")[0];
 
        const interval = setInterval(() => {
            document.getElementById("phoneInternal").style.background = document.getElementById("background_color").value;

            document.getElementById("phoneImage").style.height = `${document.getElementById("heighImage").value}px`;
            document.getElementById("phoneImage").style.width = `${document.getElementById("widthImage").value}px`;
            document.getElementById("phoneImage").style.top = `${document.getElementById("topImage").value}px`;
            document.getElementById("phoneImage").style.left = `${document.getElementById("leftImage").value}px`;

            document.getElementById("phoneText").style.top = `${document.getElementById("topFrame").value}px`;
            document.getElementById("phoneText").style.left = `${document.getElementById("leftFrame").value}px`;
            document.getElementById("phoneText").style.width = `${document.getElementById("widthFrame").value}px`;
            document.getElementById("phoneText").style.borderColor = document.getElementById("colorFrame").value;
            document.getElementById("phoneText").style.borderWidth = `${document.getElementById("thicknessFrame").value}px`;
            document.getElementById("phoneText").style.borderRadius = `${document.getElementById("borderRadiusFrame").value}px`;

            document.getElementById("phoneText").style.color = document.getElementById("textColor").value;
            document.getElementById("phoneText").style.fontFamily = `${document.getElementById("fontFamily").value}, sans-serif`;
            document.getElementById("phoneText").style.fontSize = `${document.getElementById("sizeFont").value}px`;
            document.getElementById("phoneText").style.fontWeight = document.getElementById("weightFont").value;

            document.getElementById("chatButton").style.height = `${document.getElementById("heightChatButton").value}px`;
            document.getElementById("chatButton").style.width = `${document.getElementById("widthChatButton").value}px`;
            document.getElementById("chatButton").style.top = `${document.getElementById("topChatButton").value}px`;
            document.getElementById("chatButton").style.left = `${document.getElementById("leftChatButton").value}px`;
            document.getElementById("chatButton").style.backgroundColor = document.getElementById("background_colorChatButton").value;
            document.getElementById("chatButton").style.borderColor = document.getElementById("frame_colorChatButton").value;
            document.getElementById("chatButton").style.color = document.getElementById("text_colorChatButton").value;
            document.getElementById("chatButton").style.borderRadius = `${document.getElementById("borderRadiusChatButton").value}px`;

            document.getElementById("helpButton").style.height = `${document.getElementById("heightHelpButton").value}px`;
            document.getElementById("helpButton").style.width = `${document.getElementById("widthHelpButton").value}px`;
            document.getElementById("helpButton").style.top = `${document.getElementById("topHelpButton").value}px`;
            document.getElementById("helpButton").style.left = `${document.getElementById("leftHelpButton").value}px`;
            document.getElementById("helpButton").style.backgroundColor = document.getElementById("background_colorHelpButton").value;
            document.getElementById("helpButton").style.borderColor = document.getElementById("frame_colorHelpButton").value;
            document.getElementById("helpButton").style.color = document.getElementById("text_colorHelpButton").value;
            document.getElementById("helpButton").style.borderRadius = `${document.getElementById("borderRadiusHelpButton").value}px`;
        }, 300);
        return () => clearInterval(interval);
    }, [])

    function createNewJsonFile() {
        /*var c = true;
        var allFields = ["background_color", "topFrame", "leftFrame", "colorFrame", "widthFrame", "borderRadiusFrame", "textColor", "fontFamily", "sizeFont", "weightFont"]
        allFields.forEach((element) => {
            if (document.getElementById(element).value == "") c = false;
        })
        if (!c) {
            alert("Compila prima tutti i campi")  
        } else {
            props.story.player.background = document.getElementById("background_color").value;
            props.story.player.topFrame = `${document.getElementById("topFrame").value}px`
            props.story.player.leftFrame =`${ document.getElementById("leftFrame").value}px`
            props.story.player.colorFrame = document.getElementById("colorFrame").value;
            props.story.player.widthFrame = `${document.getElementById("widthFrame").value}px`
            props.story.player.borderRadiusFrame = `${document.getElementById("borderRadiusFrame").value}px`
            props.story.player.textColor = document.getElementById("textColor").value;
            props.story.player.fontFamily = `${document.getElementById("fontFamily").value}, sans-serif`;
            props.story.player.sizeFont = `${document.getElementById("sizeFont").value}px`
            props.story.player.weightFont = document.getElementById("weightFont").value;
            props.setStep([true, true, false])
        }*/
        props.story.player.background = document.getElementById("background_color").value;

        props.story.player.image.height = `${document.getElementById("heighImage").value}px`;
        props.story.player.image.width = `${document.getElementById("widthImage").value}px`;
        props.story.player.image.top = `${document.getElementById("topImage").value}px`;
        props.story.player.image.left =`${ document.getElementById("leftImage").value}px`;

        props.story.player.topFrame = `${document.getElementById("topFrame").value}px`;
        props.story.player.leftFrame =`${ document.getElementById("leftFrame").value}px`;
        props.story.player.widthFrame =`${ document.getElementById("widthFrame").value}px`;
        props.story.player.colorFrame = document.getElementById("colorFrame").value;
        props.story.player.thicknessFrame = `${document.getElementById("thicknessFrame").value}px`;
        props.story.player.borderRadiusFrame = `${document.getElementById("borderRadiusFrame").value}px`

        props.story.player.textColor = document.getElementById("textColor").value;
        props.story.player.fontFamily = `${document.getElementById("fontFamily").value}, sans-serif`;
        props.story.player.sizeFont = `${document.getElementById("sizeFont").value}px`;
        props.story.player.weightFont = document.getElementById("weightFont").value;

        props.story.player.chatButton.height = `${document.getElementById("heightChatButton").value}px`;
        props.story.player.chatButton.width = `${document.getElementById("widthChatButton").value}px`;
        props.story.player.chatButton.top = `${document.getElementById("topChatButton").value}px`;
        props.story.player.chatButton.left =`${ document.getElementById("leftChatButton").value}px`;
        props.story.player.chatButton.backgroundColor = document.getElementById("background_colorChatButton").value;
        props.story.player.chatButton.borderColor = document.getElementById("frame_colorChatButton").value;
        props.story.player.chatButton.textColor = document.getElementById("text_colorChatButton").value;
        props.story.player.chatButton.borderRadius = `${document.getElementById("borderRadiusChatButton").value}px`;
        
        props.story.player.helpButton.height = `${document.getElementById("heightHelpButton").value}px`
        props.story.player.helpButton.width = `${document.getElementById("widthHelpButton").value}px`
        props.story.player.helpButton.top = `${document.getElementById("topHelpButton").value}px`
        props.story.player.helpButton.left =`${ document.getElementById("leftHelpButton").value}px`
        props.story.player.helpButton.backgroundColor = document.getElementById("background_colorHelpButton").value;
        props.story.player.chatButton.borderColor = document.getElementById("frame_colorHelpButton").value;
        props.story.player.helpButton.textColor = document.getElementById("text_colorHelpButton").value;
        props.story.player.helpButton.borderRadius = `${document.getElementById("borderRadiusHelpButton").value}px`

        props.setStep([true, true, false])
    }

    return(
        e("form", {id: props.id, className: props.className, onSubmit: createNewJsonFile}, [
            e("p", null, "SFONDO"),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "background_color"}, "Colore sfondo:"),
                e("input", {id: "background_color", type: "color"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "background_color"}, "Immagine sfondo:"),
                e("input", {id: "background_image", type: "file"}),
                e("button", {id: "background_image", onClick: showImage}, "INSERISCI IMMAGINE"),
                e("button", {id: "background_image", onClick: deleteImage}, "ELIMINA IMMAGINE")
            ]),
            e("hr", null),
            e("p", null, "IMMAGINE COME SFONDO"),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "heighImage"}, "Altezza:"),
                e("input", {id: "heighImage", type: "number", disabled: true})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "widthImage"}, "Larghezza:"),
                e("input", {id: "widthImage", type: "number", disabled: true})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "topImage"}, "Distanza dal lato in alto:"),
                e("input", {id: "topImage", type: "number", disabled: true})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "leftImage"}, "Distanza dal lato sinistro:"),
                e("input", {id: "leftImage", type: "number", disabled: true})
            ]),
            e("hr", null),
            e("p", null, "CORNICE TESTO"),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "colorFrame"}, "Colore della cornice:"),
                e("input", {id: "colorFrame", type: "color"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "topFrame"}, "Distanza dal lato in alto:"),
                e("input", {id: "topFrame", type: "number"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "leftFrame"}, "Distanza dal lato sinistro:"),
                e("input", {id: "leftFrame", type: "number"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "widthFrame"}, "Larghezza:"),
                e("input", {id: "widthFrame", type: "number"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "thicknessFrame"}, "Spessore:"),
                e("input", {id: "thicknessFrame", type: "number"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "borderRadiusFrame"}, "Arrotondamento angoli:"),
                e("input", {id: "borderRadiusFrame", type: "number"})
            ]),
            e("hr", null),
            e("p", null, "TESTO"),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "textColor"}, "Colore:"),
                e("input", {id: "textColor", type: "color"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "fontFamily"}, "Stile (font): "),
                e("select", {id: "fontFamily"}, [
                    e("option", {value: "Arial", selected: true}, "Arial"),
                    e("option", {value: "Arial Black"}, "Arial Black"),
                    e("option", {value: "Helvetica"}, "Helvetica"),
                    e("option", {value: "Verdana"}, "Verdana"),
                    e("option", {value: "Georgia"}, "Georgia"),
                    e("option", {value: "Comic Sans MS"}, "Comic Sans MS"),
                    e("option", {value: "Trebuchet MS"}, "Trebuchet MS"),
                    e("option", {value: "Impact"}, "Impact"),
                    e("option", {value: "Times New Roman"}, "Times New Roman"),
                    e("option", {value: "Courier"}, "Courier"),
                    e("option", {value: "Tahoma"}, "Tahoma"),
                ])
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "sizeFont"}, "Dimensione:"),
                e("input", {id: "sizeFont", type: "number"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "weightFont"}, "Spessore:"),
                e("input", {id: "weightFont", type: "number"})
            ]),
            e("hr", null),
            e("p", null, "BOTTONE APRIRE LA CHAT"),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "background_colorChatButton"}, "Colore dello sfondo:"),
                e("input", {id: "background_colorChatButton", type: "color"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "frame_colorChatButton"}, "Colore del bordo:"),
                e("input", {id: "frame_colorChatButton", type: "color"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "text_colorChatButton"}, "Colore del testo:"),
                e("input", {id: "text_colorChatButton", type: "color"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "heightChatButton"}, "Altezza:"),
                e("input", {id: "heightChatButton", type: "number"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "widthChatButton"}, "Larghezza:"),
                e("input", {id: "widthChatButton", type: "number"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "topChatButton"}, "Distanza dal lato in alto:"),
                e("input", {id: "topChatButton", type: "number"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "leftChatButton"}, "Distanza dal lato sinistro:"),
                e("input", {id: "leftChatButton", type: "number"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "borderRadiusChatButton"}, "Arrotondamento angoli:"),
                e("input", {id: "borderRadiusChatButton", type: "number"})
            ]),
            e("hr", null),
            e("p", null, "BOTTONE PER CHIEDERE AIUTO"),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "background_colorHelpButton"}, "Colore dello sfondo:"),
                e("input", {id: "background_colorHelpButton", type: "color"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "frame_colorHelpButton"}, "Colore del bordo:"),
                e("input", {id: "frame_colorHelpButton", type: "color"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "text_colorHelpButton"}, "Colore del testo:"),
                e("input", {id: "text_colorHelpButton", type: "color"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "heightHelpButton"}, "Altezza:"),
                e("input", {id: "heightHelpButton", type: "number"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "widthHelpButton"}, "Larghezza:"),
                e("input", {id: "widthHelpButton", type: "number"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "topHelpButton"}, "Distanza dal lato in alto:"),
                e("input", {id: "topHelpButton", type: "number"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "leftHelpButton"}, "Distanza dal lato sinistro:"),
                e("input", {id: "leftHelpButton", type: "number"})
            ]),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "borderRadiusHelpButton"}, "Arrotondamento angoli:"),
                e("input", {id: "borderRadiusHelpButton", type: "number"})
            ]),

            e("input", {id: "sumbit_formPlayer", type: "submit", value: "SALVA"}),
        ])
    )
}

export default CreateHomeRealize_player;
