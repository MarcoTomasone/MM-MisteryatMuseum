import { isEnter } from '../../../utils.js';
import {  addAnswer } from '../API.js';
const { TextField, Icon, IconButton } = MaterialUI;
const e = React.createElement;

export default function Help(props) {
    const answer = props.type == 'image' ? e("img", {src: props.answer, style: { maxHeight: "50%", maxWidth: "50%"}}) : props.answer;

    const onValued = () => {
        const points = document.getElementById("valuation" + props.id).value;
        if(!points)
            return;
        const player = props.player;
        const story = props.story;
        const array = props.arrayEvaluations[player];
        const tmp = _.cloneDeep(props.arrayEvaluations);
        array.forEach((item, index) => {
            if(item.props.id == props.id)
                tmp[player].splice(index, 1)
        })
        props.setArrayEvaluations(tmp);
        props.socket.emit('read-message', { type: "evaluation", id: props.id, player: props.player });
        (async () => {addAnswer(story, player, points, props.section)})();
    }
    
    return(
        e(React.Fragment, null, [
            e("div", {style: {backgroundColor: "#3f51b5", minHeight: 60, width: "80%", border: "1px solid grey"}}, [ e("b", null, `Section ${props.section}`), e("br"), e("b", null, `Question: `), props.question ]),
            e("div", {style: {height: "auto", width: "80%", border: "1px solid grey"}}, [ e("b", null, `Answer: `), answer ]),
            e(TextField, {onKeyDown: () => {isEnter(event)? onValued() : null}, type: "number", id: "valuation" + props.id, variant: "outlined", style: {width: "80%", marginBottom: 20}, InputProps: {endAdornment:
                e(IconButton, {onClick: onValued, key: "4", children: e(Icon, {children: "send"})}), style: {fontSize: "14pt"}}}
            )
        ])
    );
}