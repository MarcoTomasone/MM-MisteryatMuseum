const e = React.createElement;
const {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, makeStyles} = window['MaterialUI']; //to load the component from the library


function DialogComponent(props){

    const handleClose = () => {
        props.fun(false);
    };

    return(
        e("div", null, [
            e(Dialog, {open: props.open, keepMounted: true, onClose: handleClose}, [
                e(DialogTitle, null, "ERRORE"),
                e(DialogContent, null, [
                    e(DialogContentText, null, props.textError)
                ]),
                e(DialogActions, null, [
                    e(Button, {onClick: handleClose}, "OK")
                ])
            ])
        ])
    )
}



function DialogComponent2(props){
    const useStyles = makeStyles((theme) => ({
        title: {
            fontWeight: 800
        }
    }));
    const classes = useStyles();


    const handleClose = () => {
        props.fun(false);
    };

    return(
        e("div", null, [
            e(Dialog, {open: props.open, keepMounted: true, onClose: handleClose}, [
                e(DialogTitle, {className: classes.title}, "LEGGENDA"),
                e(DialogContent, null, [
                    e(DialogContent, { dividers: true}, [
                        e(Typography, {className: classes.title}, "Quattro opzioni"),
                        e(Typography, { gutterBottom: true }, "Descrizione 1.............................."),

                        e(Typography, {className: classes.title}, "Scelta multipla"),
                        e(Typography, { gutterBottom: true }, "Descrizione 2.............................."),

                        e(Typography, {className: classes.title}, "Vero o falso"),
                        e(Typography, { gutterBottom: true }, "Descrizione 3.............................."),

                        e(Typography, {className: classes.title}, "Input testuale"),
                        e(Typography, { gutterBottom: true }, "Descrizione 4.............................."),

                        e(Typography, {className: classes.title}, "Range"),
                        e(Typography, { gutterBottom: true }, "Descrizione 5.............................."),

                        e(Typography, {className: classes.title}, "Foto"),
                        e(Typography, { gutterBottom: true }, "Descrizione 6.............................."),
                    ]),
                ]),
                e(DialogActions, null, [
                    e(Button, {onClick: handleClose}, "OK")
                ])
            ])
        ])
    )
}

export {
    DialogComponent,
    DialogComponent2,
}
