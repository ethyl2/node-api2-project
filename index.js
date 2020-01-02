const express = require('express');
const server = express();
server.use(express.json());

const postRoutes = require('./posts/postRoutes');

server.use('/api/posts', postRoutes);
server.get('/', (req, res) => {
    res.send('Welcome to the blog');
});


server.listen(9000, ()=> console.log('server up and running on port 9000'));

