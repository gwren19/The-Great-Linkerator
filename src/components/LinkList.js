import React, { useState } from 'react';
import axios from 'axios';

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

const LinkList = () => {
    return (
        <div>
            
        </div>
    );
}

export default LinkList;