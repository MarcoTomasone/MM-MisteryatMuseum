const e = React.createElement;
const { makeStyles, Paper, Grid, IconButton, Icon, Card, CardHeader, CardContent, CardActions, Link } = MaterialUI;

/* ---------------------------------------------------------------------Style-------------------------------------------------------------------------------------- */
const useStyles_card = makeStyles((theme) => ({
    root: {
        width: "250px",
        maxHeight: "280px",
        float: "left",
        margin: "8px",
        textAlign: "center",
        backgroundColor: "#41C49B"

    },
    image :{
        maxWidth: "50%",
        maxHeight: "50%"
    }
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

export default function CardStory(props){
    const classes_card = useStyles_card();
    const classes_grid = useStyles_grid();

    return(
        e(Card, {className: classes_card.root, raised: true, children: [
            e(Link, {href: props.url, color: "inherit", underline: "none", style: {border: 0}}, [
                e(CardHeader, {title: props.title}),
                e(CardContent, {id: props.id + "_grid", className: classes_grid.root, children: [
                    e("img", {className: classes_card.image ,src: "../../img/story.png"})
                ]}),
            ]),
            e(CardActions, {disableSpacing: true, children: [
                e(IconButton, {children: e(Icon, {children: "info", color: "secondary"})}),
                e("p", {style: {fontSize: "16px", marginLeft: "35px"}}, "Active players: " + props.nPlayers)
            ]}),
        ]})
    );
}