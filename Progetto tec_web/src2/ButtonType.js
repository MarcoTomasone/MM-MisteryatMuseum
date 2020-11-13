const e = React.createElement;

function ButtonType(props){
    const btnNext={ 	    //adesso sono settate parte delle proprieta di btnChat => da aggingere attributi al JSON
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

    }
   
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
    const buttProp = {
        backgroundColor:props.v[props.counter].btnStyle.bckgrndClr,
        width:`${props.v[props.counter].btnStyle.width  *screen.availWidth /202}px`,
        height:`${props.v[props.counter].btnStyle.height  *screen.availHeight /437}px`,
        marginLeft:`${props.v[props.counter].btnStyle.marginLeft *screen.availWidth /202}px`,
        marginRight:`${props.v[props.counter].btnStyle.marginRight  *screen.availHeight /437}px`,
        marginTop:`${props.v[props.counter].btnStyle.marginTop  *screen.availHeight /437}px`,
        borderRadius:`${props.v[props.counter].btnStyle.borderRadius}px`,
                        
       };
       
       const ListButtonAnswer = [];
        for (let i = 0; i < props.answer.length; i++) {      
            ListButtonAnswer.push(e("button", {
                style: buttProp,
                id:"btn"+i,
                alt:"bottone : "+props.answer[i], 
                onClick: () => props.checkButton(props.counter , i, props.json.accessibility.activities , props.v)
            }, props.answer[i]));
        }
        //Charge The help message
        const messageContainer = document.getElementById("help-message-container");
        const message = props.json.accessibility.activities[props.counter].help;
        const messageElement = document.createElement('div');
        messageElement.innerHTML = message;
        messageContainer.append(messageElement);
        
        return e("div",null,
                    e("div", {key: "actDescription", style: divActivity},
                    e("p", {style:props.textStyle}, props.domanda),
                    e("div", {
                        key: "buttonblock",
                        style: props.askNav }, [
                        ListButtonAnswer
                    ]),
                    props.MediaProp)
                    ,e("button", {key:"buttonNext",id: "nextButton1",style:btnNext,onClick:props.inc}, "NEXT")
                );

}

export default ButtonType;