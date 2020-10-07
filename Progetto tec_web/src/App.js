const e = React.createElement;
import Home from "./Home.js"
import ControlHome from "./src_control/ControlHome.js";
import CreateHome from "./src_create/CreateHome.js";
import SelectHome from "./src_select/SelectHome.js";

const HashRouter  = ReactRouterDOM.HashRouter ;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;

function App(){
    
    return e(React.Fragment, null, [
        e("header", {key: "headerHome", id: "headerHome"}, "Benvenuti in xxxxx"),
        e("main", null, [
            e(HashRouter, {key: "hashRouterApp"}, [
                e(Route, {exact: true, path: "/", component: Home}),
                e(Route, {path: "/Create", component: CreateHome}),
                e(Route, {path: "/SelectHome", component: SelectHome}),
                e(Route, {path: "/ControlHome", component: ControlHome})
            ])
        ])
    ])
}

export default App;