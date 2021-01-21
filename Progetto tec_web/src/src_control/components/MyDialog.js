import { getPlayers } from '../API.js';
import { getPDF } from '../API.js';
const e = React.createElement;
const { makeStyles, Icon, Avatar, List, ListItem, ListItemAvatar, ListItemText, DialogTitle, Dialog } = MaterialUI;
const useStyles = makeStyles({
    avatar: {
        backgroundColor: "red",
        color: "white",
    },
});

export const MyDialog = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [players, setPlayers] = React.useState([]);   

    React.useImperativeHandle(ref, () => ({
        handleOpen(){
            setOpen(true);
        }
	}));

    React.useEffect(() => {
        (async () => {
            const response = await getPlayers(props.story);
            setPlayers(response);
        })();
    }, []);

    const handleClose = (value) => {
        setOpen(false);
        getPDF(value, props.story);
    }

    const handleListItemClick = (value) => {
        handleClose(value);
    };

    return (
        e(Dialog, {key: "myDialog", onClose: handleClose, "aria-labelledby": "simple-dialog-title", open: open, children: [
            e(DialogTitle, {key: "dialogTitle", id: "simple-dialog-title"}, "Select Player"),
            e(List, {key: "list", children: [
                players.map((player) => (
                    e(ListItem, {key: player, button: true, onClick: () => { handleListItemClick(player) }, children: [
                        e(ListItemAvatar, null ,
                            e(Avatar, {key: "cardAvatar", className: classes.avatar, children: player.replace("player", "P")})
                        ),
                        e(ListItemText, {primary: player})
                    ]})
                )),
            ]})
        ]})
    );
});