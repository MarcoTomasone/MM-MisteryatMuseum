const e = React.createElement;

import CreateHomeLogin from "./CreateHomeLogin.js"
import CreateHomeSelect from "./CreateHomeSelect.js"
import CreateHomeRealize from "./CreateHomeRealize.js"

const HashRouter  = ReactRouterDOM.HashRouter ;
const Route = ReactRouterDOM.Route;

function CreateHome(){
    const [user, setUser] =  React.useState("");

    return e(React.Fragment, null, [
        e(HashRouter, null, [
            e(Route, {path: "/Create/login", component: () => e(CreateHomeLogin, {setUser: setUser})}),
            e(Route, {path: "/Create/select", component: () => e(CreateHomeSelect, {user: user, setUser: setUser})}),
            e(Route, {path: "/Create/realize", component: () => e(CreateHomeRealize, {user: user, setUser: setUser})})
        ])
    ])
}

export default CreateHome;
