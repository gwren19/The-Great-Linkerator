import React, { useState } from 'react';//This enables JSX
import ReactDOM from 'react-dom';
import axios from 'axios';

 

import { SearchBar, SearchResults, LinkList, Form } from './components';
  

const App = () => {
    const [ results, setResults ] = useState([]);

    return (
      <div id="app">
        <h1 class="title"> Welcome to the Linkerator!</h1>
        
        <div id="content">
        
        <SearchBar setResults = { setResults } />
        <SearchResults results = { results } />
        ?
       
        <Form />

        </div>
        
        <LinkList />
      </div>

    );
}
  
ReactDOM.render(
    <App />,
    document.getElementById('site')
);