const e = React.createElement;
const {Button} = MaterialUI;  
import Card from "../src_create/Card.js"
import {DialogComponent} from "../src_create/Dialog.js"


function SelectHome(){
    const [arrayPrivateStories, setArrayPrivateStories] =  React.useState([]);
    const [storySelected, setStorySelected] =  React.useState("");
    const [error, setError] = React.useState(false);

    function generateQRCode() {
        if (storySelected == ""){
            setError(true)
        } else {
            var qr;
            var story = storySelected.split(".")[0]
            qr = new QRious({
                element: document.getElementById('qr-code'),
                size: 200,
                value: `http://127.0.0.1:5500/src2/index2.html?story=${story}`
            });
        }
    }

    
    React.useEffect(() => {
        axios.get(`http://localhost:8000/storiesFolder`)
        .then((response) => {
            response.data.forEach((element) => {
                setArrayPrivateStories(arrayPrivateStories => [...arrayPrivateStories,
                    e(Card, {
                        setStorySelected: setStorySelected,
                        background: element.background,
                        id: element.id,
                        title: element.title, 
                        gender: element.gender,
                        objective: element.objective,
                        participantsType: element.participantsType.url,
                        accessibility: element.accessibility.url,
                        description: element.description,
                        published: element.published,
                        age: element.age,
                        other: response.data
                    })
                ])
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
                e(Button, {key: "bb0", id: "qr-btn", variant: "contained", onClick:generateQRCode}, "SCANSIONA"),
                e("canvas", {key: "bb1", id: "qr-code"})
            ])
        ]),
        e(DialogComponent, {fun: setError, open: error, textError: "Selezionare prima una storia"} ),
    ])

}

export default SelectHome;