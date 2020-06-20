const express = require('express');
const server = express.Router();
const chalk = require('chalk');

const linksRouter = require('./links');
server.use('/links', linksRouter);

// const tagsRouter = require('./tags');
// server.use('/tags', tagsRouter);

// server.get('/src/api/links', () => {});

// server.get('/src/api/tags/:tagName/links', () => {});

// server.post('/src/api/links', () => {});

// server.patch('/src/api/links/:id', ()=>{});

module.exports = server;