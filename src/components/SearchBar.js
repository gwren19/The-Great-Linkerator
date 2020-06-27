import React, { useState } from 'react';
import axios from 'axios';

import {
    fetchCards,
} from '../api/fakeData';


const fetchLinks = async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/api/links')
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}
  
const SearchBar = ({ setResults }) => {
    async function handleSubmit(event) {
      event.preventDefault();
      const link = await fetchLinks();
      setResults(link);
    }
  
    return (
      <div id="search">
        <h3>Look up websites here...</h3>
        <form onSubmit={ handleSubmit }>
          <input type="text" placeholder="link search" />
          <button type="submit">Search</button>
        </form>
      </div>
    );
}

export default SearchBar;