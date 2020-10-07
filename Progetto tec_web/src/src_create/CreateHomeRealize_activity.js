const e = React.createElement;

function CreateHomeRealize_activity(props){
    React.useEffect(() => {
        document.getElementById("containerHome_userSelected_realize_info").innerHTML = "Crea le attività della tua storia";
    }, [])

    return(
        e("div", null)
    )
}

export default CreateHomeRealize_activity;
