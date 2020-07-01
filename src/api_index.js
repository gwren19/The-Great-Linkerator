const PORT = process.env.PORT || 3000;
const express = require('express');
const server = express();
const {client} = require('./db');
// const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('./api');

client.connect();

server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
});

// server.use(cors()); //delete this before deploying!
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(morgan('dev'));

server.use((req, res, next) => {
    console.log("<----Body Logger START---->");
    console.log(req.body);
    console.log("<----Body Logger END---->");

    next();
});

server.use('/api', apiRouter);