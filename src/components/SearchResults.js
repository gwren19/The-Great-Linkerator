import React from 'react';
import Link from './Link';
import './SearchResults.css';

const SearchResults = ({ results }) => {
    console.log('result:', results)
    return (
        <section class="section">
            <div class="container">
                <h3 class="title has-text-centered"> Here's what we found ({ results.length } results): </h3>
                    {results.map(result => {
                        console.log('single result:', result)
                        return (
                        <Link key={ result.id } { ...result } />)
                    })}
            </div>
        </section>
    );
}

export default SearchResults;