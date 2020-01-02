const express = require('express');
const router = express.Router();
const db = require('../data/db.js');

/* 
When the client makes a GET request to /api/posts:

    If there's an error in retrieving the posts from the database:
        cancel the request.
        respond with HTTP status code 500.
        return the following JSON object: { error: "The posts information could not be retrieved." }.

*/

router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            console.log(posts);
            res.status(201).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts' information could not be retrieved." });
        });
})

/*
When the client makes a GET request to /api/posts/:id:

    If the post with the specified id is not found:
        return HTTP status code 404 (Not Found).
        return the following JSON object: { message: "The post with the specified ID does not exist." }.

    If there's an error in retrieving the post from the database:
        cancel the request.
        respond with HTTP status code 500.
        return the following JSON object: { error: "The post information could not be retrieved." }.

*/

router.get(`/:id`, (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(blogPost => {
            console.log(blogPost);
            if (blogPost.length > 0) {
                res.status(201).json(blogPost);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
});








module.exports = router;