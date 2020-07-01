import React, { useState } from 'react';
import './Link.css';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

const Link = ({
  linkId,
  name,
  comments,
  click_count,
  tags
}) => {
  const [ count, setCount ] = useState(0);

  const updateClickCount = async (linkId, count) => {
    try {
      await axios.patch(`/api/links/${linkId}`, {
        click_count: count
      }).then(response => {
        console.log(response)
    }).catch(error => {
        console.error(error)
    });
      
  } catch (error) {
      throw error;
  }
  } 

  function handleClick() {
    setCount( count + 1 );
    updateClickCount(count);
  };

  function handleTag() {
    if (tags.length) {
      return(tags[0].name)
    } else {
      return('There are no tags created for this link!')
    }
  }

  return (
    <CardDeck>
      <Card className='link' style={{ width: '20rem' }}>
      <Card.Header><a href={name} target="_blank" rel="noopener noreferrer nofollow" onClick={handleClick}>{name}</a></Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>Comments: { comments }</ListGroup.Item>
        <ListGroup.Item>Tags: { handleTag() }</ListGroup.Item>
        <ListGroup.Item>This link has been clicked { click_count } time(s).</ListGroup.Item>
      </ListGroup>
      </Card>
    </CardDeck>
  );
}

export default Link;