const e = React.createElement;

function Card(props){
    return(
        e("div",{id: props.id, className: "control_home"},[
            e("div",{id: "description_card", className: "left_div"},[
                e("div", {className: "div_card"}, "Name/Id:"), //props.id
                e("div", {className: "div_card"}, "Section:"), //props.section
                e("div", {className: "div_card"}, "Points:"), //props.points
                e("div", {id: "footer_card"},[
                    e("input",{type: "button", value: "Chat", style: {"font-size": "13px", "margin-left": "24%", "margin-top": "5%"}})
                ])
            ]),
            e("div", {id: "led_card", className: "right_div"}, [
                e("p",{className: "led_text"}, "Help"),
                e("span", {id: "led_help"}),

                e("p",{className: "led_text"}, ["Human",e("br"),"Evaluation"]),
                e("span", {id: "led_valutation"})
            ])
        ])
    )
}


function controlHome(props){
    var arr = [];
   
    /*
    axios.get(`https://api.github.com/search/repositories?q=user:its-hmny&sort=updated`)
        .then((response) => {
            response.data.forEach((element) => {
                arr.push(e(Card, {
                    key: element.id, 
                    id: element.id, 
                    section: element.section, 
                    points: element.points,
                    humanE: element.humanE,
                    chat: element.chat,
                    other: response.data
                }))
            })

            return arr;
            })
            .then((response) => {
                response.data.forEach((element) => {
                    if (element.help == true) document.getElementByClass("element.id").document.getElementById("led_help").classList.add("need_help");
                    if (element.humanE == true) document.getElementByClass("element.id").document.getElementById("led_chat").classList.add("need_help");
            .catch((error) => console.log(error));
    */

   for(let i=0 ; i < 30; i++)
    arr.push(e(Card,null));

    return e(React.Fragment, null, [
        e("div",null, arr)
         ]); 
}

export default controlHome;
