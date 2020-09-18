const e = React.createElement;

function CreateHomeLogin(props){
    const {TextField, Button } = window['MaterialUI']; //to load the component from the library
    var tmp = ""

    //to press enter
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            loginFunction()
        }
    }

    //check the input name, if it isn't present return an alert of error, otherwise it set the value of input
    //to the "user" variable passed as a props
    function loginFunction(){   
        if (tmp == ""){
            alert("Prima di proseguire, inserire un username valido")
        } else {
            if (tmp.includes("_") || tmp.includes(".") || tmp.includes("/") || tmp.includes(" ")){
                alert("Evitare gli spazi e i seguenti valori:   .   _   /")
            } else {
                props.userUpdate(tmp)
                location.href = "./#/Create/select"
            }
            
        }
    }

    
    return e("div", {id: "loginDiv", onSubmit: loginFunction}, [
        e("img", {id: "loginDiv_img", src: "../../Img/avatar.png"}),
        e("p", {id: "loginDiv_p"}, "INSERIRE USERNAME"),
        e(TextField, {
            id:"loginDiv_TextField",
            label:"Username",
            type:"text",
            variant:"outlined",
            required: true,
            onChange: (e) => tmp = (e.target.value),
            onKeyDown: handleKeyDown
        }),
        e(Button, {id: "loginDiv_button", variant: "outlined", onClick: loginFunction},"ENTRA" ),
    ])

}



export default CreateHomeLogin;


/*
    function loginFunction(){      
        props.userUpdate(tmp)
        const url = "http://127.0.0.1:8000/";
        axios.get(url) 
            .then(response => {
                console.log(response.data.ciao); 
                props.storyUpdate(response.data.ciao)})
        location.href = "/public/#/Create/select"
    }


     var input = document.getElementById("loginDiv_TextField");
    input.addEventListener("keyup", (event) => {
        if (event.keycode === 13) {
            console.log(event.target.value);
        }
    });
*/ 