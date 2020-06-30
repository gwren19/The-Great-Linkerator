import React, { useState } from 'react';
import axios from 'axios';
import Link from './Link';

const Counter = () => {
    const [ count, setCount ] = useState(0);
  
    function handleClick() {
      setCount( count + 1 );
    }
  
    return (
      <div>
        <h3>This link has been clicked { count } time(s).</h3>
        <a href="#" onClick={ handleClick }>Click Me</a>
      </div>
    );
}

const LinkList = ({results}) => {
  // console.log('results:', results)
  // return (
  // <div>
  //   {results.map(result => {
  //     return (
  //       <Link key={ result.id } {...result} />
  //     )
  //   })}
  // </div>)
    return (
      <h1>Hello</h1>
    )
}

export default LinkList;