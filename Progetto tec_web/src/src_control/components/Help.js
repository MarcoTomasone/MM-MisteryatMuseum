import { isEnter } from "../../../utils.js";
const { Box, TextField, Icon, IconButton } = MaterialUI;
const e = React.createElement;

export default function Help(props) {

    const onSend = () => {
        const texfield = document.getElementById("help_" + props.id);
        const answer = texfield.value;
        texfield.value = "";
        //something
        const tmp = _.cloneDeep(props.arrayHelps);
        const player = props.player;
        const array = props.arrayHelps[player];
        array.forEach((item, index) => {
            if(item.props.id == props.id)
                tmp[player].splice(index, 1)
        })
        props.setArrayHelps(tmp);
        props.socket.emit('help-to-player', { player: props.player, answer: answer, id: props.id});
    }
    
    return(
        e(React.Fragment, null, [
            e("div", {style: {backgroundColor: "#3f51b5", height: 70, width: "80%", border: "1px solid grey"}}, [ `Question: ${props.question}` ]),
            e(TextField, {onKeyDown: () => {isEnter(event)? onSend() : null}, id: "help_" + props.id, key: "3", variant: "outlined", style: {width: "80%", marginBottom: 20}, InputProps: {endAdornment:
                e(IconButton, {onClick: onSend, key: "4", children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}}
            )
        ])
    );
}