import React from 'react';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './SearchBar.css'

const fetchLinks = async () => {
    try {
        const { data } = await axios.get('/api/links')
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}

const SearchBar = ({ setResults }) => {
  async function handleSubmit(event) {
    event.preventDefault();
    const links = await fetchLinks();
    setResults(links.links);
    }
  
    return (
      <div id="search">
        <h2 className= "searchTitle">Look up websites here...</h2>
        <form className="searchBar" onSubmit={ handleSubmit }>
          <InputGroup className="mb-3">
              <FormControl
                placeholder="link search"
                aria-label="link search"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="info" onClick={handleSubmit}>Search</Button>
              </InputGroup.Append>
          </InputGroup>
        </form>
      </div>
    );
}

export default SearchBar;