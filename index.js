const express = require('express');
const server = express();

const postRoutes = require('./posts/postRoutes')

server.use('/posts', postRoutes);

server.listen(9000, ()=> console.log('server up and running on port 9000'));

