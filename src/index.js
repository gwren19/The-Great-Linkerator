import React, { useState } from 'react';//This enables JSX
import ReactDOM from 'react-dom';
import axios from 'axios';

import { SearchBar, SearchResults, LinkList } from './components';
import { fetchCards } from './api/fakeData';

const App = () => {
    const [ results, setResults ] = useState([]);

    fetchCards().then(console.log);

    return (
      <div id="app">
        <SearchBar setResults = { setResults } />
        <SearchResults results = { results } />
        <LinkList />
      </div>
    );
}
  
ReactDOM.render(
    <App />,
    document.getElementById('app')
);