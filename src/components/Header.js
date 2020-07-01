import React, { useState } from 'react';
import axios from 'axios';
import './Header.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Header = () => {
    const [show, setShow] = useState(false);
    const [webName, setWebName] = useState('');
    const [commentsVal, setCommentsVal] = useState('');
    const [tagsVal, setTagsVal] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleWebChange = (event) => setWebName(event.target.value);
    const handleCommentsChange = (event) => setCommentsVal(event.target.value);
    const handleTagsChange = (event) => setTagsVal(event.target.value);

    const createNewLink = async () => {
        await axios.post('/api/links', {
           name: webName,
           comments: commentsVal,
           tags: tagsVal 
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.error(error)
        });
    }
    
    return (
        <>
            <h1 className="title"> Welcome to the Linkerator!</h1>
            <Button id='create-link' variant="info" onClick={handleShow}>Create New Link!</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create a New Link</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicWebsite">
                            <Form.Label>Website:</Form.Label>
                            <Form.Control type="text" placeholder="Enter website" onChange={handleWebChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicComments">
                            <Form.Label>Comments:</Form.Label>
                            <Form.Control type="text" placeholder="Add comments here" onChange={handleCommentsChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicTags">
                            <Form.Label>Tags:</Form.Label>
                            <Form.Control type="text" placeholder="Add tags here" onChange={handleTagsChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    handleClose();
                    createNewLink();
                }}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Header;