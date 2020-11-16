const e = React.createElement;
const {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} = window['MaterialUI']; //to load the component from the library


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

export default DialogComponent;