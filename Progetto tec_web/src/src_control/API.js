export async function getDataPlayer(story){
    const response = await axios.get('http://localhost:8000/status', { params: { story } });
    const dict = {};
    const players = response.data;
    players.forEach((player) => {
        const lastSection = player.sectionsArray.length - 1;
        dict[player.id] = {
            key: player.id, 
            id: player.id,
            name: player.name, 
            timer: player.sectionsArray[lastSection].timer,
            section: player.sectionsArray[lastSection].section, 
            points: player.sectionsArray[lastSection].points,
        };
    })
    return dict;
}

export async function getPlayers(story){
    const response = await axios.get('http://localhost:8000/players', { params: { story } })
    return response.data;
}

export async function getPDF(player, story){
    const response = await axios.get('http://localhost:8000/pdf', { params: { player, story } });
    const file = response.data;
    const blob = new Blob([file], { type: "application/pdf;charset=UTF-8" });
    saveAs(blob, `${player}.pdf`);
}

export async function getStories(){
    const response = await axios.get('http://localhost:8000/stories');
    return response.data;
}