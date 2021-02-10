/**
 * Function using on App2.js
 * @param getButtonChatProperty     ActivityList counter data
 * @param getButtonHelpProperty     ""
 * @param getScoreProperty          data
 * @param getActivityIMG            data backgroundImg
 * @param getActivityNoBackground   data
 */

export function getButtonChatProperty(activityList,counter,data){

 const tmp = { 
    display:(activityList[counter - 1] === data.lastActivity)? 'None' : 'block',   
    border:'solid',
    color: data.player.chatButton.textColor,
    borderColor:data.player.chatButton.frameColor,
    backgroundColor:data. player.chatButton.backgroundColor,
    borderRadius:`${data.player.chatButton.borderRadius}px`,
    frameColor:data.player.chatButton.frameColor,
    fontSize:`1.2em`,
    fontFamily:data.player.fontFamily,
    textAlign:'center',
    width:`${data.player.chatButton.width *window.innerWidth /202}px`,
    height:`${data.player.chatButton.height* window.innerHeight /437}px`,
    top:`${data.player.chatButton.top * window.innerHeight/437}px`,
    left:`${data.player.chatButton.left * window.innerWidth /202}px`,
    position:'absolute',
};

    return tmp;
}


export function getButtonHelpProperty(activityList,counter,data){

    const tmp = {
        display:(activityList[counter - 1] === data.lastActivity)? 'None' : 'block',   
        border:'solid',
        fontSize:`1.2em`,
        borderColor:data.player.helpButton.frameColor,
        fontFamily:data.player.fontFamily,
        color:data.player.helpButton.backgroundColor,
        borderRadius:`${data.player.helpButton.borderRadius}px`,
        frameColor:data.player.helpButton.frameColor,
        color:data.player.helpButton.textColor,
        backgroundColor:data.player.helpButton.backgroundColor,
        textAlign:'center',
        width:`${data.player.helpButton.width *window.innerWidth /202}px`,
        height:`${data.player.helpButton.height* window.innerHeight /437}px`,
        top:`${data.player.helpButton.top * window.innerHeight/437}px`,
        left:`${data.player.helpButton.left * window.innerWidth /202}px`,
        //borderColor:data.player.chatButton.borderColor,
        position:'absolute'
};       
    return tmp;

}

export function getScoreProperty(data){

const tmp = {
        fontSize:`1.2em`,
        fontFamily:data.player.fontFamily,
        position:'absolute',
        textAlign: "center",
        color:data.player.scoreDiv.textColor,
        backgroundColor:data.player.scoreDiv.backgroundColor,
        border:'solid',
        borderColor:data.player.scoreDiv.frameColor,
        borderRadius:data.player.scoreDiv.borderRadius+'px',
        height:`${data.player.scoreDiv.height * window.innerHeight/437}px`,
        width:`${data.player.scoreDiv.width * window.innerWidth/202}px`,
        top:`${data.player.scoreDiv.top * window.innerHeight/437}px`,
        left:`${data.player.scoreDiv.left * window.innerWidth/202}px`
    };

    return tmp;
}
 
export function getActivityIMG(data,backgroundImg){

    const tmp = {    
            backgroundImage: 'url('+backgroundImg+')',
            backgroundPositionTop:`${data.player.image.top* window.innerHeight/437}px`,
            //backgroundPositionWidth:`${data.player.image.width* window.innerWidth/202}px`,
            backgroundSize:` ${data.player.image.width* window.innerWidth/202}px ${data.player.image.height* window.innerHeight/437}px`,
            backgroundLeft:`${data.player.image.left* window.innerHeight/437}px`,
            color :data.player.textColor,
            fontSize:data.player.sizeFont,
            fontFamily:data.player.fontFamily,
            //thicknessFrame:`${data.player.weightFont}px`,
            topFrame:`${data.player.topFrame * window.innerHeight/437}vh`,
            frameColor : data.player.frameColor,
            leftFrame:`${data.player.leftFrame* window.innerHeight/202}vh`,
            widthFrame: `${data.player.widthFrame * window.innerWidth/202}vh`,
            weightFrame:`${data.player.weightFrame* window.innerHeight/437}vh`,
            weightFont:`${data.player.weightFont}px`,
            textAlign:'center'
    }
    return tmp;
}

export function getActivityNoBackground(data){
    const tmp = {
            background: data.player.background,
            topFrame:`${data.player.topFrame* window.innerHeight/437}vh`,
            leftFrame:`${data.player.leftFrame* window.innerWidth/202}vh`,
            widthFrame: `${data.player.widthFrame* window.innerHeight/202}vh`,
            weightFont:`${data.player.weightFont}px`,
            textAlign:'center'
        
    }

    return tmp;
}

/**
 * @param getButtonNextProperty dinamicActivities, counter, data
*  @param getDivBorder          ""                      
 */
