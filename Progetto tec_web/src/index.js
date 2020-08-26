const e = React.createElement;
import App from './App.js'

ReactDOM.render(
    e(
        React.StrictMode, 
        {key: "app1s"}, 
        e(App, {key: "app"})
    ),
    document.getElementById('root')
);

