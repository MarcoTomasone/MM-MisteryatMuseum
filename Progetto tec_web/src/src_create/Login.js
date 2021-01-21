const e = React.createElement;

function Login(props){
    const {TextField, Button } = window['MaterialUI']; //to load the component from the library
    var username = ""

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
        e(Button, {id: "loginDiv_button", variant: "outlined", onClick: loginFunction},"ENTRA" ),
    ])
}

export default Login;