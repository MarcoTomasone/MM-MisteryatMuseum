const e = React.createElement;


function CreateHomeRealize(props){
    if (props.user == "") props.userUpdate(localStorage.getItem(`user0`));    
    else {
        localStorage.setItem(`user0`, props.user);
        props.userUpdate(localStorage.getItem(`user0`));    
    }

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

    return e("div", {className: "containerHome"}, [
        e("div", {className:"containerHome_userSelected"}, [
            e("p", null, `UTENTE SELEZIONATO: ${props.user}`),
            e("p", null, `Crea la tua storia compilando tutti i campi`)
        ]),
        e("div", {className: "containerHome_realize"}, [
            e("div", {id: "create_story", className: "sx_realize"}),
            e("div", {id: "visual_story", className: "dx_realize"})
        ])
    ])
}




/**
 *    e("form", {onSubmit: createNewJsonFile }, [
            e("label", {htmlFor: "title_preview"}, "Titolo"),
            e("input", {id: "title_preview"}),
            e("label", {htmlFor: "gender_preview"}, "Genere storia"),
            e("input", {id: "gender_preview"}),
            e("label", {htmlFor: "description_preview"}, "Descrizione"),
            e("input", {id: "description_preview"}),
            e("input", {id: "sumbit_preview", type: "submit", value: "SUBMIT"})
        ])
 */

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