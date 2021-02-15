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
        transition: "0.2",
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


    function backToHome(){
        location.href = "./?#/"
    }

    return e(React.Fragment, null, [
        e("header", {className: "myheader", key: "headerHome", id: "headerHome"},[
            e("div", {className: "myheaderFirst"}, [
                e("img", {src: "../img/P2.png"})
            ]),
            e("div", {className: "myheaderSecond"},[
                e("span", {style: {color: "#cc0000", marginRight: "10px"}}, "MISTERY "),
                e("span", {style: {marginRight: "10px", fontSize: "30px", marginTop: "10px"}}, "AT"),  
                e("span", {style: {color: "#ffcc00"}}, "MUSEUM"),  
            ]),
            e("div", {className: "myheaderThird"}, [
                e(IconButton, {id: "backHome", className: [classes.buttonStandard, classes.buttonImage], component: "span", onClick: backToHome}, 
                    e(Icon, {children: "home", className: classes.icon}),  
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