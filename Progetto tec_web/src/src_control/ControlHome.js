import Control from './Control.js';
import Home from './Home.js';

const e = React.createElement;
const HashRouter  = ReactRouterDOM.HashRouter ;
const Route = ReactRouterDOM.Route;

export default function ControlHome(props){

    return e(React.Fragment, null, [
        e(HashRouter, {key: "hashRouterApp"}, [
            e(Route, {exact: true, path: "/ControlHome/", component: Home}),
            e(Route, {path: "/ControlHome/Control", component: Control})
        ])
    ])
}