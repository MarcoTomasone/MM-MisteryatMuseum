const e = React.createElement;

function Activity(props) {
   
        const [counter,setCounter] = React.useState(0);
    
        function inc(){
            console.log(props.v);
         //   if(counter + 3 <= props.v.length){
          //      props.v.push(props.json.accessibility.activities[counter + 4 % props.json.accessibility.activities.length]);
          //  }

            if(counter  === props.v.length - 2){
              // console.log(props.json.accessibility.);
                props.v.push(props.json.accessibility.activities[props.json.accessibility.activities.length - 1]);
            }
            setCounter(counter+ 1);
            MediaProp = [];
                        
            if(props.v[counter].type_ === "button" && counter > 0){
                for(let i = 0; i < props.v[counter].answer.length; i++)
                    document.getElementById("btn"+i).style.backgroundColor="white";
            }    
            
        }
    
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
    
        const textStyle = {             //implementiamo uno stile di testo unico per tutte le Storie di un attivita'
                fontSize:"20px",
                textAlign:"center",
                fontFamily:"Helvetica"
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
         //  console.log(data.accessibility.player.thicknessFrame.substring(0, data.accessibility.player.thicknessFrame.length -2) );
    const btnChat={
        backgroundColor:data.accessibility.player.chatButton.backgroundColor,
        borderRadius:`${data.accessibility.player.chatButton.borderRadius}px`,
        textAlign:'center',
        width:`${data.accessibility.player.chatButton.width *screen.availWidth /437}px`,
        height:`${data.accessibility.player.chatButton.borderRadius * screen.availHeight /202}px`,
        top:`${data.accessibility.player.chatButton.top * screen.availHeight/437}px`,
        left:`${data.accessibility.player.chatButton.left * screen.availWidth /202}px`,
        //borderColor:data.accessibility.player.chatButton.borderColor,
        position:'absolute'
        /*textColor: ''+data.accessibility.player.chatButton.textColor+'',
        position:'relative' */
    };

    const btnHelp={
        backgroundColor:data.accessibility.player.helpButton.backgroundColor,
        //borderColor:data.accessibility.player.borderColor,
        borderRadius:`${data.accessibility.player.helpButton.borderRadius}px`,
        textAlign:'center',
        width:`${data.accessibility.player.helpButton.width *screen.availWidth /437}px`,
        height:`${data.accessibility.player.helpButton.borderRadius * screen.availHeight /202}px`,
        top:`${data.accessibility.player.helpButton.top * screen.availHeight /437}px`,
        left:`${data.accessibility.player.helpButton.left * screen.availWidth /202}px`,
        position:'absolute'
    };

    const navbar ={
        //padding:'5px',
       // height:'90%',
    };

        const div_a = {      //style della div contenente le activity
            border:data.accessibility.activityStyle.divisor.border,
            overflow:"scroll",
            borderColor: data.accessibility.activityStyle.divisor.borderColor,
            position:'absolute',
            background:  data.accessibility.player.background ,
        
            thicknessFrame:`${data.accessibility.player.weightFont}px`,
            topFrame:`${data.accessibility.player.topFrame}px`,
            weightFont:`${data.accessibility.player.weightFont}px`,
            widthFrame: `${data.accessibility.player.widthFrame}px`
            
        };

        const askNav = {
            border: "solid",
            borderColor: "red",
            marginTop:"20%",
        };

            
        let MediaProp = [];
        let mediaStyle;
    
        if(props.v[counter].media !== 0){
            mediaStyle = {
                width:`${props.v[counter].styleM.width  *screen.availWidth /202}px`,
                height:`${props.v[counter].styleM.height  *screen.availHeight /437}px`,
                bottom:`${props.v[counter].styleM.bottom  *screen.availWidth /437}px`,
                left:`${props.v[counter].styleM.left  *screen.availHeight /202}px`,
                position:'absolute'
            }
         MediaProp.push (e(props.v[counter].media,{style:mediaStyle,alt:props.v[counter].alternativeText,src:props.v[counter].source,controls:true,autoPlay:true}));

        }
    
        if (props.v[counter].type_ === "description" ){
            
           return e("div",null,
                        e("div", {key: "activitIntro",id:"activitIntro", style: divActivity},
                            props.v[counter].question,
                            MediaProp )
                   ,e("button", {key:"buttonNext",id: "nextButton1",style:btnNext,onClick:inc}, "NEXT"));
    
        } else {
    
           let domanda = props.v[counter].question;
           let answer = props.v[counter].answer;
    
    
    
            if(props.v[counter].type_ === "button") {
    
                const buttProp = {
                    width:props.v[counter].btnStyle.width,
                    height:props.v[counter].btnStyle.height,
                    marginLeft: props.v[counter].btnStyle.marginLeft,
                    marginRight:props.v[counter].btnStyle.marginRight
                };
    
                const ListButtonAnswer = [];
                for (let i = 0; i < answer.length; i++) {      
                    ListButtonAnswer.push(e("button", {
                        style: buttProp,
                        id:"btn"+i,
                        alt:"bottone 1: "+answer[i],
                        onClick: () => checkButton(counter , i, props.json.accessibility.activities , props.v)
                    }, answer[i]));
                }
    
                return e("div",null,
                            e("div", {key: "actDescription", style: divActivity},
                            e("p", {style:textStyle}, domanda),
                            e("div", {
                                key: "buttonblock",
                                style: askNav }, [
                                ListButtonAnswer
                            ]),
                            MediaProp)
                            ,e("button", {key:"buttonNext",id: "nextButton1",style:btnNext,onClick:inc}, "NEXT")
                        );
    
            }else {        
                
                return e("div",null,
                
                    e("div", {key: "actDescription", style: divActivity},
                        e("p", null, domanda),
                        e("div", null, [
                            e("input",{
                                type:"text",
                                id:"textAnswer",
                                onClick: () => checkButton(counter  , -1, props.json.accessibility.activities,props.v)
                            })
                        ]),
                        MediaProp),
                    e("button", {key:"buttonNext",id: "nextButton1",style:btnNext,onClick:inc}, "NEXT"));
    
            }
        }
    
    }
    


    function checkButton(counter , answer , json , v){
        if(!(counter === json.length -2) ){
        if(answer === -1){

            if(document.getElementById("textAnswer").value  ===v[counter].correct ){
                let appo = v[counter + 1];
                v[counter+1] = json[v[counter].correctAnswerGo];
                v.push(appo);

                console.log("TextInsert Correct");

            }else{
                let appo = v[counter + 1];
                v[counter+1] = json[v[counter].wrongAnswerGo];
                v.push(appo);

                console.log("TextInsert Wrong");
            }
            console.log(v);
        }else if(answer === v[counter].correct){

            console.log("Risposta Corretta");

            document.getElementById("btn"+answer).style.backgroundColor = "green";

            let appo = v[counter + 1];
            v[counter+1] = json[v[counter].correctAnswerGo];
            v.push(appo);

        }else{
            console.log("Risposta Errata");

           document.getElementById("btn"+answer).style.backgroundColor = "red";
            let appo = v[counter + 1];
            v[counter+1] = json[v[counter].wrongAnswerGo];
            v.push(appo);
        }
        }
    }

    export default Activity;