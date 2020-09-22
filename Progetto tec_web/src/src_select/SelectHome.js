const e = React.createElement;
var storySelected = "";

function Card(props){

    const press = () =>{
        storySelected = props.id
        props.other.forEach((element) => {
            if(storySelected != element.id){
                document.getElementById(element.id).classList.remove("card_selected");
            }
        })
        document.getElementById(props.id).classList.add("card_selected");
        console.log(props.id)
	}

    return e("div", {id: props.id, className: "card", onClick: press}, [
        e("div", {className: "card_title"}, props.title),
        e("div", {className: "card_gender"}, props.gender),
        e("div", {className: "card_info"}, [
            e("div", {className: "card_participant"}, props.participant),
            e("div", {className: "card_accessibility"}, props.props),
        ]),
        e("div", {className: "card_description"}, props.description)
    ])
}


function SelectHome(){
    const {Button} = MaterialUI;  
    const [arrayPrivateStories, setArrayPrivateStories] =  React.useState([]);
    var arrayOfStories = []

    React.useEffect(() => {
        axios.get(`http://localhost:8000/storiesFolder`)
        .then((response) => {
            response.data.forEach((element) => {
                console.log(element)
                arrayOfStories.push(e(Card, {
                    key: element.id, 
                    id: element.id, 
                    title: element.title, 
                    gender: element.gender, 
                    description: element.description,
                    other: response.data
                }))
            })
            setArrayPrivateStories(arrayOfStories)
        })
        .catch((error) => console.log(error));
    }, [])


    return e("div", {className: "containerHome"}, [
        e("div", {className:"containerHome_userSelected"}, [
            e("p", null, `LISTA COMPLETA DELLE STORIE ATTIVE`),
        ]),
        e("div", {className: "containerHome_main"}, [
            e("div", {className: "containerHome_main_screen"}, arrayPrivateStories),
            e("div", {className: "containerHome_main_qrcode"}, [
                e(Button, {key: "bb0", id: "containerHome_main_qrcode_button", variant: "contained"}, "PROVA"),
                e("div", {key: "bb1", id: "containerHome_main_qrcode_section"})
            ])
        ])  
    ])

}

export default SelectHome;