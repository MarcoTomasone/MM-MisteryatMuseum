const e = React.createElement;

function Card(props){

    const press = () =>{
        props.setStorySelected(props.id)
        props.other.forEach((element) => {
            if(props.storySelected != element.id){
                document.getElementById(element.id).classList.remove("card_selected");
            }
        })
        document.getElementById(props.id).classList.add("card_selected");
    }
    
    return e("div", {id: props.id, className: "card", onClick: press}, [
        e("div", {className: "card_title"}, props.title),
        e("div", {className: "card_gender"}, props.gender),
        e("div", {className: "card_objective"}, props.objective),
        e("div", {className: "card_info"}, [
            e("div", {className: "card_participant"}, [
                e("img", {className: "cardImg", src: props.participantsType})
            ]),
            e("div", {className: "card_accessibility"}, [
                e("img", {className: "cardImg", src: props.accessibility})
            ]),
        ]),
        e("div", {className: "card_description"}, props.description)
    ])
}

export default Card;