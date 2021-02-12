import CardStory from './components/CardStory.js';
import { getStories } from './API.js';
const e = React.createElement;

export default function Home(props){
    const [stories, setStories] = React.useState([]);

    const uploadCard = (stories, nPlayers) => {
        const arryOfStories = [];
        stories.forEach((story) => {
            arryOfStories.push( e(CardStory, { key: story.id, id: story.id, img: story.img, title: story.title, nPlayers: nPlayers[story.id], url: `./?#/Home/Control/${story.id}` }) );
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
            e("h2", {key: "2", style: {marginBottom: "10px"}}, [ "Quale storia di merda vuoi seguire ?"])
        ]),
        e("div", {key: "3"}, [ stories.length > 0 ? stories : "There are no active stories" ] )   
    ])
}