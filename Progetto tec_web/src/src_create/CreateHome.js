const e = React.createElement;

import CreateHomeLogin from "./CreateHomeLogin.js"
import CreateHomeSelect from "./CreateHomeSelect.js"
import CreateHomeRealize from "./CreateHomeRealize.js"

const HashRouter  = ReactRouterDOM.HashRouter ;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;

function CreateHome(){
    const [user, setUser] =  React.useState("");

    return e(React.Fragment, null, [
        e(HashRouter, null, [
            e(Route, {path: "/Create/login", component: () => e(CreateHomeLogin, {userUpdate: setUser})}),
            e(Route, {path: "/Create/select", component: () => e(CreateHomeSelect, {userUpdate: setUser, user: user})}),
            e(Route, {path: "/Create/realize", component: () => e(CreateHomeRealize, {userUpdate: setUser, user: user})})
        ])
    ])
}

export default CreateHome;
