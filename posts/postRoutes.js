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
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
})








module.exports = router;