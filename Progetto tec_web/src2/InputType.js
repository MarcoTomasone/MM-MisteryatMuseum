const e = React.createElement;

function inputType(props){

    let inputElement = [];
    const stylB = {
        width:`${(props.v[props.counter].styleInput.width - 70  )*screen.availWidth /202}px`,
        height:`${props.v[props.counter].styleInput.height  *screen.availHeight /437}px`,
        bottom:`${(props.v[props.counter].styleInput.bottom - 20) *screen.availHeight /437}px`,
        left:`${(props.v[props.counter].styleInput.left +40) *screen.availWidth /202}px`,
        position:'absolute'
        
    };
    const divActivitys = {      //style della div contenente le activity
        border:props.json.accessibility.activityStyle.divisor.border,
        overflow:"scroll",
        borderColor: props.json.accessibility.activityStyle.divisor.borderColor,
        left:`${props.json.accessibility.activityStyle.divisor.left* screen.availWidth /202}px`,
        width:`${props.json.accessibility.activityStyle.divisor.width *screen.availWidth /437}px`,
        height:`${props.json.accessibility.activityStyle.divisor.height * screen.availHeight /202}px`,
        top:`${props.json.accessibility.activityStyle.divisor.top * screen.availHeight /437}px`,
        position:'absolute',
      
    };
    if(props.v[props.counter].type_ === "text" ){        
    const styl = {
            width:`${props.v[props.counter].styleInput.width  *screen.availWidth /202}px`,
            height:`${props.v[props.counter].styleInput.height  *screen.availHeight /437}px`,
            bottom:`${props.v[props.counter].styleInput.bottom  *screen.availHeight /437}px`,
            left:`${props.v[props.counter].styleInput.left  *screen.availWidth /202}px`,
            position:"absolute"
    }

    inputElement.push(e("input",{
        type:"text",
        id:"textAnswer",
        key:"input",
        style:styl,
      }),
        e("button",{
        style:stylB,
        key:"confirm",
        id:"confirm",
        onClick: () => props.checkButton(props.counter,-1,props.json.accessibility.activities,props.v)},"Check"));


            let range = false;
    }else if(props.v[props.counter].type_ === "range" ) {
        
        const styleRange = {
            width:`${props.v[props.counter].styleInput.width  *screen.availWidth /202}px`,
            height:`${props.v[props.counter].styleInput.height  *screen.availHeight /437}px`,
            bottom:`${props.v[props.counter].styleInput.bottom  *screen.availHeight /437}px`,
            left:`${props.v[props.counter].styleInput.left  *screen.availWidth /202}px`,
            position:'absolute'
        }
        //document.getElementById("rangept").value =1  ;
       
        inputElement.push(e("input",{
                        type:"range", 
                        key:"rangebar",
                        min:props.v[props.counter].minRange,
                        max:props.v[props.counter].maxRange,
                        defaultValue:props.v[props.counter].minRange + (props.v[props.counter].maxRange - props.v[props.counter].minRange       )/2,
                        step:1,
                        //value:5,
                        id:"rangenpt",style:styleRange,
                        }),//e("p",null,valueR),                               
                        e("button",{
                            style:stylB,
                            key:"confirm",
                            id:"confirm",
                            onClick: () => props.checkButton(props.counter,-2,props.json.accessibility.activities,props.v)},"Check")
                );
        }else if(props.v[props.counter].type_ === "imgUpload" ){
            const stylein = {
                width:`${props.v[props.counter].styleInput.width  *screen.availWidth /202}px`,
                height:`${props.v[props.counter].styleInput.height  *screen.availHeight /437}px`,
                bottom:`${props.v[props.counter].styleInput.bottom  *screen.availHeight /437}px`,
                left:`${props.v[props.counter].styleInput.left  *screen.availWidth /202}px`,
                position:'absolute'
            }


            inputElement.push(e("input",{
                type:"file", 
                key:"fileUplodad",
                id:"flUpld",
                accept:"image/png, image/jpeg",
                style:stylein,
                capture:"camera",
                })//e("p",null,valueR),                               
                ,e("button",{
                    style:stylB,
                    key:"confirm",
                    id:"confirm",
                   /* onClick: () => props.checkButton(props.counter,-2,props.json.accessibility.activities,props.v)*/},"Check")
                );
    
        }



        return e("div",null, e("div", {key: "actDescription", style: divActivitys},
            e("p", {key:"textQuestion"}, props.domanda),
            e("div", {key:"inputElement"}, 
                inputElement,
            ),
            props.MediaProp),
        //     range ? e("p",null,document.getElementById("rangept").value : null),
        e("button", {key:"buttonNext",id: "nextButton",style:props.btnNext,onClick:props.inc}, "NEXT"));
   
   

}

export default inputType;