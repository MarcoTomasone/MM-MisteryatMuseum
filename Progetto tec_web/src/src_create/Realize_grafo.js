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


function son(string){
  var res = string.replace(/à/gi, "a");
  res = res.replace(/è/gi, "e");
  res = res.replace(/é/gi, "e");
  res = res.replace(/ì/gi, "i");
  res = res.replace(/ò/gi, "o");
  res = res.replace(/ù/gi, "u");
  return res
}

function father(string){
  var res = son(string)
  res = res.replace(/\s/g, '')
  res = res.toLowerCase()
  return res
}


function Realize_grafo(props){
    const classes = useStyles();
    const [graph, setGraph] = React.useState([{parent: '', name: 'Attivita introduttiva', cls: "bgrey"}])
    var count = 0
    ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];

    React.useEffect(() => {
      var bool = false
      props.story.activities.forEach(element => {
        if (element.firstActivity == true) {
          graph.push({parent: 'attivitaintroduttiva', name: son(element.title), cls: "bgrey"})
          bool = true
        }
      });
      if (bool == false ) {
        graph.push({parent: 'attivitaintroduttiva', name: `Attivita conclusiva${count}`, cls: "bgrey"})
        count = count + 1
      }

      props.story.activities.forEach(element => {
        var title = element.title
        if (element.correctAnswerGo.length == 0 && element.wrongAnswerGo.length == 0 && (element.firstActivity == true || element.activityIsUsed)){
          graph.push({parent: father(title), name: `Attivita conclusiva${count}`, cls: "bgrey"})
          count = count + 1
        } else {
          element.correctAnswerGo.forEach(element => {
            graph.push({parent: father(title), name: son(element), cls: "bgreen"})
          })
          element.wrongAnswerGo.forEach(element => {
            graph.push({parent: father(title), name: son(element), cls: "bred"})
          })
        }
      });

    let chartConfig = {
      type: 'tree',
      options: {
        link: {
          aspect: 'arc'
        },
        'node[cls-bgreen]': {
          type: 'circle',
          size: 8,
          backgroundColor: 'green',
          label: {
            fontSize: 10,
            fontWeight: 'bold'
          }
        },
        'node[cls-bred]': {
          type: 'circle',
          size: 8,
          backgroundColor: 'red',
          label: {
            fontSize: 10,
            fontWeight: 'bold'
          }
        },
        'node[cls-bgrey]': {
          type: 'circle',
          size: 8,
          backgroundColor: 'grey',
          label: {
            fontSize: 10,
            fontWeight: 'bold'
          }
        },
      },
      series: graph
    };

    zingchart.render({
      id: 'myChart',
      data: chartConfig,
      height: '95%',
      width: '100%',
      output: 'canvas'
    });
    console.log(graph)
  }, [])

  return(e("div", {id:"myChart", className:"chart--container"}))
}

export default Realize_grafo;
