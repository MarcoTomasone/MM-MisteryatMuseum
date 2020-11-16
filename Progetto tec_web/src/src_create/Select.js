const e = React.createElement;
const {Button, makeStyles, Icon, Tooltip} = MaterialUI;

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "grey",
        color: "white",
        borderRadius: 10,
        height: ("80%"),
        width: ("100%"),
        fontSize: 16,
        lineHeight: 1,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        margin: theme.spacing(1),
        ['@media (max-width:931px)']: { 
            fontSize: 0,
            height: 60,
            width: 60,
            borderRadius: ("50%"),
            paddingRight: 28,
        }
    },
    icon:{
        ['@media (max-width:931px)']: { 
            height: 20,
            width: 50,
        }
    }
}));

var storySelected = "";


const toCreate = function(){
    location.href = "./?#/Create/realize"
}

const toDuply = function(){
    if (storySelected == "") alert("Selezionare prima una storia");
    else {
        axios.get(`http://localhost:8000/duplyStory/${storySelected}`)
        .then((response) => alert(`Storia \"${storySelected}\" dupicata correttamente`))
        .catch((error) => console.log(error));  
    }
}

const toModify = function(){
    if (storySelected == "") alert("Selezionare prima una storia")
}

const toPublish = function(){
    if (storySelected == "") alert("Selezionare prima una storia")
    else {
        axios.post('http://localhost:8000/publishStory', {story: storySelected})
        .then((response) => alert(`Storia \"${storySelected}\" pubblicata correttamente. Vai nella sezione "SELZIONA" dove troverai il suo qr code`))
        .catch((error) => console.log(error));
    }
}

const toRetire = function(){
    if (storySelected == "") alert("Selezionare prima una storia")
    else {
        axios.delete(`http://localhost:8000/retireStory/${storySelected}`)
        .then((response) => alert(`Storia \"${storySelected}\" ritirata correttamente`))
        .then(() => document.getElementById(storySelected).classList.remove("story_published"))
        .catch((error) => console.log(error));  
    }
}

const toDelete = function(){
    if (storySelected == "") alert("Selezionare prima una storia")
    else {
        axios.delete(`http://localhost:8000/deleteStory/${storySelected}`)
        .then((response) => alert(`Storia \"${storySelected}\" eliminata correttamente`))
        .catch((error) => console.log(error));
    }
}


function Card(props){

    const press = () =>{
        storySelected = props.id
        props.other.forEach((element) => {
            if(storySelected != element.id){
                document.getElementById(element.id).classList.remove("card_selected");
            }
        })
        document.getElementById(props.id).classList.add("card_selected");
    }
    
    return e("div", {id: props.id, className: "card", onClick: press}, [
        e("div", {className: "card_title"}, props.title),
        e("div", {className: "card_gender"}, props.gender),
        e("div", {className: "card_objective"}, props.objective),
        e("div", {className: "card_info"}, [
            e("div", {className: "card_participant"}, [
                e("img", {className: "cardImg", src: props.participantsType})
            ]),
            e("div", {className: "card_accessibility"}, [
                e("img", {className: "cardImg", src: props.accessibility})
            ]),
        ]),
        e("div", {className: "card_description"}, props.description)
    ])
}


function Select(props){
    const classes = useStyles();

    const [arrayPrivateStories, setArrayPrivateStories] =  React.useState([]);
    var arrayOfStories = []

    if (props.user == "") props.setUser(localStorage.getItem(`user0`));    
    else {
        localStorage.setItem(`user0`, props.user);
        props.setUser(localStorage.getItem(`user0`));    
    }


    React.useEffect(() => {
        axios.get(`http://localhost:8000/storiesFolder/${props.user}`)
        .then((response) => {
            response.data.forEach((element) => {
                arrayOfStories.push(
                    e(Card, {
                        id: element.id,
                        title: element.title, 
                        gender: element.gender,
                        objective: element.objective,
                        participantsType: element.participantsType.url,
                        accessibility: element.accessibility.url,
                        description: element.description,
                        published: element.published,
                        other: response.data
                    })
                )
            })
            setArrayPrivateStories(arrayOfStories)
            return response; 
        }).then((response) => {
            response.data.forEach((element) => {
                if (element.published == true) document.getElementById(element.id).classList.add("story_published");
            })
        })
    }, [])

    return e("div", {className: "containerHome"}, [
        e("div", {className:"containerHome_userSelected"}, [
            e("p", null, `UTENTE SELEZIONATO: ${props.user}`),
            e("p", {id: "containerHome_userSelected_explanation"}, `(Qui puoi creare una nuova storia o selezionarne una gia esistente per modificarla / eliminarla / pubblicarla / ritirare)`),
        ]),
        e("div", {className: "containerHome_privateSelect"}, [
            e("div", {className: "sx_privateSelect"}, arrayPrivateStories),
            e("div", {className: "dx_privateSelect"}, [
                e(Tooltip, {title: "CREA STORIA"}, e(Button, {key: "bb0", variant: "contained", className: classes.button, endIcon: e(Icon, {children: "fiber_new", className: classes.icon}), onClick: toCreate},"CREA STORIA")),
                e(Tooltip, {title: "DUPLICA STORIA"}, e(Button, {key: "bb1", variant: "contained", className: classes.button, endIcon: e(Icon, {children: "file_copy", className: classes.icon}), onClick: toDuply},"DUPLICA STORIA")),
                e(Tooltip, {title: "MODIFICA STORIA"}, e(Button, {key: "bb2", variant: "contained", className: classes.button, endIcon: e(Icon, {children: "create", className: classes.icon}), onClick: toModify},"MODIFICA STORIA")),
                e(Tooltip, {title: "PUBBLICA STORIA"}, e(Button, {key: "bb3", variant: "contained", className: classes.button, endIcon: e(Icon, {children: "cloud_upload", className: classes.icon}), onClick: toPublish},"PUBBLICA STORIA")),
                e(Tooltip, {title: "RITIRA STORIA"}, e(Button, {key: "bb4", variant: "contained", className: classes.button, endIcon: e(Icon, {children: "cloud_download", className: classes.icon}), onClick: toRetire},"RITIRA STORIA")),
                e(Tooltip, {title: "ELIMINA STORIA"}, e(Button, {key: "bb5", variant: "contained", className: classes.button, endIcon: e(Icon, {children: "delete", className: classes.icon}), onClick: toDelete},"ELIMINA STORIA"))
            ])   
        ]) 
    ])


}

export default Select;


    /*mechanism to avoid th effect of refresh (refresh restes the variables used with the hooks)
    if refresh is clicked, you have to go back to the login and select again the user
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault(); 
        e.returnValue = ''; 
    });
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) { //if the page is reloaded, then go back to the login page
        location.href = "./#/Create/login"
    }*/