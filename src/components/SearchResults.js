import React from 'react';
import Link from './Link';
import './SearchResults.css';

const SearchResults = ({ results }) => {
    console.log('result:', results)
    return (
        <div id='results'>
            <h3 className="resultsTitle"> Here's what we found ({ results.length } results): </h3>
                {results.map(result => {
                    console.log('single result:', result)
                    return (
                    <Link key={ result.id } { ...result } />)
                })}
        </div>
    );
}

export default SearchResults;