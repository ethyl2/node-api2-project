import React, { useState } from 'react';

const EditForm = props => {
    const initialTitle = props.post.title;
    const initialContents = props.post.contents;

    const [blogPost, setBlogPost] = useState({title: initialTitle, contents: initialContents});

    const handleChange = e => {
        setBlogPost({...blogPost, [e.target.name] : e.target.value});
    }

    const submitPost = e => {
        e.preventDefault();
        props.editPost(blogPost);
    }

    return (
        <div>
            <form onSubmit={submitPost}>
                <legend>Edit Post</legend>
                <label htmlFor='title'>Title: </label>
                <input type='text' name='title' id='title' value={blogPost.title} onChange={handleChange} /> 
                <br />
                <label htmlFor='contents'>Contents</label>
                <input type='text' name='contents' id='contents' value={blogPost.contents} onChange={handleChange} />
                <br />
                <button type='submit'>Submit Edited Post</button>
            </form>
        </div>
    )
}

export default EditForm;