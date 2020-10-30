const e = React.createElement;
const {TextField, makeStyles, Button, Icon} = window['MaterialUI']; //to load the component from the library


function CreateHomeRealize_firstLastActivity(props){

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
    }));

    const classes = useStyles();


    React.useEffect(() => {
        if (props.activity == true){
            var i = 0;
            if (props.firstLast != 0) i = props.firstLast - 1;
            document.getElementById("heightFrame").value = props.story.activities[i].heightFrame;
            document.getElementById("activityText").value = props.story.activities[i].text
        } else {
            document.getElementById("heightFrame").value = 200
            document.getElementById("activityText").value = "";
        }

        const interval = setInterval(() => {
            document.getElementById("phoneText").style.height = `${document.getElementById("heightFrame").value}px`;
            document.getElementById("phoneText").innerHTML = document.getElementById("activityText").value;
        }, 100);
        return () => clearInterval(interval);
    })


    const createActivity = () => {
        var tmp = props.story;
        tmp.activities[props.firstLast] = {
            heightFrame: document.getElementById("heightFrame").value,
            text: document.getElementById("activityText").value,
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

            e("p", null, "TESTO"),
            e("div", {className: "sx_realize_option_description"}, [
                e(TextField, {id: "activityText", className: classes.input2, multiline: true, rows: 2, helperText: props.text, label: "Testo prima storia", type:"search", variant:"outlined"})
            ]),
            e(Button, {id: "sumbit_formInfo", variant: "contained", size: "large", endIcon: e(Icon, {children: "save"}), className: classes.saveButton, onClick: createActivity}, "SALVA"),
        ])    
    )


}

export default CreateHomeRealize_firstLastActivity;