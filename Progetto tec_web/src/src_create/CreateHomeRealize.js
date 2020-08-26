const e = React.createElement;

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


function prova(){
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
window.onload = prova

function CreateHomeRealize(props){
    return e("input", {id: "color", type:"text"})
}


export default CreateHomeRealize;