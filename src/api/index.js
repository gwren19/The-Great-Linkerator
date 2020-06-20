const express = require('express');
const server = express.Router();
const chalk = require('chalk');

const linksRouter = require('./links');
server.use('/links', linksRouter);

const tagsRouter = require('./tags');
server.use('/tags', tagsRouter);

module.exports = server;