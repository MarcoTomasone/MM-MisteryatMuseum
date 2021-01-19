//get id from the Dialog and write it on the JSON FILE
export function getID(playerID, question){
    const player = {
        section : 0,
        question, 
        answer: "Nessuna Risposta",
        points: 0,
        timer : 0
    }
    axios.post(`http://localhost:8000/postJson`, {id: playerID, sectionArray: [player], story : "Story1"});
}
//get answer and question from the Dialog and write it on the JSON FILE
export function sendData(playerID, question, answer, section, points, timer){
    const player = {
        section,
        question,
        answer,
        points, 
        timer
    }
    axios.post(`http://localhost:8000/postJson`, {id: playerID, sectionArray: player, story : "Story1"});
}



