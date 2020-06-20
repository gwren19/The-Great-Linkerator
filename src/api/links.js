const express = require('express');
const linksRouter = express.Router();
const { getAllLinks, createLink } = require('../db');

linksRouter.use((req, res, next) => {
    console.log('A request in being made to /links')
    next()
});

linksRouter.get('/', async (req, res, next) => {
    const links = await(getAllLinks());
    res.send({ links })
});

linksRouter.post('/', async (req, res, next) => {
    try {
        const { name, comments, tags = "" } = req.body;
        const tagArr = tags.trim().split(/\s+/);
        const linkData = { name, comments };

        const newLink = await createLink(linkData);

        if (tagArr.length) {
            // create tags
            // create link_tags
            linkData.tags = tagArr;
        }

        if (newLink) {
            res.send({ newLink })
        } else {
            next({
                name: 'LinkError',
                message: `You need to enter a link to post!`
            });
        }

    } catch (error) {
        throw error
    }
});

module.exports = linksRouter;