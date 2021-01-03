//get id from the Dialog and write it on the JSON FILE
export function getID(playerID){
    const player = {
        id : "pippo",
        sectionsArray : []
    }
    axios.post(`http://localhost:8000/postJson`, {player});
}
//get answer and question from the Dialog and write it on the JSON FILE
export function sendData(question, answer, section){
    const player = {
        section,
        question,
        answer
    }
    axios.post(`http://localhost:8000/postJson`, {id: "pippo", SectionArray: player});
}

