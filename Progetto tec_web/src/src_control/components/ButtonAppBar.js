const {makeStyles,IconButton, Icon, Grid, Button, Toolbar, Typography, AppBar} = MaterialUI;
const e = React.createElement;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

		
	
	
	return (
		e("div", {className: classes.root}, [
        	e(AppBar, {position: "static", children:
				e(Toolbar, {className: classes.toolbar, children: [
					e(Grid, {container: true, spacing: "2", children: [
						e(Grid, {item: true, xs: "6", children: e(IconButton, {edge: "start", className: classes.menuButton, color: "inherit", children: [e(Icon, {children: "menu", color: "default"})]})}),
						e(Grid, {item: true, xs: "6", children: e(Typography, {variant: "h6", className: classes.title}, ["News"])}),
					]})
				]})
			})
		])
	);
}
