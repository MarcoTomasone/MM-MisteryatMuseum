import { sendData} from './dataHandler.js';

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
        borderColor: "green",
        position:'absolute',
        width:`${props.v[props.counter].widthInput  *screen.availWidth /202}px`,
        height:`${props.v[props.counter].heightInput  *screen.availHeight /437}px`,
        marginLeft:`${props.v[props.counter].leftInput *screen.availWidth /202}px`,
        marginRight:`${props.v[props.counter].rightInput  *screen.availHeight /437}px`,
        marginTop:`${props.v[props.counter].topInput  *screen.availHeight /437}px`,
        marginBottom:`${props.v[props.counter].buttonInput  *screen.availHeight /437}px`
    }

    if(props.v[props.counter].widgetType === "text" || props.v[props.counter].widgetType === "humanText"){        
    const styl = {
            width:`${props.v[props.counter].widthInput  *screen.availWidth /202}px`,
            height:`${props.v[props.counter].heightInput  *screen.availHeight /437}px`,
            marginBottom:`${props.v[props.counter].bottomInput  *screen.availHeight /437}px`,
            marginLeft:`${props.v[props.counter].leftInput  *screen.availWidth /202}px`,
            position:"absolute"
    }

    inputElement.push(e("input",{
                                'aria-describedby' : "activitIntro",
                                type:"text",
                                id:"textAnswer",
                                key:"input",
                                style:styl,
                            }));

            let range = false;
    }else if(props.v[props.counter].widgetType === "range" ) {
        function rewriteLabel (){
            document.getElementById("rangeV").innerHTML = document.getElementById("rangenpt").value;
        }
        const defaultValue = props.v[props.counter].minRange + (props.v[props.counter].maxRange - props.v[props.counter].minRange)/2;
        const styleRange = {
            width:`${props.v[props.counter].widthInput  *screen.availWidth /202}px`,
            height:`${props.v[props.counter].heightInput  *screen.availHeight /437}px`,
            marginBottom:`${props.v[props.counter].bottomInput  *screen.availHeight /437}px`,
            marginLeft:`${props.v[props.counter].leftInput  *screen.availWidth /202}px`,
            position:'absolute'
        }
        inputElement.push(e("p",{id:"rangeV",key:"rangeLabel"},defaultValue));
        inputElement.push(e("input",{
                                'aria-describedby' : "activitIntro",
                                type:"range", 
                                key:"rangebar",
                                min:props.v[props.counter].minRange,
                                max:props.v[props.counter].maxRange,
                                defaultValue:defaultValue,
                                step:1,
                                id:"rangenpt",
                                style:styleRange,
                                onChange:()=>{rewriteLabel()}
                                }));
        } else if(props.v[props.counter].widgetType === "imgUpload" ){
           
            
                const [file, setFile] = React.useState(''); // storing the uploaded file    // storing the recived file from backend
                const [progress, setProgess] = React.useState(0); // progess bar
                const el = React.useRef(); // accesing input element
                
                const handleChange = (e) => {
                    setProgess(0)
                    const file = e.target.files[0]; // accesing file
                    console.log(file);
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
           
            const stylein = {
                width:`${props.v[props.counter].widthInput  *screen.availWidth /202}px`,
                height:`${props.v[props.counter].heightInput  *screen.availHeight /437}px`,
                marginBottom:`${props.v[props.counter].bottomInput  *screen.availHeight /437}px`,
                marginLeft:`${props.v[props.counter].leftInput  *screen.availWidth /202}px`,
                position:'absolute'
            }

            inputElement.push(e("input",{
                'aria-describedby' : "activitIntro",
                type:"file", 
                key:"fileUplodad",
                id:"flUpld",
                accept:"image/png, image/jpeg",
                style:stylein,
                capture:"camera",
                onChange:handleChange
                }));
             
                return  e("div", null,
                            e("div",{key: "inputElement", style : inputGroup },inputElement),
                            e("button",{role: "button", key: "buttonNext", id: "nextButton", style: props.btnNext, onClick: uploadFile }, "NEXT")
                        );
                
        }

        return e("div",null, 
                    e("div", {key:"inputElement" , style:inputGroup}, inputElement),
                    //     range ? e("p",null,document.getElementById("rangept").value : null),
                    e("button", {role: "button", key:"buttonNext",id: "nextButton",style:props.btnNext,onClick:props.inc}, "NEXT")
                );
}

export default inputType;