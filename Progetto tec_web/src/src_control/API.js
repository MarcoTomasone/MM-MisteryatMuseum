
export async function getDataPlayer(story){
    const data = await axios.get('http://localhost:8000/status', { params: { story } })
        .then((response) => {
            const dict = {};
            response.data.forEach((element) => {
                const lastSection = element.sectionsArray.length - 1;
                    dict[element.id] = {
                        key: element.id, 
                        id: element.id,
                        name: element.name, 
                        timer: element.sectionsArray[lastSection].timer,
                        section: element.sectionsArray[lastSection].section, 
                        points: element.sectionsArray[lastSection].points,
                    };
            })
            return dict;
        }).catch((error) => console.log(error));
    return data;
}

export async function getPlayers(story){
    const response = await axios.get('http://localhost:8000/players', { params: { story } })
    return response.data
}

export async function getPDF(player, story){
    const data = await axios.get('http://localhost:8000/pdf', { params: { player, story } });
        /*.then((response) => {

        })*/
    return data;
}