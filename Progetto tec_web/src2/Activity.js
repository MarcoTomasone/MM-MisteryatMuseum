
const e = React.createElement;


const HashRouter  = ReactRouterDOM.HashRouter ;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;

class Activity extends React.Component {
render()
    {
        return
        e("p", null, "Hello World");
        /*
        *
       e("div", {key:"player",style:player}, [
           e("nav",{style:navbar},
            e("button", {id: "chatButton1",style:btnChat}, "CHAT"),
            e("button", {id: "helpButton1",style:btnHelp},"HELP"),

        e("div", {key:"description",style:descr},exampleText),


    ]);
*/
    }
}