export function getButtonNextProperty(dinamicActivities,counter,data){
    const tmp = {
        display:(dinamicActivities[counter - 1] === data.lastActivity)? 'None' : 'block',
        fontSize:`1.2em`,
        border:'solid',
        fontFamily:data.player.fontFamily,
        backgroundColor: data.player.nextButton.backgroundColor ,
        borderRadius:`${data.player.nextButton.borderRadius}px`,
        borderColor:data.player.nextButton.frameColor,
        width:`${data.player.nextButton.width *window.innerWidth /202}px`,
        height:`${data.player.nextButton.height * window.innerHeight /437}px`,
        top:`${data.player.nextButton.top  * window.innerHeight/437}px`,
        left:`${data.player.nextButton.left* window.innerWidth /202}px`,
        color:data.player.nextButton.textColor,
        position:'absolute',
    };
    return tmp;
}

export function getDivBorder(dinamicActivities,counter,data){
    const tmp = {
            color:data.player.textColor,
            textAlign:'center',
            border:'solid',
            borderRadius:data.player.borderRadiusFrame+'px',
            fontFamily: data.player.fontFamily,
            borderColor:data.player.frameColor,
            background:(data.player.textBackgroundColorActived)? data.player.textBackgroundColor : 'repeat', 
            height : `${dinamicActivities[counter].heightFrame* window.innerHeight / 437}px`,
            left:`${data.player.leftFrame* window.innerWidth /202}px`,
            width:`${data.player.widthFrame* window.innerWidth /202}px`,
            top:`${data.player.topFrame* window.innerHeight /437}px`,
            fontSize:data.player.sizeFont* 2,
            overflowX:'hidden',
            overflowY:'scroll',
    }
    return tmp;
}

export function getTextStyle(data){
    const tmp = {
        fontSize:data.player.sizeFont,
        textAlign:"center",
        fontFamily:data.player.fontFamily
    }
    return tmp;
}

/**
 * Using on InputType.js
 * @param getInputGroupProperty data 
 * @param getInputGroupProperty dinamicActivities (props.v) counter data(props.json)
 */
export function getTextAreaProperty(data){
    const tmp = {
            width:'100%',
            height:'100%',
            backgroundColor:data.player.inputDiv.backgroundColor,
            border:'solid',
            borderColor:data.player.inputDiv.frameColor,
            color:data.player.inputDiv.textColor
    }

    return tmp;
}

export function getInputGroupProperty(dinamicActivities,counter,data){
    const tmp = {
            border: "solid",
            borderColor: data.player.inputDiv.frameColor,
            position:'absolute',
            opacity:'80%',
            color:data.player.inputDiv.textColor,
            width:`${dinamicActivities[counter].widthInput  *window.innerWidth /202}px`,
            height:`${dinamicActivities[counter].heightInput  *window.innerHeight /437}px`,
            left:`${dinamicActivities[counter].leftInput *window.innerWidth /202}px`,
            right:`${dinamicActivities[counter].rightInput  *window.innerWidth /437}px`,
            top:`${dinamicActivities[counter].topInput  *window.innerHeight /437}px`,
            bottom:`${dinamicActivities[counter].buttonInput  *window.innerHeight /437}px`
    };
    return tmp;
}

/**
 * ButtonType.js
 */

 export function getButtonProperty(dinamicActivities,counter,data){
     const tmp = {
            backgroundColor:data.player.inputDiv.backgroundColor,
            color:data.player.inputDiv.textColor,
            height:(dinamicActivities[counter].widgetType === "Vero o falso")? '100%':'50%',
            width:'50%',
            border:'solid',
            borderRadius:data.player.inputDiv.borderRadius,
            borderColor:data.player.inputDiv.frameColor,

     };

     return tmp;
 }

 export function getButtonGroupProperty(dinamicActivities,counter,data){
     const tmp = {
            border: "solid",
            borderColor: data.player.inputDiv.frameColor,
            position:'absolute',
            width:`${dinamicActivities[counter].widthInput  *window.innerWidth /202}px`,
            height:`${dinamicActivities[counter].heightInput  *window.innerHeight /437}px`,
            left:`${dinamicActivities[counter].leftInput *window.innerWidth /202}px`,
            right:`${dinamicActivities[counter].rightInput  *window.innerHeight /437}px`,
            top:`${dinamicActivities[counter].topInput *window.innerHeight /437}px`,
            bottom:`${dinamicActivities[counter].buttonInput  *window.innerHeight /437}px`
     }
     return tmp;
 }

 export function getButtonSelectProperty(dinamicActivities,counter,data){
     const tmp = {
            height:(dinamicActivities[counter].widgetType === "Vero o falso")? '100%':'50%',
            color:'black',
            borderRadius:props.json.player.inputDiv.borderRadius,
            backgroundColor:'yellow',
            width:'50%',
            border:'solid',
            borderColor:data.player.inputDiv.frameColor            
     };
     return tmp;
 }