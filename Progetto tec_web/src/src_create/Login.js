const e = React.createElement;

function Login(props){
    const {TextField, Button } = window['MaterialUI']; //to load the component from the library
    var username = ""
    var password = ""

    //to press enter
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            loginFunction()
        }
    }

    //check the input name, if it isn't present return an alert of error, otherwise it set the value of input
    //to the "user" variable passed as a props
    function loginFunction(){   
        if (username == ""){
            alert("Prima di proseguire, inserire un username valido")
        } else {
            if (username.includes("_") || username.includes(".") || username.includes("/") || username.includes(" ")){
                alert("Evitare gli spazi e i seguenti valori:   .   _   /")
            } else {
                props.setUser(username.charAt(0).toUpperCase() + username.substring(1).toLowerCase())
                location.href = "./?#/Create/select"                
            }        
        }
    }

    return e("div", {id: "loginDiv", onSubmit: loginFunction}, [
        e("img", {id: "loginDiv_img", src: "../../Img/avatar.png"}),
        e("p", {id: "loginDiv_p"}, "INSERIRE USERNAME"),
        e(TextField, {
            id:"loginDiv_TextField",
            className: "login",
            label:"Username",
            type:"text",
            variant:"outlined",
            required: true,
            onChange: (e) => username = (e.target.value),
            onKeyDown: handleKeyDown
        }),
        /*e(TextField, {
            id:"password_TextField",
            className: "login",
            label:"Password",
            type:"password",
            variant:"outlined",
            required: true,
            onChange: (e) => password = (e.target.value),
            onKeyDown: handleKeyDown
        }),*/
        e(Button, {id: "loginDiv_button", variant: "outlined", onClick: loginFunction},"ENTRA" ),
    ])
}

export default Login;





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



  
/*axios.post('http://localhost:8000/login', {
    usrnm: username,
    psswd: password
})
.then(() => {
    props.userUpdate(username.charAt(0).toUpperCase() + username.substring(1).toLowerCase())
    location.href = "./#/Create/select"
})
.catch(() => alert("Username o password errati. Riprovare."))*/
