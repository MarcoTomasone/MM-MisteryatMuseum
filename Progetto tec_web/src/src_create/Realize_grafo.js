const e = React.createElement;
const {Button, Icon, Radio, Select, MenuItem, Switch, TextField, InputLabel, makeStyles, FormControl, FormControlLabel, RadioGroup, withStyles, Slider, Typography} = window['MaterialUI']; //to load the component from the library

const useStyles = makeStyles((theme) => ({
    input: {
        width: 233,
        [`& fieldset`]: {
            borderRadius: 15,
        }
    }
}));



function Realize_grafo(props){
    const classes = useStyles();
    const [layout, setLayout] = React.useState("tree-right")
    const [connection, setConnection] = React.useState("arc")
    const [shape, setShape] = React.useState("circle")
    ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];

    React.useEffect(() => {
        props.story

        let chartData = [{
          parent: '',
          name: 'The World',
        },
        {
          parent: 'theworld',
          name: 'Asia',
        },
        {
          parent: 'theworld',
          name: 'Africa',
        },
        {
          parent: 'theworld',
          name: 'America',
        },
        {
          parent: 'theworld',
          name: 'Europe',
        },
        {
          parent: 'america',
          name: 'California',
        },
        {
          parent: 'america',
          name: 'New York',
        },
        {
          parent: 'america',
          name: 'Texas',
          cls: "bgreen"
        },
        {
          parent: 'california',
          name: 'Pollo',
          cls: "bred"
        }
      ];

      let chartConfig = {
        type: 'tree',
        options: {
          link: {
            aspect: 'arc'
          },
          'node[cls-bgreen]': {
            type: 'circle',
            size: 15,
            backgroundColor: 'green',
            label: {
              fontSize: 15,
              fontWeight: 'bold'
            }
          },
          'node[cls-bred]': {
            type: 'circle',
            size: 15,
            backgroundColor: 'red',
            label: {
              fontSize: 15,
              fontWeight: 'bold'
            }
          },
        },
        
        series: chartData
      };

      zingchart.render({
        id: 'myChart',
        data: chartConfig,
        height: '95%',
        width: '100%',
        output: 'canvas'
      });
    })

    return(e("div", {id:"myChart", className:"chart--container"}))

}

export default Realize_grafo;
