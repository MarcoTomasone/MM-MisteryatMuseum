import Control from './Control.js';
import Home from './Home.js';

const e = React.createElement;
const HashRouter  = ReactRouterDOM.HashRouter ;
const Route = ReactRouterDOM.Route;

export default function AppControl(props){

    return e(React.Fragment, null, [
        e(HashRouter, {key: "hashRouterApp"}, [
            e(Route, {key: "controlHome", exact: true, path: "/Home/", component: Home}),
            e(Route, {key: "Control", path: "/Home/Control", component: Control})
        ])
    ])
}