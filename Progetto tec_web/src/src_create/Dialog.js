const e = React.createElement;
const {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, makeStyles} = window['MaterialUI']; //to load the component from the library

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function DialogComponent(props){

    const handleClose = () => {
        props.fun(false);
    };

    return(
        e("div", {key: getRandomInt(999999)}, [
            e(Dialog, {key: getRandomInt(999999), open: props.open, keepMounted: true, onClose: handleClose}, [
                e(DialogTitle, {key: getRandomInt(999999)}, "MESSAGGIO"),
                e(DialogContent, {key: getRandomInt(999999)}, [
                    e(DialogContentText, {key: getRandomInt(999999)}, props.textError)
                ]),
                e(DialogActions, {key: getRandomInt(999999)}, [
                    e(Button, {key: getRandomInt(999999), onClick: handleClose}, "OK")
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
        e("div", {key: getRandomInt(999999)}, [
            e(Dialog, {key: getRandomInt(999999), open: props.open, keepMounted: true, onClose: handleClose}, [
                e(DialogTitle, {key: getRandomInt(999999), className: classes.title}, "LEGGENDA"),
                e(DialogContent, {key: getRandomInt(999999)}, [
                    e(DialogContent, {key: getRandomInt(999999), dividers: true}, [
                        e(Typography, {key: getRandomInt(999999), className: classes.title}, "COME IL PLAYER GESTISTE LE RISPOSTE"),
                        e(Typography, {key: getRandomInt(999999), gutterBottom: true }, "Le risposte con un punteggio maggiore di 0 vengono considerate come giuste, al contrario verrano considerare risposte sbagliate. In questo modo ci possono essere pi\xf9 risposte corrette con un punteggio diverso in base alla risposta (stesso discorso per le risposte sbagliate)."),
                        e("br", {key: getRandomInt(999999)}),
                        e("br", {key: getRandomInt(999999)}),
                        e(Typography, {key: getRandomInt(999999), className: classes.title}, "Widget: Nessuno"),
                        e(Typography, {key: getRandomInt(999999), gutterBottom: true }, "Semplice attivit\xe0 di spiegazione. Non sono previste domande, quindi l'utente potr\xe0 proseguire normalmente una volta letto tutto il testo."),
                        e(Typography, {key: getRandomInt(999999), className: classes.title}, "Widget: Quattro opzioni"),
                        e(Typography, {key: getRandomInt(999999), gutterBottom: true }, "Quattro possibili risposte (stile \"Chi vuole essere milionario\")."),
                        e(Typography, {key: getRandomInt(999999), className: classes.title}, "Widget: Scelta multipla"),
                        e(Typography, {key: getRandomInt(999999), gutterBottom: true }, "Si possono inserire tutte le possibili risposte che si vuole."),
                        e(Typography, {key: getRandomInt(999999), className: classes.title}, "Widget: Vero o falso"),
                        e(Typography, {key: getRandomInt(999999), gutterBottom: true }, "Classico vero o falso."),
                        e(Typography, {key: getRandomInt(999999), className: classes.title}, "Widget: Input testuale automatico"),
                        e(Typography, {key: getRandomInt(999999), gutterBottom: true }, "Questo tipo di widget prevede l'inserimento di una riposta testuale. Quest'ultima viene controllata automaticamente dal player in quanto viene inserita gi\xe0 a livello di creazione storia. Adatta in caso di domande con risposta secca, ad esempio una parola o una data."),
                        e(Typography, {key: getRandomInt(999999), className: classes.title}, "Widget: Input testuale valutatore"),
                        e(Typography, {key: getRandomInt(999999), gutterBottom: true }, "Questo tipo di widget prevede l'inserimento di una riposta testuale. Quest'ultima viene controllata dal valutatore e non dal player, il quale gli potr\xe0 dare il punteggio che ritiene pi\xf9 opportuno. Adatta in caso di domande la cui risposta ha bisogno di una persona umana per essere valutata, come ad esempio un elenco di oggetti o un ragionamento fatto dall'utente."),
                        e(Typography, {key: getRandomInt(999999), className: classes.title}, "Widget: Range"),
                        e(Typography, {key: getRandomInt(999999), gutterBottom: true }, "Questa widget prevede una risposta numerica. Si inserisce il range entro il quale l'utente puo scelgiere il valore e anche quello entro il quale la risposta \xe8 corretta (fuori dal range scelto la risposta sar\xe0 sbagliata)."),
                        e(Typography, {key: getRandomInt(999999), className: classes.title}, "Widget: Foto"),
                        e(Typography, {key: getRandomInt(999999), gutterBottom: true }, "Questo widget prevede l'inserimento di una foto, alla quale poi verra assegnato un punteggio dal valutatore."),
                    ]),
                ]),
                e(DialogActions, {key: getRandomInt(999999)}, [ e(Button, {key: getRandomInt(999999), onClick: handleClose}, "OK")])
            ])
        ])
    )
}

function DialogComponent3(props){
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
            e(Dialog, {key: getRandomInt(999999), open: props.open, keepMounted: true, onClose: handleClose}, [
                e(DialogTitle, {key: getRandomInt(999999), className: classes.title}, "GESTIONE DELLE ATTIVIT\xc0"),
                e(DialogContent, {key: getRandomInt(999999)}, [
                    e(DialogContent, {key: getRandomInt(999999), dividers: true}, [
                        e(Typography, {key: getRandomInt(999999), className: classes.title}, "CREARE ATTIVIT\xc0"),
                        e(Typography, {key: getRandomInt(999999), gutterBottom: true }, "Per creare un'attivit\xe0 basta compilare i seguenti campi e salvare a fine sezione. Se si vuole azzerare tutti i campi \xe8 sufficiente entrare in un'altra sezione (ad esempio attivit\xe0 introduttiva) e tornare poi in questa sezione."),
                        e(Typography, {key: getRandomInt(999999), className: classes.title}, "COPIARE/DUPLICARE ATTIVIT\xc0"),
                        e(Typography, {key: getRandomInt(999999), gutterBottom: true }, "Per copiare una nuova attivit\xe0 \xe8 sufficiente selezionare un'attivit\xe0 gi\xe0 presente attraverso la select, inserire un nuovo titolo e salvare."),
                        e(Typography, {key: getRandomInt(999999), className: classes.title}, "MODIFICARE ATTIVIT\xc0"),
                        e(Typography, {key: getRandomInt(999999), gutterBottom: true }, "Per modificare un'attivit\xe0 gi\xe0 presente bisogna selezionarla attraverso la select. Attenzione: titolo e valore della select devono essere uguali, se dopo aver selezionato un'attivit\xe0 si cambia il titolo non verr\xe0 modificato l'attivit\xe0 scelta ma bens\xec verr\xe0 creata una nuova attivit\xe0."),
                        e(Typography, {key: getRandomInt(999999), className: classes.title}, "ELIMINARE ATTIVIT\xc0"),
                        e(Typography, {key: getRandomInt(999999), gutterBottom: true }, "Per eliminare un'attivit\xe0 bisogna selezionarla attraverso la select e premere il bottone a fianco. Attenzione: tutte le attivit\xe0 ad essa collegate continueranno ad essere collegate nello stesso modo ma non saranno pi\xf9 attive per la storia, occorre quindi sistemare gli accoppiamenti."),
                    ]),
                ]),
                e(DialogActions, {key: getRandomInt(999999)}, [ e(Button, {key: getRandomInt(999999), onClick: handleClose}, "OK")])
            ])
        ])
    )
}

export {
    DialogComponent,
    DialogComponent2,
    DialogComponent3
}
