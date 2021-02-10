const e = React.createElement;
const { makeStyles, Paper, Grid, IconButton, Icon, Card, CardHeader, CardContent, CardActions, Link } = MaterialUI;

/* ---------------------------------------------------------------------Style-------------------------------------------------------------------------------------- */
const useStyles_card = makeStyles((theme) => ({
    root: {
        width: "250px",
        height: "150px",
        float: screen.width >= 800 ? "left" : "none",
        margin: "8px",
        textAlign: "center",
        backgroundColor: "#3f51b5",

    },
  }));
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export default function CardStory(props){
    const classes_card = useStyles_card();

    return(
        e(Card, {key: props.id, className: classes_card.root, raised: true, children: [
            e(Link, {key: "1", href: props.url, color: "inherit", underline: "none", style: {border: 0}}, [
                e(CardHeader, {key: "cardHeader", style: {color: "white"}, title: props.title})
            ]),
            e(CardActions, {style: {width: 200, marginRight: 25, marginLeft: 25}, key: "2", disableSpacing: true, children: [
                e(Icon, {children: "person", color: "secondary"}),
                e("p", {key: "p1", style: {fontSize: "16px", fontWeight: "bold", marginLeft: 10}}, "Active Players: " + props.nPlayers),
            ]}),
        ]})
    );
}