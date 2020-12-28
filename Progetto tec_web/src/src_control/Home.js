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
                arryOfStories.push( e(CardStory, { key: element, url: `./?#/Home/Control/${element}`, title: element, nPlayers: nPlayers[element]}) );
            })
            setStories(arryOfStories);
            return arryOfStories;
        })
    }, []);

    return e(React.Fragment, {key: "control_home_root"}, [
        e("div", {key: 1}, [
            e("h2", {key: 2, style: {marginBottom: "10px"}}, [ "Quale storia vuoi seguire ?"])
        ]),
        e("input", {key: 3, id: "ID_evaluator", type: "text"}),
        e("input", {key: 4, type: "button"}),
        e("div", {key: 5}, stories)   
    ])
}