import {getButtonProperty,getButtonGroupProperty,getButtonSelectProperty} from './style.js';
const e = React.createElement;

/**
 * Button Type 
 * contains definition of Button properties 
 * on answer type:
 *  - Multiple Answer
 *  - True/False Answer 
 * @param {btnstyle : btnStyle,answer:answer, textStyle:textStyle,lastAnswer:lastAnswer, domanda:domanda, json:props.json, counter:counter, v : props.v, checkButton : checkButton , btnNext:btnNext, MediaProp : MediaProp, inc:inc}} props 
 */

function ButtonType(props){
        const a = props.btnNext;

        //style's prop of single button [but it 's the same forall]
        const buttProp = getButtonProperty(props.v,props.counter,props.json);
        const buttonGroup = getButtonGroupProperty(props.v,props.counter,props.json);
        const buttSelect = getButtonSelectProperty(props.v,props.counter,props.json);
    
        const ListButtonAnswer = [];     //Array that contains every button

        if(props.v[props.counter].widgetType === "Vero o falso"){

            ListButtonAnswer.push(
                e("button", {
                    role:'button',
                    key:"BtnTrue",
                    style:(props.lastAnswer===1)? buttSelect:buttProp,
                    id:"btnTrue",
                    alt:"Vero", 
                    onClick: () => props.checkButton(1,props.v,props.counter,props.setLastAnswer,props.json)
                },"VERO"));

                ListButtonAnswer.push(
                e("button", {
                    key:"BtnFalse",
                    role:'button',
                    style: (props.lastAnswer===0)? buttSelect:buttProp,
                    id:"btnFalse",
                    alt:"Falso", 
                    onClick: () => props.checkButton(0,props.v,props.counter,props.setLastAnswer,props.json)
                },"FALSO"));
            

        }else if (props.v[props.counter].widgetType === "Quattro opzioni"){
            
            for (let i = 0; i < props.answer.length; i++) {      
                ListButtonAnswer.push(
                e("button", {
                    role: "button", 
                    key:"Btn"+ i,
                    style: (i != props.lastAnswer)? buttProp:buttSelect,
                    id:"btn"+ i,
                    alt:"bottone : "+props.answer[i].text, 
                    onClick: () => props.checkButton(i,props.v,props.counter,props.setLastAnswer,props.json)
                }, props.answer[i].text));
            }

        }else if(props.v[props.counter].widgetType === "Scelta multipla" ){
            let optionVector = [];
        
            for(let i = 0 ; i< props.v[props.counter].multipleAnswers.length ; i++){
                optionVector.push(e("option",
                                    {
                                        key:'answer'+ props.v[props.counter].multipleAnswers[i].text,
                                        id:'option'+i,
                                        value:i,
                                        alt:props.v[props.counter].multipleAnswers[i].text
                                    },
                                    props.v[props.counter].multipleAnswers[i].text));
            }
    
            ListButtonAnswer.push(
                e("select",{
                    id:"multipleAnswerId",
                    style:{width:'80%',height:'30%',marginTop:'20px'},
                    onChange:()=>props.checkButton(document.getElementById("multipleAnswerId").value,props.v,props.counter,props.setLastAnswer,props.json)},
                    optionVector));
            }       


        return e("div",null,
                    e("div", {
                        key: "buttonblock",
                        style:buttonGroup }, 
                        ListButtonAnswer
                    ),
                    e("button", {role: "button", key:"buttonNext",id: "nextButton1",style:a,onClick:props.inc}, "SUCCESSIVO")
                );

}


export default ButtonType;