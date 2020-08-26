const e = React.createElement;
var isStorySelected = false;

const toCreate = function(){
    location.href = "/public/#/Create/realize"
}

const toModify = function(){
    if (isStorySelected == false) alert("Selezionare prima una storia")
}

const toPublish = function(){
    if (isStorySelected == false) alert("Selezionare prima una storia")
}

const toRetire = function(){
    if (isStorySelected == false) alert("Selezionare prima una storia")
}

const toDelete = function(){
    if (isStorySelected == false) alert("Selezionare prima una storia")
}

function CreateHomeSelect(props){
    const {Button} = MaterialUI;  
    var user = props.user       //user selected

   
    //mechanism to avoid th effect of refresh (refresh restes the variables used with the hooks)
    //if refresh is clicked, you have to go back to the login and select again the user
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault(); // Cancel the event
        e.returnValue = ''; // Chrome requires returnValue to be set
    });
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) { //if the page is reloaded, then go back to the login page
        location.href = "/public/#/Create/login"
    }

    //mechanism to download all storys created by the user
    var ciao = []
    if (user == "ciao"){
        ciao = [e("div", null, "pollo"), e("div", null, "pollo")]
    }


    return e("div", {id: "containerHome"}, [
        e("div", {id:"containerHome_userSelected"}, [
            e("p", null, `UTENTE SELEZIONATO: ${props.userTTTT}`),
            e("p", {id: "containerHome_userSelected_explanation"}, `(Qui puoi creare una nuova storia o selezionarne una gia esistente per modificarla / eliminarla / pubblicarla / ritirare)`),
        ]),
        e("div", {id: "containerHome_Screen"}, ciao),
        e("div", {id: "containerHome_Buttons"}, [
            e(Button, {className: "buttonOfcontainerHome_Buttons", variant: "contained", onClick: toCreate},"CREA STORIA" ),
            e(Button, {className: "buttonOfcontainerHome_Buttons", variant: "contained", onClick: toModify},"MODIFICA STORIA" ),
            e(Button, {className: "buttonOfcontainerHome_Buttons", variant: "contained", onClick: toPublish},"PUBBLICA STORIA" ),
            e(Button, {className: "buttonOfcontainerHome_Buttons", variant: "contained", onClick: toRetire},"RITIRA STORIA" ),
            e(Button, {className: "buttonOfcontainerHome_Buttons", variant: "contained", onClick: toDelete},"ELIMINA STORIA" )
        ])    
    ])


}

export default CreateHomeSelect;