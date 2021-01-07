import { MyDialog } from './MyDialog.js';
const {makeStyles, MenuList, Paper, ListItemIcon, MenuItem, Icon, Checkbox, SvgIcon} = MaterialUI;
const e = React.createElement;


//----------------------------------------------------------------Style-------------------------------------------------------------------
const useStyles = makeStyles({
  root: {
	width: 70,
	height: '100%',
	backgroundColor: 'lightGrey',
	float: 'right',
	textAlign: 'center'
  },
  li: {
	marginLeft: '7px',
  },
  distance: {
	height: 80,
  }
});
//------------------------------------------------------------------------------------------------------------------------------------------
export default function VerticalBar (props) {
	const classes = useStyles();
	let checked = false;
	const dialogRef = React.useRef();
	const story = window.location.href.replace('http://localhost/MM-MisteryAtMuseum/Progetto%20tec_web/?#/Home/Control/', '');

	const handleMinimized = () => {
		checked = !checked;
		if(checked == true){
			for(let i = 0; i < 10; i++){
				let card = document.getElementById("Card"+i);
				let grid = document.getElementById("Card"+i+"_grid");
				let data_time = document.getElementsByClassName("MuiCardHeader-content")[i];
				let avatar = document.getElementsByClassName("MuiCardHeader-root")[i];
				let icons = document.getElementsByClassName("MuiCardActions-root")[i];

				card.classList.add("card_minimized");
				grid.classList.add("display_minimized");
				data_time.classList.add("display_minimized");
				avatar.classList.add("recenter_avatar");
				icons.style.padding = "0px";
				icons.classList.add("recenter_icon");
			}
		}
		else{
			for(let i = 0; i < 10; i++){
				let card_min = document.getElementById("Card"+i);
				let grid_min = document.getElementById("Card"+i+"_grid");
				let data_time = document.getElementsByClassName("MuiCardHeader-content")[i];
				let avatar = document.getElementsByClassName("MuiCardHeader-root")[i];
				let icons = document.getElementsByClassName("MuiCardActions-root")[i];

				if(card_min && grid_min && data_time && avatar && icons){
					card_min.classList.remove("card_minimized");
					grid_min.classList.remove("display_minimized");
					data_time.classList.remove("display_minimized");
					avatar.classList.remove("recenter_avatar");
					icons.classList.remove("recenter_icon");
					icons.style.padding = "8px";
				}
			}
		}           
	}

	const handleDownload = () => {
		dialogRef.current.handleOpen();
	}

	return (
		e(React.Fragment, null, [
			e(MyDialog, {key: "dialog", story: story, ref: dialogRef}),
			e(Paper, {key: "paper", className: classes.root, children: [
				e(MenuList, {key: "menu", children: [
					e(MenuItem, {disabled: props.value, key: "1", children: [
						e(ListItemIcon, {onClick: handleDownload, className: classes.distance, children:  e(Icon, {style: { color: "black"}, className: classes.li, children: "download"})}),
					]}),
					e(MenuItem, {disabled: props.value, key: "2", children: [
						e(ListItemIcon, {onClick: handleMinimized, className: classes.distance, children:  e(SvgIcon, {style: { color: "black"}, className: classes.li, xmlns: "http://www.w3.org/2000/svg", children: [ e("path", {key: 1, fill: "none", d: "M0 0h24v24H0z"}), e("path", {key: 2, d: "M22 3l-5 6 3 3h-8V4l3 3 6-5 1 1zM3 22l6-5 3 3v-8H4l3 3-5 6 1 1z"})]})}),
					]}),
					e(MenuItem, {key: "3", children: [
						e(ListItemIcon, {onClick: () => props.setValue(!props.value), className: classes.distance, children:  e(SvgIcon, {style: { color: "black"}, className: classes.li, xmlns: "http://www.w3.org/2000/svg", children: [ e("path", {key: 1, fill: "none", d: "M0 0h24v24H0z"}), e("path", {key: 2, d: "M17 10V2H7v9l5 3-1 2H7l3 3-1 3 3-2 3 2-1-3 3-3h-4l-1-2 5-3v-1zm-4 2l-1 1-1-1V3h2v9z"})]})}),
					]}),
				]})
			]})
		])
	);
};
