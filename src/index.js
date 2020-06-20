import React from 'react';//This enables JSX
import ReactDOM from 'react-dom'


const App = () => {
    return (
        <div id='app'>
            <h1>The Great Linkerator</h1>
            <p>lorem ipsum</p>
        </div>    
    )
}

ReactDOM.render(
<App />,
document.getElementById('app')
);