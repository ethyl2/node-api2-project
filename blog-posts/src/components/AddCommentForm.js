import React, { useState } from 'react';

const AddCommentForm = props => {
    const [comment, setComment] = useState({text: ''});

    const handleChange = e => {
        setComment({[e.target.name] : e.target.value});
    }

    const addComment = e => {
        e.preventDefault();
        props.insertComment(comment);
        setComment({text: ''});
    }

    return (
        <div>
            <form onSubmit={addComment}>
                <legend>Add Comment</legend>
                <label htmlFor='text'>Text: </label>
                <input type='text' name='text' id='text' value={comment.text} onChange={handleChange} /> 
                <br />
                <button type='submit'>Submit Comment</button>
            </form>
        </div>
    )
}

export default AddCommentForm;