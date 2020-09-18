const e = React.createElement;
import ControlHome from "../src_control/ControlHome.js";

import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(React.createElement)

function HomeSelect(props){
    return e("a", null, "ciao")
}

function SelectHome(props){
    const [count, setCount] = React.useState(parseInt(props.count))
    return html`
    <div>
      <h1>Prova</h1>
      <button>Decrement</button>
      <button>Increment</button>
    </div>
  `
}

export default SelectHome;