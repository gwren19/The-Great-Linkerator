import React, { useState } from 'react';

const Counter = ({ link }) => {
    const [ count, setCount ] = useState(0);
  
    function handleClick() {
      setCount( count + 1 );
    }
  
    return (
      <div>
        <h3>This link has been clicked { count } time(s).</h3>
        <button onClick={ handleClick }>Do { link } another time.</button>
      </div>
    );
}

const LinkList = (props) => {
    return (
        <>
        </>
    );
}

export default LinkList;