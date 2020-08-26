const e = React.createElement;

function CreateHomeLogin(props){
    const {TextField, Button } = window['MaterialUI'];
    var tmp = ""

    function loginFunction(){   
        if (tmp == ""){
            alert("Prima di proseguire, inserire un username valido")
        } else {
            props.userUpdate(tmp)
            location.href = "/public/#/Create/select"
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
            onChange: (e) => tmp = (e.target.value)
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
*/ 