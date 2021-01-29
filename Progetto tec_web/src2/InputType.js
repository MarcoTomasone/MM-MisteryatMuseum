import { sendData} from './dataHandler.js';
const {TextField, Slider, Button, makeStyles, IconButton, Icon} = window['MaterialUI']; //to load the component from the library

const e = React.createElement;
/**
 * function thath contains the properties of Input type
 *  - Text Answer with a specifically answer
 *  - Range 
 *  - File type allowed: { img/jpeg : img/ png}
 * @param {json:props.json, counter:counter, v : props.v, btnNext:btnNext, MediaProp : MediaProp, inc:inc} props 
 */
function inputType(props){

    let inputElement = [];

    const inputGroup = {
        border: "solid",
        borderColor: props.json.player.inputDiv.frameColor,
        position:'absolute',
        opacity:'80%',
        backgroundColor:props.json.player.inputDiv.backgroundColor,
        color:props.json.player.inputDiv.textColor,
        width:`${props.v[props.counter].widthInput  *screen.availWidth /202}px`,
        height:`${props.v[props.counter].heightInput  *screen.availHeight /437}px`,
        left:`${props.v[props.counter].leftInput *screen.availWidth /202}px`,
        right:`${props.v[props.counter].rightInput  *screen.availHeight /437}px`,
        top:`${props.v[props.counter].topInput  *screen.availHeight /437}px`,
        bottom:`${props.v[props.counter].buttonInput  *screen.availHeight /437}px`
    }

    if(props.v[props.counter].widgetType === "Input testuale automatico" || props.v[props.counter].widgetType === "Input testuale valutatore"){        
    const styl = {
            width:'100%',
            height:'100%',
            backgroundColor:props.json.player.inputDiv.backgroundColor,
            border:'solid',
            borderColor:props.json.player.inputDiv.frameColor,
            color:props.json.player.inputDiv.textColor
            //width:`${props.v[props.counter].widthInput  *screen.availWidth /202}px`,
            //height:`${props.v[props.counter].heightInput  *screen.availHeight /437}px`,
            //bottom:`${props.v[props.counter].bottomInput  *screen.availHeight /437}px`,
            //left:`${props.v[props.counter].leftInput - 10 *screen.availWidth /202}px`,
           // position:"absolute",
    }

    inputElement.push(e("textarea",{'aria-labelledby' : "activitIntro", id:"textAnswer", key:"input", style:styl}));

    }else if(props.v[props.counter].widgetType === "Range" ) {
        function rewriteLabel (){
            document.getElementById("rangeV").innerHTML = document.getElementById("rangenpt").value;
        }
        const defaultValue = eval(props.v[props.counter].rangeAnswer.possibleStart) + (eval(props.v[props.counter].rangeAnswer.possibleEnd) - eval(props.v[props.counter].rangeAnswer.possibleStart))/2 ;
        
        const styleRange = {
            width:`${props.v[props.counter].widthInput  *screen.availWidth /202}px`,
            //height:`${props.v[props.counter].heightInput  *screen.availHeight /437}px`,
            //bottom:`${props.v[props.counter].bottomInput  *screen.availHeight /437}px`,
            //left:`${props.v[props.counter].leftInput  *screen.availWidth /202}px`,
            //position:'absolute'
        }
        inputElement.push(e("p",{id:"rangeV",key:"rangeLabel",style:{color:'gray', fontSize:props.json.player.sizeFont*2}},defaultValue));
      
        inputElement.push(
                    e("input",{
                        'aria-describedby' : "activitIntro",
                        type:"range", 
                        key:"rangebar",
                        min:eval(props.v[props.counter].rangeAnswer.possibleStart),
                        max:eval(props.v[props.counter].rangeAnswer.possibleEnd),
                        defaultValue:defaultValue,
                        step:1,
                        id:"rangenpt",
                        style:styleRange,
                        onChange:()=>{rewriteLabel()}
                    }));
        } else if(props.v[props.counter].widgetType === "Foto" ){
           
            
                const [file, setFile] = React.useState(''); // storing the uploaded file    // storing the recived file from backend
                const [progress, setProgess] = React.useState(0); // progess bar
                const el = React.useRef(); // accesing input element
                
                const handleChange = (e) => {
                    setProgess(0)
                    const file = e.target.files[0]; // accesing file
                    setFile(file); // storing file
                }
                //send to server an image to evaluation
                const uploadFile = () => {
                    const formData = new FormData();        
                    formData.append('file', file); // appending file
                    axios.post('http://localhost:8000/uploadImg', formData).then(res => {
                            if(res.status == 200)   
                                props.socket.emit("send-humanEvaluation",{question: props.v[props.counter].question, answer: 'http://localhost/MM-MisteryatMuseum/Progetto%20tec_web/server/' + res.data.path, type : "image" , id : props.playerId, section : props.counter});       
                                props.inc('http://localhost/MM-MisteryatMuseum/Progetto%20tec_web/server/' + res.data.path);
                            }).catch(err => alert("Devi caricare un'immagine!"))}

            inputElement.push(
                e("input", {id: "background_color",type:'file',size:'large',style:{display:'none'}, onChange:  handleChange}),
                e("label", {htmlFor:"background_color",size:'large'}, [
                    e(IconButton,{component: "span",fontSize:'large', style:{color:'gray'}}, 
                        e(Icon, {children: "photo_camera",fontSize:'large'}),  
                    ),
                ]),)

                return  e("div", null,
                            e("div",{key: "inputElement", style : inputGroup },inputElement),
                            e("button",{role: "button", key: "buttonNext", id: "nextButton", style: props.btnNext, onClick: uploadFile }, "SUCCESSIVO")
                        );
                
        }

        return e("div",null, 
                    e("div", {key:"inputElement" , style:inputGroup}, inputElement),
                    e("button", {role: "button", key:"buttonNext",id: "nextButton",style:props.btnNext,onClick:props.inc}, "SUCCESSIVO")
                );
}

export default inputType;