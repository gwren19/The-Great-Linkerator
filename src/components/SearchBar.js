import React, { useState } from 'react';

import {
    fetchCards,
  } from '../api';
  
const SearchBar = ({ setResults }) => {
    async function handleSubmit(event) {
      event.preventDefault();
      const cards = await fetchCards();
      setResults(cards);
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