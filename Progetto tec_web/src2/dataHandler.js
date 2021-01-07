//get id from the Dialog and write it on the JSON FILE
export function getID(playerID){
    
    axios.post(`http://localhost:8000/postJson`, {id: playerID, story : "Story1"});
}
//get answer and question from the Dialog and write it on the JSON FILE
export function sendData(playerID, question, answer, section){
    const player = {
        section,
        question,
        answer
    }
    axios.post(`http://localhost:8000/postJson`, {id: playerID, sectionArray: player, story : "Story1"});
}

