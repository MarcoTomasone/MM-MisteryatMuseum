const e = React.createElement;

const description1 = "In questa sezione potrai accedere alle tue storie: potrai modificare il tuo ambiente creando, modificando, eliminando le tue storie e molto altro";
const description2 = "In questa sezione potrai trovare tutte le storie pubblicate e potrai sceglierne una per poterci giocare";
const description3 = "In questa sezione potrai controllare l'andamento di una storia";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function HomeSelect(props){
    return e("a", {key: props.title, className: "homeBlock", href: props.url}, [
        e("h1", {key: getRandomInt(999999)}, props.title),
        e("p", {key: getRandomInt(999999)}, props.description),
        e("img", {key: getRandomInt(999999), className: props.imgClass, src: props.imgUrl})
    ])
}

function Home(){
    return e("nav", {key: "nav"}, [
        e("div", {key: getRandomInt(999999), className:"containerHome_userSelected"}, [
            e("p", {key: getRandomInt(999999), style: {fontSize: "20px"}}, `SCEGLI UNA SEZIONE`),
        ]),
        e("div", {key: "mainHome", id: "mainHome"},[
            e(HomeSelect, {key: "op1Main", id: "op1Main", url: "./?#/Create/login", title: "SEZIONE PRIVATA", description: description1, imgClass: "home_img", imgUrl: "../img/pen.png"}),
            e(HomeSelect, {key: "op2Main", id: "op2Main", url: "./?#/SelectHome", title: "SEZIONE PUBBLICA", description: description2, imgClass: "home_img", imgUrl: "../img/qrcode.png"}),
            e(HomeSelect, {key: "op3Main", id: "op3Main", url: "./?#/Home", title: "SEZIONE CONTROLLO", description: description3, imgClass: "home_img", imgUrl: "../img/lens.png"})
        ])
    ])
}

export default Home;