import { getPDF } from '../API.js';
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
export default function VerticalBar() {
	const classes = useStyles();
	let checked = false;

	const handleMinimized = () =>{
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

	return (
		e(Paper, {className: classes.root, children: [
			e(MenuList, {children: [
				e(MenuItem, {children: [
					e(ListItemIcon, {onClick: () => {getPDF("Card0")}, className: classes.distance, children:  e(Icon, {style: { color: "black"}, className: classes.li, children: "download"})}),
				]}),
				e(MenuItem, {children: [
					e(ListItemIcon, {onClick: handleMinimized, className: classes.distance, children:  e(SvgIcon, {style: { color: "black"}, className: classes.li, xmlns: "http://www.w3.org/2000/svg", children: [ e("path", {fill: "none", d: "M0 0h24v24H0z"}), e("path", {d: "M22 3l-5 6 3 3h-8V4l3 3 6-5 1 1zM3 22l6-5 3 3v-8H4l3 3-5 6 1 1z"})]})}),
				]}),
				e(MenuItem, {children: [
					e(ListItemIcon, {onClick: () => {alert("Ranking of players")}, className: classes.distance, children:  e(SvgIcon, {style: { color: "black"}, className: classes.li, xmlns: "http://www.w3.org/2000/svg", children: [ e("path", {fill: "none", d: "M0 0h24v24H0z"}), e("path", {d: "M17 10V2H7v9l5 3-1 2H7l3 3-1 3 3-2 3 2-1-3 3-3h-4l-1-2 5-3v-1zm-4 2l-1 1-1-1V3h2v9z"})]})}),
				]}),
			]})
		]})
	);

	
};
