const express = require('express');
const linksRouter = express.Router();
const { getAllLinks } = require('../db');

linksRouter.use((req, res, next) => {
    console.log('A request in being made to /links')
    next()
});

linksRouter.get('/', async (req, res, next) => {
    const links = await(getAllLinks());
    res.send({ links })
});

module.exports = linksRouter;