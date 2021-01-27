const e = React.createElement;

function Card(props){

    const press = () =>{
        props.setStorySelected(props.id)
        props.other.forEach((element) => {
            var c = document.getElementById(element.id).children;
            if(props.id == element.id) c[0].style.opacity = 1
            else c[0].style.opacity = 0.7
        })
    }
    
    return e("div", {id: props.id, className: "card", onClick: press}, [
        e("img", {className: "card_backrgound", src:`../../server/upload/${props.background}`}),
        e("div", {className: "card_content"}, [
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
    ])
}

export default Card;