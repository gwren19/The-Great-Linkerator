const express = require('express');
const tagsRouter = express.Router();

linksRouter.use((req, res, next) => {
    console.log('A request in being made to /links')
    next()
});

linksRouter.get('/', (req, res, next))

module.exports = linksRouter;