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
    /*const btnNext={ 	    //adesso sono settate parte delle proprieta di btnChat => da aggingere attributi al JSON
        borderColor:props.json.accessibility.activityStyle.btnNext.borderColor,
        backgroundColor:props.json.accessibility.activityStyle.btnNext.backgroundColor,
        borderRadius:`${props.json.accessibility.activityStyle.btnNext.borderRadius}px`,
        //width:`${data.accessibility.player.chatButton.width *screen.availWidth /437}px`,
        width:"70%",
        height:`${props.json.accessibility.activityStyle.btnNext.borderRadius * screen.availHeight /202}px`,
        position:'absolute',
        bottom:`${props.json.accessibility.activityStyle.btnNext.bottom * screen.availHeight/437}px`,
        left:`${props.json.accessibility.activityStyle.btnNext.left* screen.availWidth /202}px`,
       textColor:props.json.accessibility.activityStyle.btnNext.textColor

    }*/
   
    const divActivity = {      //style della div contenente le activity
        border:props.json.accessibility.activityStyle.divisor.border,
        overflow:"scroll",
        borderColor: props.json.accessibility.activityStyle.divisor.borderColor,
        left:`${props.json.accessibility.activityStyle.divisor.left* screen.availWidth /202}px`,
        width:`${props.json.accessibility.activityStyle.divisor.width *screen.availWidth /437}px`,
        height:`${props.json.accessibility.activityStyle.divisor.height * screen.availHeight /202}px`,
        top:`${props.json.accessibility.activityStyle.divisor.top * screen.availHeight /437}px`,
        position:'absolute',
      
    };

    //style's prop of single button [but it 's the same forall]
    const buttProp = {
        backgroundColor:props.v[props.counter].btnStyle.bckgrndClr,
        width:`${props.v[props.counter].btnStyle.width  *screen.availWidth /202}px`,
        height:`${props.v[props.counter].btnStyle.height  *screen.availHeight /437}px`,
        marginLeft:`${props.v[props.counter].btnStyle.marginLeft *screen.availWidth /202}px`,
        marginRight:`${props.v[props.counter].btnStyle.marginRight  *screen.availHeight /437}px`,
        marginTop:`${props.v[props.counter].btnStyle.marginTop  *screen.availHeight /437}px`,
        borderRadius:`${props.v[props.counter].btnStyle.borderRadius}px`,
        marginBottom:`${props.v[props.counter].btnStyle.marginTop  *screen.availHeight /437}px`
    };

    const buttonGroup = {
        border: "solid",
        borderColor: "green",
        position:'absolute',
        marginTop:"67vh",
        left:`57px`,
        width:`273px`,
        height:`70px`,
        left:'50px',
        //top:`20px`,
        marginBottom:"50%"
    }
       const buttSelect = {
        backgroundColor:'yellow',
        width:`${props.v[props.counter].btnStyle.width  *screen.availWidth /202}px`,
        height:`${props.v[props.counter].btnStyle.height  *screen.availHeight /437}px`,
        marginLeft:`${props.v[props.counter].btnStyle.marginLeft *screen.availWidth /202}px`,
        marginRight:`${props.v[props.counter].btnStyle.marginRight  *screen.availHeight /437}px`,
        marginTop:`${props.v[props.counter].btnStyle.marginTop  *screen.availHeight /437}px`,
        borderRadius:`${props.v[props.counter].btnStyle.borderRadius}px`,
                        
       };
    
        const ListButtonAnswer = [];     //Array that contains every button
        if(props.v[props.counter].widgetType === "Vero Falso"){
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
            for (let i = 0; i < props.answer.length; i++) {      
                    ListButtonAnswer.push(e("button", {
                        key:"Btn"+ i,
                        style: (i != props.lastAnswer)? buttProp:buttSelect,
                        id:"btn"+ i,
                        alt:"bottone : "+props.answer[i], 
                        onClick: () => props.checkButton(i)
                    }, props.answer[i]));
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
                    e("button", {key:"buttonNext",id: "nextButton1",style:props.btnstyle,onClick:props.inc}, "NEXT")
                );

}


export default ButtonType;