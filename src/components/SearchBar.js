import React from 'react';
import axios from 'axios';
// import InputGroup from 'react-bootstrap/InputGroup';
// import FormControl from 'react-bootstrap/FormControl';
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
      // <div id="search">
      //   <h2 className= "searchTitle">Look up websites here...</h2>
      //   <form className="searchBar" onSubmit={ handleSubmit }>
      //     <InputGroup className="mb-3">
      //         <FormControl
      //           placeholder="link search"
      //           aria-label="link search"
      //           aria-describedby="basic-addon2"
      //         />
      //         <InputGroup.Append>
      //           <button class ="button is-info " variant="info" onClick={handleSubmit}>Search</button>
      //         </InputGroup.Append>
      //     </InputGroup>
      //   </form>
      // </div>
      <section class="section is-medium">
          <div class="container">
           
            <div> 
                <h2 class= "title is-2 has-text-centered">Look up your websites here...</h2> 
              
              <div class="field has-addons">
                  <div class="control is-expanded ">
                        
                        <input class="input is-info is-medium is-rounded has-text-centered" type="text" placeholder="Link Search" onSubmit={ handleSubmit }></input>
                  </div>
                  <div class="control">
                    <a class="button is-info is-rounded is-medium" variant="info" onClick={handleSubmit}>
                      Search
                    </a>
                  </div>
              </div>
            </div>
          </div>
          
      </section>
    );
}

export default SearchBar;