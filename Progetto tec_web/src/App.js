const e = React.createElement;
import Home from "./Home.js";
import AppControl from "./src_control/AppControl.js";
import CreateHome from "./src_create/CreateHome.js";
import SelectHome from "./src_select/SelectHome.js";
const {IconButton, makeStyles, Icon} = window['MaterialUI'];


const HashRouter  = ReactRouterDOM.HashRouter ;
const Route = ReactRouterDOM.Route;

const useStyles = makeStyles((theme) => ({
    buttonImage: {
        height: 45,
        width: 45,
        border: "solid 2px black",
        transition: "0.2s",
        background: "#cc0000",
        ['&:hover']: {
            scale: 1.1
        }

    },
    buttonStandard: {
        color: "#ffcc00",
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },
    icon:{
        marginLeft: 0,
        marginRight: 0
    }
}));

function App(){
    const classes = useStyles();

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }


    function backToHome(){
        location.href = "./?#/"
    }

    return e(React.Fragment, {key: getRandomInt(999999)}, [
        e("header", {key: getRandomInt(999999), className: "myheader", key: "headerHome", id: "headerHome"},[
            e("div", {key: getRandomInt(999999), className: "myheaderFirst"}, [
                e("img", {key: getRandomInt(999999), src: "../img/P2.png"})
            ]),
            e("div", {key: getRandomInt(999999), className: "myheaderSecond"},[
                e("span", {key: getRandomInt(999999), style: {color: "#cc0000", marginRight: "10px"}}, "MISTERY "),
                e("span", {key: getRandomInt(999999), style: {marginRight: "10px", fontSize: "30px", marginTop: "10px"}}, "AT"),  
                e("span", {key: getRandomInt(999999), style: {color: "#ffcc00"}}, "MUSEUM"),  
            ]),
            e("div", {key: getRandomInt(999999), className: "myheaderThird"}, [
                e(IconButton, {key: getRandomInt(999999), id: "backHome", className: [classes.buttonStandard, classes.buttonImage], component: "span", onClick: backToHome}, 
                    e(Icon, {key: getRandomInt(999999), children: "home", className: classes.icon}),  
                ),
            ]),
        ]),
        e("main", {key: "main"}, [
            e(HashRouter, {key: "hashRouterApp"}, [
                e(Route, {key: "Home", exact: true, path: "/", component: Home}),
                e(Route, {key: "CreateHome", path: "/Create", component: CreateHome}),
                e(Route, {key: "SelectHome", path: "/SelectHome", component: SelectHome}),
                e(Route, {key: "AppControl", path: "/Home", component: AppControl})
            ])
        ])
    ])
}

export default App;