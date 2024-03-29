const e = React.createElement;
const {Button} = MaterialUI;  
import Card from "../src_create/Card.js"
import {DialogComponent} from "../src_create/Dialog.js"


function SelectHome(){
    const [arrayPrivateStories, setArrayPrivateStories] =  React.useState([]);
    const [storySelected, setStorySelected] =  React.useState("");
    const [error, setError] = React.useState(false);
    const [link, setLink] = React.useState("");


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
            setLink(`http://127.0.0.1:5500/src2/index2.html?story=${story}`)
        }
    }

    function downloadQRCode(){
        const canvas = document.getElementById("qr-code");
        var image = canvas.toDataURL();  
        var tmpLink = document.createElement( 'a' );  
        tmpLink.download = storySelected 
        tmpLink.href = image;  
        document.body.appendChild( tmpLink );  
        tmpLink.click();  
        document.body.removeChild( tmpLink );
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
                        fontFamily: element.fontFamily,
                        other: response.data
                    })
                ])
            })
        })
        .catch((error) => console.log(error));
    }, [])

    function goLink(){
        if (link != ""){
            var win = window.open(link, '_blank');
            win.focus();
        }
    }
    
    return e("div", {className: "containerHome"}, [
        e("div", {className:"containerHome_userSelected"}, [
            e("p", null, `LISTA COMPLETA DELLE STORIE ATTIVE`),
        ]),
        e("div", {className: "containerHome_publicSelect"}, [
            e("div", {className: "sx_publicSelect"}, arrayPrivateStories),
            e("div", {className: "dx_publicSelect"}, [
                e("div", {className: "dx_publicSelectButton"}, [
                    e(Button, {key: "bb0", id: "qr-btn", variant: "contained", onClick: generateQRCode}, "SCANSIONA"),
                    e(Button, {key: "bb1", variant: "contained", onClick:downloadQRCode}, "SCARICA"),
                ]),
                e("canvas", {key: "bb2", id: "qr-code", onClick: goLink})
            ])
        ]),
        e(DialogComponent, {fun: setError, open: error, textError: "Selezionare prima una storia"} ),
    ])

}

export default SelectHome;