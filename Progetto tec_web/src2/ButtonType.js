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
        const buttProp = {
            backgroundColor:props.json.player.inputDiv.backgroundColor,
            color:props.json.player.inputDiv.textColor,
            height:(props.v[props.counter].widgetType === "Vero o falso")? '100%':'50%',
            width:'50%',
            border:'solid',
            //borderRadius:props.json.player.inputDiv.borderRadius,
            borderColor:props.json.player.inputDiv.frameColor
        };

        const buttonGroup = {
            border: "solid",
            borderColor: props.json.player.inputDiv.frameColor,
            position:'absolute',
            width:`${props.v[props.counter].widthInput  *window.innerWidth /202}px`,
            height:`${props.v[props.counter].heightInput  *window.innerHeight /437}px`,
            left:`${props.v[props.counter].leftInput *window.innerWidth /202}px`,
            right:`${props.v[props.counter].rightInput  *window.innerHeight /437}px`,
            top:`${props.v[props.counter].topInput *window.innerHeight /437}px`,
            bottom:`${props.v[props.counter].buttonInput  *window.innerHeight /437}px`
        }
        const buttSelect = { //When select a Button
            height:(props.v[props.counter].widgetType === "Vero o falso")? '100%':'50%',
            color:'black',
            //borderRadius:props.json.player.inputDiv.borderRadius,
            backgroundColor:'yellow',
            width:'50%',
            border:'solid',
            borderColor:props.json.player.inputDiv.frameColor            
        };
    
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
                                    {key:'answer'+ props.v[props.counter].multipleAnswers[i].text,
                                        id:'option'+i,
                                        value:i,
                                        alt:props.v[props.counter].multipleAnswers[i].text
                                    },
                                    props.v[props.counter].multipleAnswers[i].text));
            }
    
            ListButtonAnswer.push(e("select",{
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