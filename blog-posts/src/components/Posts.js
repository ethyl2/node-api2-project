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
            <h1>Blog Posts from Hobbiton</h1>
            
            {posts.map(post => {
                return (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.contents}</p>
                        <button onClick={() => getComments(post.id)}>See Comments</button>
                        {commentsList.filter(item => item.postId === post.id).map(item => 
                                item.comments.map(comment => <p key={Date.now() + comment.text[0]}>{comment.text}</p>)
                        )}
                        <hr />
                    </div>
            )})}
        </div>
    );
}

export default Posts;