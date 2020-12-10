import CardStory from './components/CardStory.js';
const e = React.createElement;

export default function Home(props){
    const [stories, setStories] = React.useState([]);
 
    React.useEffect(() => {
        const data = axios.get('http://localhost:8000/stories').then((response) => {
            const arryOfStories = [];
            const stories = response.data.stories;
            const nPlayers = response.data.nPlayers;
            stories.forEach((element) => {
                arryOfStories.push( e(CardStory, { url: `./?#/Home/Control/${element}`, title: element, nPlayers: nPlayers[element]}) );
            })
            setStories(arryOfStories);
            return arryOfStories;
        })
    }, []);

    return e(React.Fragment, null, [
        e("div", null, [
            e("h2", {style: {marginBottom: "10px"}}, [ "Quale storia vuoi seguire ?"])
        ]),
        e("input", {id: "ID_evaluator", type: "text"}),
        e("input", {type: "button"}),
        e("div", null, stories)   
    ])
}