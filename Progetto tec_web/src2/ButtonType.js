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
        backgroundColor:'white',
        textColor:'black',
        height:'50%',
        width:'50%'
    };

    const buttonGroup = {
        border: "solid",
        borderColor: "green",
        position:'absolute',
        width:`${props.v[props.counter].widthInput  *screen.availWidth /202}px`,
        height:`${props.v[props.counter].heightInput  *screen.availHeight /437}px`,
        marginLeft:`${props.v[props.counter].leftInput *screen.availWidth /202}px`,
        marginRight:`${props.v[props.counter].rightInput  *screen.availHeight /437}px`,
        marginTop:`${props.v[props.counter].topInput  *screen.availHeight /437}px`,
        marginBottom:`${props.v[props.counter].buttonInput  *screen.availHeight /437}px`
    }
       const buttSelect = {
        backgroundColor:'yellow',
        textColor:'white',
        height:'50%',
        width:'50%'                
       };
    
        const ListButtonAnswer = [];     //Array that contains every button
        if(props.v[props.counter].widgetType === "Vero o falso"){
            ListButtonAnswer.push(e("button", {
                key:"BtnTrue",
                style:(props.lastAnswer===1)? buttSelect:buttProp,
                id:"btnTrue",
                alt:"TRUE", 
                onClick: () =>props.checkButton(1)
            },"TRUE"));
            ListButtonAnswer.push(e("button", {
                key:"BtnFalse",
                style: (props.lastAnswer===0)? buttSelect:buttProp,
                id:"btnFalse",
                alt:"FALSE", 
                onClick: () =>props.checkButton(0)
            },"FALSE"));
        }else{
            //console.log(props.answer)
            for (let i = 0; i < props.answer.length; i++) {      
                    ListButtonAnswer.push(e("button", {
                        role: "button", 
                        key:"Btn"+ i,
                        style: (i != props.lastAnswer)? buttProp:buttSelect,
                        id:"btn"+ i,
                        alt:"bottone : "+props.answer[i].text, 
                        onClick: () => props.checkButton(i)
                    }, props.answer[i].text));
            }
        }
       
        return e("div",null,
                    //e("div", {key: "actDescription", style: divActivity},
                    //e("p", {style:props.textStyle,key:"textQuestion"}, props.domanda), props.MediaProp,
                    e("div", {
                        key: "buttonblock",
                        style:buttonGroup }, [
                        ListButtonAnswer
                    ]),
                    e("button", {role: "button", key:"buttonNext",id: "nextButton1",style:a,onClick:props.inc}, "SUCCESSIVO")
                );

}


export default ButtonType;