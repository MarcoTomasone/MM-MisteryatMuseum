 const e = React.createElement;

const HashRouter  = ReactRouterDOM.HashRouter ;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;

function App2(){
   
    return e(React.Fragment, null, [
        e("header", {key: "headerHome", id: "headerHome"}, "Benvenuti in xxxxx"),
       
    ])

}

export default App2;




