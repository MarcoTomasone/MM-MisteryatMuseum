const e = React.createElement;

import CreateHomeLogin from "./Login.js"
import CreateHomeSelect from "./Select.js"
import CreateHomeRealize from "./Realize.js"

const HashRouter  = ReactRouterDOM.HashRouter ;
const Route = ReactRouterDOM.Route;

function CreatHome(){
    const [user, setUser] =  React.useState("");
    const [storyToModify, setStoryToModify] =  React.useState();
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const [textErrorDialog, setTextErrorDialog] = React.useState("");

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }


    return e(React.Fragment, {key: getRandomInt(999999)}, [
        e(HashRouter, {key: getRandomInt(999999)}, [
            e(Route, {key: getRandomInt(999999), path: "/Create/login", component: () => e(CreateHomeLogin, {key: getRandomInt(999999), setUser: setUser})}),
            e(Route, {key: getRandomInt(999999), path: "/Create/select", component: () => e(CreateHomeSelect, {
                key: getRandomInt(999999),
                user: user,
                setUser: setUser,
                setStoryToModify: setStoryToModify,
                openErrorDialog: openErrorDialog,
                setOpenErrorDialog: setOpenErrorDialog,
                textErrorDialog: textErrorDialog,
                setTextErrorDialog: setTextErrorDialog 
            })}),
            e(Route, {key: getRandomInt(999999), path: "/Create/realize", component: () => e(CreateHomeRealize, {
                key: getRandomInt(999999),
                user: user,
                setUser: setUser,
                storyToModify: storyToModify,
                openErrorDialog: openErrorDialog,
                setOpenErrorDialog: setOpenErrorDialog,
                textErrorDialog: textErrorDialog,
                setTextErrorDialog: setTextErrorDialog 
            })})
        ])
    ])
}

export default CreatHome;