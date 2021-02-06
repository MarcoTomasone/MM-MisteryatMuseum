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


    return e(React.Fragment, null, [
        e(HashRouter, null, [
            e(Route, {path: "/Create/login", component: () => e(CreateHomeLogin, {setUser: setUser})}),
            e(Route, {path: "/Create/select", component: () => e(CreateHomeSelect, {
                user: user,
                setUser: setUser,
                setStoryToModify: setStoryToModify,
                openErrorDialog: openErrorDialog,
                setOpenErrorDialog: setOpenErrorDialog,
                textErrorDialog: textErrorDialog,
                setTextErrorDialog: setTextErrorDialog 
            })}),
            e(Route, {path: "/Create/realize", component: () => e(CreateHomeRealize, {
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