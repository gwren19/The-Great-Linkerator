const express = require('express');
const linksRouter = express.Router();
const { getAllLinks, createLink, createTags, createLinkTag } = require('../db');

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
        const tagData = { name };

        const newLink = await createLink(linkData);
        const newTag = await createTags(tagData);
        const newLinkTag = await createLinkTag()

      
        if (newLink) {
            res.send({ newLink })
        } else {
            next({
                name: 'LinkError',
                message: `You need to enter a link to post!`
            });
        }

        if (tagArr.length) {
            // create tags on conflict do nothing
            
            // const { name } = req.body
            // const tagData = { name }
            // const newTag = await createTags(tagData);
            res.send({ newTag })
            // create link_tags
            tagData.tags = tagArr;
        }


    } catch (error) {
        throw error
    }
});

module.exports = linksRouter;