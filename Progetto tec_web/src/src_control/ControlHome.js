const e = React.createElement;

function Card(props){
    return(
        e("div",{style: {width: "100px", height: "150px", border: "3px solid black", float: "left", margin: "5px"}},[
            e("div", {id: "header_card", style: {"font-size": "13px", "border-bottom": "1px solid black", height: "25%"}},"Nome/Id: "),
            e("div", {id: "body_card", style: {"font-size": "13px", "border-bottom": "1px solid black", height: "25%"}}, "Sezione: "),
            e("div", {id: "body_card", style: {"font-size": "13px", "border-bottom": "1px solid black", height: "25%"}}, "Punteggio: "),
            e("div", {id: "footer_card"},[
                e("input",{type: "button", value: "Chat", style: {"font-size": "13px", "margin-left": "24%", "margin-top": "10%"}}, )
            ])
        ])
    )
}

function controlHome(props){
    var arr = [];

    /*fetch(`https://api.github.com/search/repositories?q=user:its-hmny&sort=updated`)
        .then(response => response.json())
        .then(data => { 
            for(let i=0 ; i < data.total_count.lenght; i++)
                arr.push( e(Card, {key: data.items[i].id}) );
                
        }).catch((error) => console.log(error));
        */

       for(let i=0 ; i < 30; i++)
            arr.push(e(Card,null));

    return e(React.Fragment, null, [
        e("div",null, arr)
         ]); 

   
}

export default controlHome;
