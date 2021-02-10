const e = React.createElement;
const { makeStyles, Paper, Grid, IconButton, Icon, Card, CardHeader, CardContent, CardActions, Link } = MaterialUI;

export default function CardStory(props){
    const useStyles_card = makeStyles((theme) => ({
        root: {
            width: "250px",
            height: "180px",
            float: screen.width >= 800 ? "left" : "none",
            margin: "8px",
            textAlign: "center",
            backgroundImage: `url(http://localhost/MM-MisteryatMuseum/Progetto%20tec_web/server/upload/${props.img})`,
            backgroundSize: "250px 180px",
        },
    }));
    const classes_card = useStyles_card();

    return(
        e(Card, {key: props.id, className: classes_card.root, raised: true, children: [
            e(Link, {key: "1", href: props.url, color: "inherit", underline: "none", style: {border: 0}}, [
                e(CardHeader, {key: "cardHeader", style: {color: "white", backgroundColor: "rgba(0,0,0,0.4)"}, title: props.title}),
                e(CardActions, {style: {width: 200, marginRight: 25, marginLeft: 25}, key: "2", disableSpacing: true, children: [
                    e(Icon, {children: "person", color: "secondary"}),
                    e("p", {key: "p1", style: {fontSize: "16px", fontWeight: "bold", marginLeft: 10, color: "red"}}, "Active Players: " + props.nPlayers),
                ]}),
            ]),
        ]})
    );
}