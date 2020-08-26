const e = React.createElement;
import CreateHomeLogin from "./CreateHomeLogin.js"
import CreateHomeSelect from "./CreateHomeSelect.js"
import CreateHomeRealize from "./CreateHomeRealize.js"

const HashRouter  = ReactRouterDOM.HashRouter ;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;

function CreateHome(){
    const [user, setUser] = React.useState("");
    const [story, setStory] = React.useState("");

    return e(React.Fragment, null, [
        e(HashRouter, null, [
            e(Route, {path: "/Create/select", component: () => e(CreateHomeSelect, {userTTTT: user})}),
            e(Route, {path: "/Create/login", component: () => e(CreateHomeLogin, {userUpdate: setUser, storyUpdate: setStory})}),
            e(Route, {path: "/Create/realize", component: () => e(CreateHomeRealize)})
        ])
    ])
}

export default CreateHome;