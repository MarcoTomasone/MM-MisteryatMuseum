import CardStory from './components/CardStory.js';
import { getStories } from './API.js';
const e = React.createElement;

export default function Home(props){
    const [stories, setStories] = React.useState([]);

    const uploadCard = (stories, nPlayers) => {
        const arryOfStories = [];
        stories.forEach((story) => {
            arryOfStories.push( e(CardStory, { key: story, url: `./?#/Home/Control/${story}`, title: story, nPlayers: nPlayers[story]}) );
        })
        setStories(arryOfStories);
    };
 
    React.useEffect(() => {
        (async () => {
            const {stories, nPlayers} = await getStories();
            uploadCard(stories, nPlayers);
        })();
    }, []);

    return e(React.Fragment, {key: "control_home_root"}, [
        e("div", {key: "1"}, [
            e("h2", {key: "2", style: {marginBottom: "10px"}}, [ "Quale storia vuoi seguire ?"])
        ]),
        e("input", {key: "3", id: "ID_evaluator", type: "text"}),
        e("input", {key: "4", type: "button"}),
        e("div", {key: "5"}, stories)   
    ])
}