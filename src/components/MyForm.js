import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

const MyForm = () => {
    return (
        <Form>
        <Form.Group controlId="formBasicWebsite">
            <Form.Label>Website:</Form.Label>
            <Form.Control type="text" placeholder="Enter website" />
        </Form.Group>
        <Form.Group controlId="formBasicComments">
            <Form.Label>Comments:</Form.Label>
            <Form.Control type="text" placeholder="Add comments here" />
        </Form.Group>
        <Form.Group controlId="formBasicTags">
            <Form.Label>Tags:</Form.Label>
            <Form.Control type="text" placeholder="Add tags here" />
        </Form.Group>
    </Form>
    )
}

export default MyForm;