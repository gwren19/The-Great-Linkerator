import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchBar, SearchResults, Header } from './components';

const App = () => {
    const [ results, setResults ] = useState([]);

    return (
      <>      
        <SearchBar setResults = { setResults } />
        <SearchResults results = { results } />
      </>
    );
}

ReactDOM.render(
  <Header />,
  document.getElementById('header')
);
  
ReactDOM.render(
    <App />,
    document.getElementById("app")
);