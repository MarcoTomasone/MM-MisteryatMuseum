const e = React.createElement;

const description1 = "In questa sezione potrai creare una nuova storia"
const description2 = "In questa sezione potrai selezionare una storia per poterci giocare"
const description3 = "In questa sezione potrai controllare l'andamento di una storia"

function HomeSelect(props){
    return e("a", {className: "homeBlock", href: props.url}, [
        e("h1", null, props.title),
        e("p", null, props.description),
        e("img", {className: props.imgClass, src: props.imgUrl})
    ])
}

function Home(){
    return e("nav", {key: "mainHome", id: "mainHome"}, [
        e(HomeSelect, {key: "op1Main", id: "op1Main", url: "./#/Create/login", title: "SEZIONE PRIVATA", description: description1, imgClass: "home_img", imgUrl: "../Img/pen.png"}),
        e(HomeSelect, {key: "op2Main", id: "op2Main", url: "./#/SelectHome", title: "SEZIONE PUBBLICA", description: description2, imgClass: "home_img", imgUrl: "../Img/qrcode.png"}),
        e(HomeSelect, {key: "op3Main", id: "op3Main", url: "./#/ControlHome", title: "SEZIONE CONTROLLO", description: description3, imgClass: "home_img", imgUrl: "../Img/lens.png"})
    ])
}

export default Home;

