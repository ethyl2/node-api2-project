import React, { useState } from 'react';

const AddForm = props => {
    const [blogPost, setBlogPost] = useState({title: '', contents: ''});

    const handleChange = e => {
        setBlogPost({...blogPost, [e.target.name] : e.target.value});
    }

    const addPost = e => {
        e.preventDefault();
        props.insertPost(blogPost);
    }

    return (
        <div>
            <form onSubmit={addPost}>
                <legend>Add Post</legend>
                <label htmlFor='title'>Title: </label>
                <input type='text' name='title' id='title' value={blogPost.title} onChange={handleChange} /> 
                <br />
                <label htmlFor='contents'>Contents</label>
                <input type='text' name='contents' id='contents' value={blogPost.contents} onChange={handleChange} />
                <br />
                <button type='submit'>Submit Post</button>
            </form>
        </div>
    )
}

export default AddForm;