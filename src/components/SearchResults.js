import React, { useState } from 'react';
import Link from './Link';

import './SearchResults.css'

const SearchResults = ({ results }) => {
    console.log('result:', results)
    return (
        <div id='results'>
            <h3 class ="resultsTitle"> Here's what we found ({ results.length } results): </h3>
            <div>
                {results.map(result => {
                    console.log('single result:', result)
                    return (
                    <Link key={ result.id } { ...result } />)
                })}
            </div>
        </div>
    );
}

export default SearchResults;