const e = React.createElement;
import Card from "../src_create/Card.js"

function SelectHome(){
    const {Button} = MaterialUI;  
    const [arrayPrivateStories, setArrayPrivateStories] =  React.useState([]);
    const [storySelected, setStorySelected] =  React.useState("");
    var arrayOfStories = []

    React.useEffect(() => {
        axios.get(`http://localhost:8000/storiesFolder`)
        .then((response) => {
            response.data.forEach((element) => {
                arrayOfStories.push(
                    e(Card, {
                        storySelected: storySelected,
                        setStorySelected: setStorySelected,
                        id: element.id,
                        title: element.title, 
                        gender: element.gender,
                        objective: element.objective,
                        participantsType: element.participantsType.url,
                        accessibility: element.accessibility.url,
                        description: element.description,
                        published: element.published,
                        other: response.data
                    })
                )
                setArrayPrivateStories(arrayOfStories)
            })
        })
        .catch((error) => console.log(error));
    }, [])


    return e("div", {className: "containerHome"}, [
        e("div", {className:"containerHome_userSelected"}, [
            e("p", null, `LISTA COMPLETA DELLE STORIE ATTIVE`),
        ]),
        e("div", {className: "containerHome_publicSelect"}, [
            e("div", {className: "sx_publicSelect"}, arrayPrivateStories),
            e("div", {className: "dx_publicSelect"}, [
                e(Button, {key: "bb0", id: "dx_publicSelect_button", variant: "contained"}, "SCANSIONA"),
                e("div", {key: "bb1", id: "dx_publicSelect_qrcodeSection"})
            ])
        ])  
    ])

}

export default SelectHome;