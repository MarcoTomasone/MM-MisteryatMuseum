const e = React.createElement;

var storySelected = "";

const toCreate = function(){
    location.href = "./#/Create/realize"
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
        e("div", {className: "card_info"}, [
            e("div", {className: "card_participant"}, props.participant),
            e("div", {className: "card_accessibility"}, props.props),
        ]),
        e("div", {className: "card_description"}, props.description)
    ])
}


function CreateHomeSelect(props){
    const {Button} = MaterialUI;  
    const [arrayPrivateStories, setArrayPrivateStories] =  React.useState([]);
    var arrayOfStories = []

    if (props.user == "") props.userUpdate(localStorage.getItem(`user0`));    
    else {
        localStorage.setItem(`user0`, props.user);
        props.userUpdate(localStorage.getItem(`user0`));    
    }


    React.useEffect(() => {
        axios.get(`http://localhost:8000/storiesFolder/${props.user}`)
        .then((response) => {
            response.data.forEach((element) => {
                arrayOfStories.push(e(Card, {
                    key: element.id, 
                    id: element.id, 
                    title: element.title, 
                    gender: element.gender, 
                    description: element.description,
                    published: element.published,
                    other: response.data
                }))
            })
            setArrayPrivateStories(arrayOfStories)
            return response; 
        }).then((response) => {
            response.data.forEach((element) => {
                if (element.published == true) document.getElementById(element.id).classList.add("story_published");
            })
        })
        .catch((error) => console.log(error));
    })

    return e("div", {className: "containerHome"}, [
        e("div", {className:"containerHome_userSelected"}, [
            e("p", null, `UTENTE SELEZIONATO: ${props.user}`),
            e("p", {id: "containerHome_userSelected_explanation"}, `(Qui puoi creare una nuova storia o selezionarne una gia esistente per modificarla / eliminarla / pubblicarla / ritirare)`),
        ]),
        e("div", {className: "containerHome_main"}, [
            e("div", {className: "containerHome_main_screen"}, arrayPrivateStories),
            e("div", {className: "containerHome_main_buttons"}, [
                e(Button, {key: "bb0", className: "containerHome_main_buttons_button", variant: "contained", onClick: toCreate},"CREA STORIA" ),
                e(Button, {key: "bb1", className: "containerHome_main_buttons_button", variant: "contained", onClick: toModify},"MODIFICA STORIA" ),
                e(Button, {key: "bb2", className: "containerHome_main_buttons_button", variant: "contained", onClick: toPublish},"PUBBLICA STORIA" ),
                e(Button, {key: "bb3", className: "containerHome_main_buttons_button", variant: "contained", onClick: toRetire},"RITIRA STORIA" ),
                e(Button, {key: "bb4", className: "containerHome_main_buttons_button", variant: "contained", onClick: toDelete},"ELIMINA STORIA" )
            ])   
        ]) 
    ])


}

export default CreateHomeSelect;


    /*mechanism to avoid th effect of refresh (refresh restes the variables used with the hooks)
    if refresh is clicked, you have to go back to the login and select again the user
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault(); 
        e.returnValue = ''; 
    });
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) { //if the page is reloaded, then go back to the login page
        location.href = "./#/Create/login"
    }*/