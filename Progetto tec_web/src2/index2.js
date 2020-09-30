const e = React.createElement;
import App from './App2.js'

ReactDOM.render(
    e(
        React.StrictMode, 
        {key: "app1s"}, 
        e(App, {key: "app2"})
    ),
    document.getElementById('root2')
);

