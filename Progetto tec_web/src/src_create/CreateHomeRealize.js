const e = React.createElement;

const HashRouter  = ReactRouterDOM.HashRouter ;
const Route = ReactRouterDOM.Route;


function CreateHomeRealize(props){
    if (props.user == "") props.userUpdate(localStorage.getItem(`user0`));    
    else {
        localStorage.setItem(`user0`, props.user);
        props.userUpdate(localStorage.getItem(`user0`));    
    }

    return e("div", {className: "containerHome"}, [
        e("div", {className:"containerHome_userSelected"}, [
            e("p", null, `UTENTE SELEZIONATO: ${props.user}`),
            e("p", {id: "containerHome_userSelected_realize_info"})
        ]),
        e("div", {className: "containerHome_realize"}, [
            e("div", {id: "create_story", className: "sx_realize"}, [
                e("div", {className: "sx_realize_top"}, [
                    e("div", {id: "arrayActivities"})
                ]),
                e("div", {className: "sx_realize_bottom"}, [
                    e(HashRouter, null, [
                        e(Route, {exact: true, path: "/Create/realize/player", component: () => e(Player_setup, user_)}),
                        e(Route, {exact: true, path: "/Create/realize/activity", component: () => e(Activity_setup, null)}),
                        e(Route, {exact: true, path: "/Create/realize/", component: () => e(Info_setup, {user: props.user})})
                    ])                ])
            ]),
            e("div", {id: "visualStory", className: "dx_realize"})
        ])
    ])
}


function Info_setup(props){
    React.useEffect(() => {
        document.getElementById("containerHome_userSelected_realize_info").innerHTML = "Inserisci le informazioni generali";
    }, [])
    
    function createNewJsonFile() {
        var file = {
            id: "",
            user: props.user, 
            published: false, 
            title: document.getElementById("title").value.charAt(0).toUpperCase() + document.getElementById("title").value.substring(1),
            gender: document.getElementById("gender").value,
            description: document.getElementById("description").value.charAt(0).toUpperCase() + document.getElementById("description").value.substring(1),
            accessibility: document.getElementById("accessibility").value,
            participantsType: document.getElementById("participantsType").value,
            participantsNumber: 0,
            ageStart: document.getElementById("ageStart").value,
            ageEnd: document.getElementById("ageEnd").value,
        }
        axios.post('http://localhost:8000/createStory', {
            user: props.user,
            file
        })
        .then(() => location.href = "./#/Create/realize/player")
        .catch((error) => console.log(error));
    }

    return(
        e("form", {id: "formInfo", onSubmit: createNewJsonFile}, [
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "title"}, "Titolo:"),
                e("input", {id: "title"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "gender"}, "Genere storia:"),
                e("select", {id: "gender"}, [
                    e("option", {value: ""}, "------------------"),
                    e("option", {value: "Avventura"}, "Avventura"),
                    e("option", {value: "Thriller"}, "Thriller"),
                    e("option", {value: "Azione"}, "Azione"),
                    e("option", {value: "Storico"}, "Storico"),
                    e("option", {value: "Horror"}, "Horror"),
                    e("option", {value: "Fantasy"}, "Fantasy"),
                    e("option", {value: "Fantascienza"}, "Fantascienza"),
                    e("option", {value: "Spionaggio"}, "Spionaggio"),
                    e("option", {value: "Spaziale"}, "Spaziale"),
                    e("option", {value: "Western"}, "Western")
                ])
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "description"}, "Descrizione:"),
                e("textarea", {id: "description", placeholder: "Scrivi qui una breve descrizione della tua storia"})
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "accessibility"}, "Storia accessibile:"),
                e("select", {id: "accessibility"}, [
                    e("option", {value: ""}, "-----"),
                    e("option", {value: "Si"}, "Si"),
                    e("option", {value: "No"}, "No")
                ])
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "participantsType"}, "Tipo partecipanti: "),
                e("select", {id: "participantsType"}, [
                    e("option", {value: ""}, "----------------------"),
                    e("option", {value: "singlePlayer"}, "Giocatore singolo"),
                    e("option", {value: "group"}, "Gruppo singolo"),
                    e("option", {value: "differentGroup"}, "Gruppi diversi"),
                ])
            ]),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "age"}, "Fascia di eta:"),
                e("div", {id: "age"}, [
                    e("input", {id: "ageStart", type: "number"}),
                    e("div", {id: "ageSeparator"}, "-"),
                    e("input", {id: "ageEnd", type: "number"})
                ])
            ]),
            e("input", {id: "sumbit_formInfo", type: "submit", value: "INVIA"})
        ])
    )
}

function Player_setup(props){
    React.useEffect(() => {
        document.getElementById("containerHome_userSelected_realize_info").innerHTML = "Inserisci le informazioni sullo stile del player";
    }, [])

    return(
        e("form", null, [
            e("div", {clasName: "sx_realize_option"}, [
                e("label", {htmlFor: "title"}, "Titolo"),
                e("input", {id: "title"})
            ]),
        ])
    )
}

function Activity_setup(props){
    function createNewJsonFile() {
        var preview = {
            title: document.getElementById("title_preview").value,
            gender: document.getElementById("gender_preview").value,
            description: document.getElementById("description_preview").value,
            published: false
        }
        axios.post('http://localhost:8000/createStory', {
            user: props.user,
            preview
        })
        .then((response) => alert(`Storia \"${response.data}\" creata correttamente nella tua cartella personale. Pubblicala per poterci giocare!`))
        .catch((error) => console.log(error));
        location.href = "./#/Create/select"
    }

}



export default CreateHomeRealize;






/*function prova(){
    const colorInputEl = document.getElementById("color")
    colorInputEl.addEventListener("input", (event) => {
        const color = event.target.value
        const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
        if (color.match(hexColorRegex)){
            colorInputEl.style.borderColor = color
        } else {
            colorInputEl.style.borderColor = "rgb(266, 266, 266)"
        }
    })
}




function labelAndButton(props){
    return e("div", null, [
        e("label", {id: props.labelId, htmlFor: props.inputID}, props.labelText),
        e("input", {id: props.inputID, type: props.inputType})
    ])
}

function submitAction(e){
    e.preventDefault();
    const storia = {
        titolo: document.getElementById("titolo").value,
        numero: parseInt(document.getElementById("number").value),
        genere: document.getElementById("gender").value,
        genere: document.getElementById("gender2").value
    }
    console.log(storia)
}
*/