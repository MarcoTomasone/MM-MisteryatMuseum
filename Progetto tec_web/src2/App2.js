const e = React.createElement;


const HashRouter  = ReactRouterDOM.HashRouter ;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;

function App2() {

      function readJSON(file) {
        let request = new XMLHttpRequest();
        request.open('GET', file, false);
        request.send(null);
        if (request.status == 200)
            return request.responseText;
    }

    const temp = readJSON('./Document.json');
    const data = JSON.parse(temp);




   const exampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  /*   return e(React.Fragment, null, [
        e("header", {id:"mainText"} , "Titolo / Genere"),[
            e("div",{key:"intro",className:"introduction"},exampleText),
            e("nav",{key:"answer"},[
                    e("Button",{key:"btnChat"},"Help"),
                    e("Button",{key:"btnNext"},"Next")])
            ]
        ]);
*/

    const player= {
        background:''+'#'+data.accessibility.player.background+'',
        borderRadiusFrame:''+data.accessibility.player.borderRadiusFrame+'',
        leftFrame:''+data.accessibility.player.leftFrame+'',
        sizeFont:''+data.accessibility.player.sizeFont+'',
        textColor:''+'#'+data.accessibility.player.textColor+'',
        thicknessFrame:''+data.accessibility.player.thicknessFrame+'',
        topFrame:''+data.accessibility.player.topFrame+'',
        weightFont:''+data.accessibility.player.weightFont+'',
        widthFrame:''+data.accessibility.player.widthFrame+''

    };

    const btnChat={
        backgroundColor:''+data.accessibility.player.chatButton.backgroundColor+'',
        borderColor:''+data.accessibility.player.chatButton.borderColor+'',
        borderRadius:''+data.accessibility.player.chatButton.borderRadius+'',
        height:''+data.accessibility.player.chatButton.height+'',
        left:''+data.accessibility.player.chatButton.left+'',
        textColor: ''+data.accessibility.player.chatButton.textColor+'',
        top:''+data.accessibility.player.chatButton.top+'',
        width:''+data.accessibility.player.chatButton.width+''
    };

    const btnHelp={
        backgroundColor:''+data.accessibility.player.helpButton.backgroundColor+'',
        borderColor:''+data.accessibility.player.helpButton.borderColor+'',
        borderRadius:''+data.accessibility.player.helpButton.borderRadius+'',
        height:''+data.accessibility.player.helpButton.height+'',
        left:''+data.accessibility.player.helpButton.left+'',
        textColor: ''+data.accessibility.player.helpButton.textColor+'',
        top:''+data.accessibility.player.helpButton.top+'',
        width:''+data.accessibility.player.helpButton.width+''
    };

    const descr={
        colorFrame:''+data.accessibility.player.colorFrame+'',
        fontFamily:''+data.accessibility.player.fontFamily+''
    }

    return e(React.Fragment, null, [
        e("div", {key:"player",id:"player",style:player}, [
            e("button", {id: "chatButton",style:btnChat}, "CHAT"),
            e("button", {id: "helpButton",style:btnHelp}, "HELP"),
            e("div", {key:"description",style:descr},exampleText)
        ])
    ]);

}


export default App2;




