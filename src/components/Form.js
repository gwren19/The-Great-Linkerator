import React from 'react'

import './Form.css'

const Form = () => {

 return (
    <div class="form">
    <form class="newLink">
        <h2 class="formTitle">Create a New Link!</h2>
        <label>
            Link Name:
            <input type ="text" name="name" />
        </label>
        <label>
            Comments:
            <input type="text" name="name" />
        </label>
        <label>
            Tags:
            <input type="text" name="name" />
        </label>
        <button class="submit">
            Submit
        </button>
    </form>
   

    </div> 
 )
}

export default Form;