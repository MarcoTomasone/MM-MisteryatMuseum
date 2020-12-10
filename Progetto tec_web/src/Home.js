const e = React.createElement;

const description1 = "In questa sezione potrai accedere al tue storie: potrai modificare il tuo ambiente creando, modificando, eliminando le tue storie e molto altro";
const description2 = "In questa sezione potrai trovare tutte le storie pubblicate e potrai sceglierne una per poterci giocare";
const description3 = "In questa sezione potrai controllare l'andamento di una storia";

function HomeSelect(props){
    return e("a", {className: "homeBlock", href: props.url}, [
        e("h1", null, props.title),
        e("p", null, props.description),
        e("img", {className: props.imgClass, src: props.imgUrl})
    ])
}

function Home(){
    return e("nav", {key: "mainHome", id: "mainHome"}, [
        e(HomeSelect, {key: "op1Main", id: "op1Main", url: "./?#/Create/login", title: "SEZIONE PRIVATA", description: description1, imgClass: "home_img", imgUrl: "../img/pen.png"}),
        e(HomeSelect, {key: "op2Main", id: "op2Main", url: "./?#/SelectHome", title: "SEZIONE PUBBLICA", description: description2, imgClass: "home_img", imgUrl: "../img/qrcode.png"}),
        e(HomeSelect, {key: "op3Main", id: "op3Main", url: "./?#/Home", title: "SEZIONE CONTROLLO", description: description3, imgClass: "home_img", imgUrl: "../img/lens.png"})
    ])
}

export default Home;