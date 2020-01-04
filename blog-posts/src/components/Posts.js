import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddForm from './AddForm';
import AddCommentForm from './AddCommentForm';
import EditForm from './EditForm';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    const [commentsList, setCommentsList] = useState([]);
    const [adding, setAdding] = useState(false);

    const [addingComment, setAddingComment] = useState(false);
    const [postToAddComment, setPostToAddComment] = useState();

    const [editing, setEditing] = useState(false);
    const [postToEdit, setPostToEdit] = useState();

    useEffect(() => {
        axios.get('http://localhost:9000/api/posts')
            .then(res => {
                console.log(res);
                setPosts(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const getComments = (id) => {
        const button = document.getElementById(`button${id}`);
        button.classList.add('hidden');

        axios.get(`http://localhost:9000/api/posts/${id}/comments`)
            .then(res => {
                console.log(res);
                setCommentsList([...commentsList, {postId: id, comments : res.data}]);
                
            })
            .catch(err => {
                console.log(err);
                setCommentsList([...commentsList, {postId: id, comments: [{text: 'No comments yet'}]}]);
            });
    }

    const insertPost = newPost => {
        console.log(newPost);
        setAdding(!adding);
        axios.post('http://localhost:9000/api/posts', newPost)
            .then(res => {
                console.log(res);
                setPosts([...posts, res.data[0]]);
                setAdding(!adding);
            })
            .catch(err => {
                console.log(err);
                setAdding(!adding);
            });
    }

    const startAdd = () => {
        setAdding(!adding);
    }

    const insertComment = comment => {
        console.log(comment);
        const body = {post_id: postToAddComment, text: comment.text}
        setAddingComment(!addingComment);
        const form = document.getElementById(`comments${postToAddComment}`);
        form.classList.toggle('hidden');

        axios.post(`http://localhost:9000/api/posts/${postToAddComment}/comments`, body)
            .then(res => {
                console.log(res);
                setCommentsList([...commentsList, {postId: postToAddComment, comments : res.data}]);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const startAddComment = postId => {
        console.log(postId);
        setAddingComment(true);
        setPostToAddComment(postId);
        const form = document.getElementById(`comments${postId}`);
        form.classList.toggle('hidden');
    }

    const deletePost = postId => {
        axios.delete(`http://localhost:9000/api/posts/${postId}`)
            .then(res => {
                console.log(res);
                setPosts(posts.filter(post => post.id !== postId));
            })
            .catch((err)=>{
                console.log(err);
            });
    };

    const startEdit = postId => {
        setEditing(!editing);
        const form = document.getElementById(`edit${postId}`);
        form.classList.toggle('hidden');
        setPostToEdit(postId);
    }

    const editPost = post => {
        console.log(post);
        setEditing(false);
        axios.put(`http://localhost:9000/api/posts/${postToEdit}`, post)
            .then(res => {
                console.log(res);
                const form = document.getElementById(`edit${postToEdit}`);
                form.classList.toggle('hidden');
                setPosts(posts.map(post => {
                    if (post.id === postToEdit) {
                        return res.data[0];
                    } else {
                        return post;
                    }
                }));
            })
            .catch(err => {
                console.log(err);
                const form = document.getElementById(`edit${postToEdit}`);
                form.classList.toggle('hidden');
            });
    }

    return (
        <div>
            <button onClick={startAdd}>{!adding? 'Add Post': 'Cancel Add'}</button>
            {adding && <AddForm insertPost={insertPost} />}
            {posts.map(post => {
                return (
                    <div key={post.id} className='post-box'>
                        
                        <p>{post.contents}:</p>
                        <h2>{post.title}</h2>
                        <button id={`button${post.id}`} onClick={() => getComments(post.id)}>See Comments</button>
                        {!addingComment && <button onClick={() => startAddComment(post.id)}>Add Comment</button>}

                        <div className='comments-box'>
                            {commentsList.filter(item => item.postId === post.id).map(item => 
                                    item.comments.map((comment, index) => <p className='comment' key={Date.now() + comment.text}>Comment {index+1}: {comment.text}</p>)
                            )}
                        <div id={`comments${post.id}`} className='hidden'>
                            <AddCommentForm insertComment={insertComment} />
                        </div>
                        <div id={`edit${post.id}`} className='hidden'>
                            <EditForm post={post} editPost={editPost} />
                        </div>

                        <button onClick={() => startEdit(post.id)}>{!editing? 'Edit Post': 'Cancel Edit'}</button>
                        <button onClick={() => deletePost(post.id)}>Delete Post</button>
                        </div>
                    </div>
            )})}
        </div>
    );
}

export default Posts;