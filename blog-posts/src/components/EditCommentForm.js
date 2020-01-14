import React, {useState} from 'react';

const EditCommentForm = props => {
    const [editedComment, setEditedComment] = useState({text: ''});

    const handleChange = e => {
        setEditedComment({[e.target.name] : e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('time to submit comment edit');
        props.editComment(editedComment);
    }

    return (
        <form onSubmit={handleSubmit}>
            <legend>Edit Comment</legend>
            <label htmlFor='text'>Comment: </label>
            <input type='text' 
                name='text'
                id='text'
                value={editedComment.text}
                onChange={handleChange}/>
            <button type='submit'>Submit Edit</button>
        </form>
    )
}

export default EditCommentForm;