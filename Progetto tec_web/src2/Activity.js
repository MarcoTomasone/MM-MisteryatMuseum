const e = React.createElement;

function Activity(props) {
   
        const [counter,setCounter] = React.useState(0);
    
        function inc(){
            
            if(counter + 1 <= props.v.length){
                props.v.push(props.json.accessibility.activities[counter + 1 % props.json.accessibility.activities.length]);
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
         MediaProp.push (e(props.v[counter].media,{style:mediaStyle,alt:props.v[counter].alternativeText,src:props.v[counter].source,autoPlay:true}));
           
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
    
        if(answer === -1){
    
            if(document.getElementById("textAnswer").value  ===v[counter].correct ){
                v.push(json[counter + 1 % json.length]);
                console.log("TextInsert Correct");
                
            }else{
                v.push(json[counter + 1 % json.length]);
                console.log("TextInsert Wrong");
            }
            console.log(v);
        }else if(answer === v[counter].correct){
    
            console.log("Risposta Corretta");

            document.getElementById("btn"+answer).style.backgroundColor = "green";
            v.push(json[v[counter].correctAnswerGo]);
           }else{
            console.log("Risposta Errata");

           document.getElementById("btn"+answer).style.backgroundColor = "red";
           v.push(json[v[counter].wrongAnswerGo]);
       }
    }

    export default Activity;