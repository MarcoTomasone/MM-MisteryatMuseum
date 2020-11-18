//get id from the Dialog and write it on the JSON FILE
export function getID(playerID){
    const player = {
        id : playerID
    }
    axios.post(`http://localhost:8000/postJson/`, player);
}
