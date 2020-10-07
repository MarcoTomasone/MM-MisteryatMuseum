const e = React.createElement;

function CreateHomeRealize_firstLastActivity(props){


    React.useEffect(() => {
        if (props.activity == true){
            var i = 0;
            if (props.firstLast != 0) i = props.firstLast - 1;
            document.getElementById("heightFrame").value = props.story.activities[i].heightFrame.split("p")[0];
            document.getElementById("activityText").value = props.story.activities[i].text
        } else {
            document.getElementById("heightFrame").value = 200
            document.getElementById("activityText").value = "";
        }

        const interval = setInterval(() => {
            document.getElementById("phoneText").style.height = `${document.getElementById("heightFrame").value}px`;
            document.getElementById("phoneText").innerHTML = document.getElementById("activityText").value;
        }, 100);
        return () => clearInterval(interval);
    })


    const createActivity = () => {
        var tmp = props.story;
        tmp.activities[props.firstLast] = {
            heightFrame: `${document.getElementById("heightFrame").value}px`,
            text: document.getElementById("activityText").value,
        };
        props.setStory(tmp);
        props.setActivity(true);
    }

    return(
        e("form", {id: props.id, className: props.className, onSubmit: createActivity}, [
            e("p", null, "CORNICE TESTO"),
            e("div", {className: "sx_realize_option_player"}, [
                e("label", {htmlFor: "heightFrame"}, "Altezza:"),
                e("input", {id: "heightFrame", type: "number"})
            ]),
            e("hr", null),
            e("p", null, "TESTO"),
            e("div", {className: "sx_realize_option"}, [
                e("label", {htmlFor: "activityText"}, "Testo attività:"),
                e("textarea", {id: "activityText"})
            ]),
            e("input", {id: "sumbit_formFirstLastActivity", type: "submit", value: "SALVA"}),
        ])    
    )


}

export default CreateHomeRealize_firstLastActivity;