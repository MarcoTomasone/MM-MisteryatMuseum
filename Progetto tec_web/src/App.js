const e = React.createElement;
import Home from "./Home.js";
import AppControl from "./src_control/AppControl.js";
import CreateHome from "./src_create/CreateHome.js";
import SelectHome from "./src_select/SelectHome.js";

const HashRouter  = ReactRouterDOM.HashRouter ;
const Route = ReactRouterDOM.Route;

function App(){
    
    return e(React.Fragment, null, [
        e("header", {className: "myheader", key: "headerHome", id: "headerHome"}, "Benvenuti in xxxxx"),
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