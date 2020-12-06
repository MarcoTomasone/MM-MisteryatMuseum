const e = React.createElement;
const { makeStyles, Paper, Grid, IconButton, Icon, Card, CardHeader, CardContent, CardActions } = MaterialUI;

/* ---------------------------------------------------------------------Style-------------------------------------------------------------------------------------- */
const useStyles_card = makeStyles((theme) => ({
    root: {
        width: "250px",
        maxHeight: "280px",
        float: "left",
        margin: "8px",
        textAlign: "center",
    },
    avatar: {
        backgroundColor: "red",
    },
  }));

const useStyles_grid = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
 }));
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------- */



function cardStory(props){
    const classes_card = useStyles_card();
    const classes_grid = useStyles_grid();

    return(
        e(Card, {className: classes_card.root, raised: true, children: [
            e("a", {href: props.url, style: {textDecoration: "none", border: 0}}, [
                e(CardHeader, {title: props.title}),
                e(CardContent, {id: props.id + "_grid", className: classes_grid.root, children: [
                    e("img", {src: "../../img/story.png", style: {maxWidth: "50%", maxHeight: "50%"}})
                ]}),
            ]),
            e(CardActions, {disableSpacing: true, children: [
                e(IconButton, {children: e(Icon, {children: "info", color: "primary"})}),
            ]}),
        ]})
    );
}

export default function Home(props){
    const [stories, setStories] = React.useState([]);    

    React.useEffect(() => {
        const data = axios.get('http://localhost:8000/stories').then((response) => {
            const arryOfStories = [];
            response.data.forEach((element) => {
                arryOfStories.push( e(cardStory, { url: `./?#/ControlHome/Control/${element}`, title: element }));
            })
            setStories(arryOfStories);
            return arryOfStories;
        })
    }, []);

    return e(React.Fragment, null, [
        e("div", null, [
            e("h2", {style: {marginBottom: "10px"}}, [ "Quale storia vuoi valutare ?"])
        ]),
        e("div", null, stories)   
    ])
}