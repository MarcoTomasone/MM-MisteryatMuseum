const e = React.createElement;
const {Button, makeStyles, Icon, Tooltip} = MaterialUI;
import Card from "./Card.js"
import {DialogComponent} from "./Dialog.js"

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "grey",
        color: "white",
        borderRadius: 10,
        height: "80%",
        width: "100%",
        fontSize: 16,
        lineHeight: 1,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        margin: theme.spacing(1),
        ['@media (max-width:931px)']: { 
            fontSize: 0,
            height: 60,
            width: 60,
            borderRadius: ("50%"),
        }
    },
    icon:{
        ['@media (max-width:931px)']: { 
            height: "100%",
            width: "100%",
            marginLeft: -6,
            marginRight: 6
        }
    }
}));



function Select(props){
    const classes = useStyles();
    const [arrayPrivateStories, setArrayPrivateStories] =  React.useState([]);
    const [storySelected, setStorySelected] =  React.useState("");
    const [updateCard, setUpdateCard] =  React.useState(true);

    

    const toCreate = function(){
        props.setStoryToModify()
        location.href = "./?#/Create/realize"
    }
    
    const toDuply = function(){
        if (storySelected == ""){
            props.setTextErrorDialog("Selezionare prima una storia")
            props.setOpenErrorDialog(true)
        }
        else {
            axios.get(`http://localhost:8000/duplyStory/${storySelected}`)
            .then((response) => {
                alert(`Storia \"${storySelected}\" dupicata correttamente`);
                setUpdateCard(prev => !prev)
            })
            .catch((error) => console.log(error));  
        }
    }
    
    const toModify = function(){
        if (storySelected == ""){
            props.setTextErrorDialog("Selezionare prima una storia")
            props.setOpenErrorDialog(true)
        }
        else {
            axios.get(`http://localhost:8000/modifyStory/${storySelected}`)
            .then((response) => {props.setStoryToModify(response.data)})
            .catch((error) => console.log(error));
            location.href = "./?#/Create/realize"
        }
    }
    
    const toPublish = function(){
        if (storySelected == ""){
            props.setTextErrorDialog("Selezionare prima una storia")
            props.setOpenErrorDialog(true)
        }
        else {
            axios.delete(`http://localhost:8000/publishStory/${storySelected}`)
            .then((response) => {
                alert(`Storia \"${storySelected}\" pubblicata correttamente. Vai nella sezione "SELZIONA" dove troverai il suo qr code`);
                setUpdateCard(prev => !prev)
            })
            .then(() => document.getElementById(storySelected).classList.add("story_published"))
            .catch((error) => console.log(error));  
        }
    }
    
    const toRetire = function(){
        if (storySelected == ""){
            props.setTextErrorDialog("Selezionare prima una storia")
            props.setOpenErrorDialog(true)
        }
        else {
            axios.delete(`http://localhost:8000/retireStory/${storySelected}`)
            .then((response) => {
                alert(`Storia \"${storySelected}\" ritirata correttamente`);
                setUpdateCard(prev => !prev)
            })
            .then(() => document.getElementById(storySelected).classList.remove("story_published"))
            .catch((error) => console.log(error));  
        }
    }
    
    const toDelete = function(){
        if (storySelected == ""){
            props.setTextErrorDialog("Selezionare prima una storia")
            props.setOpenErrorDialog(true)
        }
        else {
            axios.delete(`http://localhost:8000/deleteStory/${storySelected}`)
            .then((response) => {
                alert(`Storia \"${storySelected}\" eliminata correttamente`);
                setUpdateCard(prev => !prev)
            })
            .catch((error) => console.log(error));
        }
    }


    if (props.user == "") props.setUser(localStorage.getItem(`user0`));    
    else {
        localStorage.setItem(`user0`, props.user);
        props.setUser(localStorage.getItem(`user0`));    
    }


    React.useEffect(async () => {
        setArrayPrivateStories([])
        await axios.get(`http://localhost:8000/storiesFolder/${props.user}`)
        .then((response) => {
            response.data.forEach((element) => {
                setArrayPrivateStories(arrayPrivateStories => [...arrayPrivateStories,
                    e(Card, {
                        key: getRandomInt(999999),
                        setStorySelected: setStorySelected,
                        background: element.background,
                        id: element.id,
                        title: element.title, 
                        gender: element.gender,
                        objective: element.objective,
                        participantsType: element.participantsType.url,
                        accessibility: element.accessibility.url,
                        description: element.description,
                        published: element.published,
                        age: element.age,
                        fontFamily: element.fontFamily,
                        other: response.data
                    })
                ])
            })
            return response; 
        }).then((response) => {
            response.data.forEach((element) => {
                if (document.getElementById(element.id) && element.published == true) document.getElementById(element.id).classList.add("story_published");
            })
        })
    }, [updateCard])

    return e("div", {key: getRandomInt(999999), className: "containerHome"}, [
        e("div", {key: getRandomInt(999999), className:"containerHome_userSelected"}, [
            e("p", {key: getRandomInt(999999)}, `UTENTE SELEZIONATO: ${props.user}`),
            e("p", {key: getRandomInt(999999), id: "containerHome_userSelected_explanation"}, `(Qui puoi creare una nuova storia o selezionarne una gia esistente per modificarla / eliminarla / pubblicarla / ritirare)`),
        ]),
        e("div", {key: getRandomInt(999999), className: "containerHome_privateSelect"}, [
            e("div", {key: getRandomInt(999999), id: "cardContainer", className: "sx_privateSelect"}, arrayPrivateStories),
            e("div", {key: getRandomInt(999999), className: "dx_privateSelect"}, [
                e(Tooltip, {key: getRandomInt(999999), title: "CREA STORIA"}, e(Button, {key: "bb0", variant: "contained", className: classes.button, endIcon: e(Icon, {key: getRandomInt(999999), children: "fiber_new", className: classes.icon}), onClick: toCreate},"CREA STORIA")),
                e(Tooltip, {key: getRandomInt(999999), title: "DUPLICA STORIA"}, e(Button, {key: "bb1", variant: "contained", className: classes.button, endIcon: e(Icon, {key: getRandomInt(999999), children: "file_copy", className: classes.icon}), onClick: toDuply},"DUPLICA STORIA")),
                e(Tooltip, {key: getRandomInt(999999), title: "MODIFICA STORIA"}, e(Button, {key: "bb2", variant: "contained", className: classes.button, endIcon: e(Icon, {key: getRandomInt(999999), children: "create", className: classes.icon}), onClick: toModify},"MODIFICA STORIA")),
                e(Tooltip, {key: getRandomInt(999999), title: "PUBBLICA STORIA"}, e(Button, {key: "bb3", variant: "contained", className: classes.button, endIcon: e(Icon, {key: getRandomInt(999999), children: "cloud_upload", className: classes.icon}), onClick: toPublish},"PUBBLICA STORIA")),
                e(Tooltip, {key: getRandomInt(999999), title: "RITIRA STORIA"}, e(Button, {key: "bb4", variant: "contained", className: classes.button, endIcon: e(Icon, {key: getRandomInt(999999), children: "cloud_download", className: classes.icon}), onClick: toRetire},"RITIRA STORIA")),
                e(Tooltip, {key: getRandomInt(999999), title: "ELIMINA STORIA"}, e(Button, {key: "bb5", variant: "contained", className: classes.button, endIcon: e(Icon, {key: getRandomInt(999999), children: "delete", className: classes.icon}), onClick: toDelete},"ELIMINA STORIA")),
                e(DialogComponent, {key: getRandomInt(999999), fun: props.setOpenErrorDialog, open: props.openErrorDialog, textError: props.textErrorDialog} )
            ])   
        ]) 
    ])


}

export default Select;