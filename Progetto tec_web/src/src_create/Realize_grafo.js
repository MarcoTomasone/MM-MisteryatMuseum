const e = React.createElement;

function Realize_grafo(props){

  React.useEffect(() => {
    var arrayEdge = []
    props.story.activities.forEach((element, index) => {
      if (element.firstActivity){
        arrayEdge.push({from: "AttivitaIntroduttiva", to: element.title, color: "#000000", font: {color: "#fff"}})
      }
      element.correctAnswerGo.forEach((element2) =>{
        arrayEdge.push({from: element.title, to: element2, color: "green"})
      })
      element.wrongAnswerGo.forEach((element2) =>{
        arrayEdge.push({from: element.title, to: element2, color: "red"})
      })
    })

    var arrayNode = [
      {id: "AttivitaIntroduttiva", label: "AttivitaIntroduttiva", color: "#000000", font: {color: "#fff"}},
      {id: "AttivitaConclusiva", label: "AttivitaConclusiva", color: "#000000", font: {color: "#fff"}}
    ]
    props.story.activities.forEach((element, index) => {
      if (element.correctAnswerGo.length == 0 && element.wrongAnswerGo.length == 0){
        arrayEdge.push({from: element.title, to: "AttivitaConclusiva", color: "#000000", font: {color: "#fff"}})
      }
      else if (element.correctAnswerGo.length == 0){
        arrayEdge.push({from: element.title, to: "AttivitaConclusiva", color: "green", font: {color: "#fff"}})
      }
      else if (element.wrongAnswerGo.length == 0){
        arrayEdge.push({from: element.title, to: "AttivitaConclusiva", color: "red", font: {color: "#fff"}})
      }
      arrayNode.push({id: element.title, label: element.title, title: element.activityText})
    })
    var nodes = new vis.DataSet(arrayNode);

    // create an array with edges
    var edges = new vis.DataSet(arrayEdge);

    // create a network
    var container = document.getElementById('mynetwork');
    var data = { nodes: nodes, edges: edges};
    var options = {
      edges:{
        arrows: 'to',
      },
      nodes:{
        color: {
          border: '#000000',
          background: '#b4b4b4',
          highlight: {
            border: '#ff8c00',
            background: '#ffff00'
          }
        },
        font: {
          color: '#000000',
          size: 14,
          face: 'Roboto',
          align: 'center',
        },      
      }
    }
    var network = new vis.Network(container, data, options);
    network.setOptions(options);
  })

  return(e("div", {id:"mynetwork"}))
}

export default Realize_grafo;
