import Control from './Control.js';
import Home from './Home.js';

const e = React.createElement;
const HashRouter  = ReactRouterDOM.HashRouter ;
const Route = ReactRouterDOM.Route;

export default function AppControl(props){

    return e(React.Fragment, null, [
        e(HashRouter, {key: "hashRouterApp"}, [
            e(Route, {exact: true, path: "/Home/", component: Home}),
            e(Route, {path: "/Home/Control", component: Control})
        ])
    ])
}