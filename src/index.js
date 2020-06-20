import React from 'react';//This enables JSX
import ReactDOM from 'react-dom'


const App = () => {
    return (
        <div id = "App">
            <h1>The Great Linkerator</h1>
            <p>lorem ipsum</p>
        </div>
    )
}

// const app = document.querySelector('#app');

ReactDOM.render(
    <App></App>,
    document.getElementById('root')//getElementById tell you where to put the h1 element. root is the Div in the body of index.html in the public folder

)