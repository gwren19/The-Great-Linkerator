const PORT = 3000;
const express = require('express');
const server = express();
const chalk = require('chalk');


server.listen(PORT, () => {
    console.log (chalk.green("Server is up on port 3000"))
})

server.get('/src/api/links', () => {});

server.get('/src/api/tags/:tagName/links', () => {});

server.post('/src/api/links', () => {});

server.patch('/src/api/links/:id', ()=>{});