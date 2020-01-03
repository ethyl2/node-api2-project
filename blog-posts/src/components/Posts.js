import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [commentsList, setCommentsList] = useState([]);

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

    return (
        <div>
            {posts.map(post => {
                return (
                    <div key={post.id} className='post-box'>
                        
                        <p>{post.contents}:</p>
                        <h2>{post.title}</h2>
                        <button id={`button${post.id}`} onClick={() => getComments(post.id)}>See Comments</button>
                        <div className='comments-box'>
                            {commentsList.filter(item => item.postId === post.id).map(item => 
                                    item.comments.map((comment, index) => <p className='comment' key={Date.now() + comment.text[0]}>Comment {index+1}: {comment.text}</p>)
                            )}
                        </div>
                    </div>
            )})}
        </div>
    );
}

export default Posts;