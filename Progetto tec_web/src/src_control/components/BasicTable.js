const e = React.createElement;
const { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } = MaterialUI;
import { getFinishedPlayers } from '../API.js';

const useStyles = makeStyles({
    table: {
        width: "80%",
        float: "left",
        margin: "5%"
    },
    cell: {
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
    }
});

export default function BasicTable(props) {
    const [myRows, setMyRows] = React.useState([]);
    const rows = [];
    const classes = useStyles();

    const createData = (position, player, name, points) => {
        return { position, player, name, points };
    }

    const sort = (players) => {
        const compare = (a, b) => {
            if(b.points < a.points){
                return -1;
            }
            else
                return 0;
        }
        players.sort(compare);
    }

    React.useEffect(() => {
        ///players = props.players;
        (async() => {const players = await getFinishedPlayers(props.story)
            let totalPoints = 0;
            players.sectionArray
            sort(players);
            players.forEach((player, index) => {
                rows.push(createData((index + 1) + '°', player.id, player.name, player.points));
            });
            getRows();
        })();
    }, []);

    function getRows() {
        const element = [];
        rows.forEach((row, index) => {
            let background = "white";
            if(index == 0)
                background = "#E5B519";
            else if(index == 1)
                background = "#D5D5D7";
            else if(index == 2)
                background = "#CD7F32";

            element.push(
                e(TableRow, {key: row.position, children: [
                    e(TableCell, {align: "center", className: classes.cell, component: "th", scope: "row", style: {backgroundColor: background}}, row.position),
                    e(TableCell, {align: "center", className: classes.cell, style: {backgroundColor: background}}, row.player),
                    e(TableCell, {align: "center", className: classes.cell, style: {backgroundColor: background}}, row.name),
                    e(TableCell, {align: "center", className: classes.cell, style: {backgroundColor: background}}, row.points),
                ]})
            )
        })
        setMyRows(element);
    }

    return (
        e(TableContainer, { className: classes.table, children: [
            e(Table, {style: {border: "1px solid black"}, children: [
                e(TableHead, {children: [
                    e(TableRow, {children: [
                        e(TableCell, {align: "center", className: classes.cell}, "Position"),
                        e(TableCell, {align: "center", className: classes.cell}, "Player"),
                        e(TableCell, {align: "center", className: classes.cell}, "Name"),
                        e(TableCell, {align: "center", className: classes.cell}, "Points"),
                    ]})
                ]}),
                e(TableBody, {children: [
                    myRows
                ]})
            ]})
        ]})
    );
}
