const e = React.createElement;

function Card(props){
    const [background, setBackground] = React.useState(`../../server/upload/${props.background}`)

    const press = () =>{
        props.setStorySelected(props.id)
        props.other.forEach((element) => {
            var c = document.getElementById(element.id).children;
            if(props.id == element.id) c[0].style.opacity = 1
            else c[0].style.opacity = 0.4
        })
    }

    React.useEffect(() => {
        if (props.background == "") setBackground("")
    }, [])
    
    return e("div", {id: props.id, className: "card", onClick: press}, [
        e("img", {className: "card_backrgound", src: background}),
        e("div", {className: "card_content"}, [
            e("div", {className: "card_title"}, props.title),
            e("div", {className: "card_gender"}, props.gender),
            e("div", {className: "card_objective"}, props.objective),
            e("div", {className: "card_info"}, [
                e("div", {className: "card_participant"}, [
                    e("img", {src: props.participantsType})
                ]),
                e("div", {className: "card_accessibility"}, [
                    e("img", {src: props.accessibility})
                ]),
            ]),
            e("div", {className: "card_age"}, `${props.age[0]} - ${props.age[1]}`),
            e("div", {className: "card_description"}, props.description)
        ])
    ])
}

export default Card;