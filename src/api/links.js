const express = require('express');
const linksRouter = express.Router();
const { getAllLinks, createLink, createTag, createLinkTag } = require('../db');

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
        const newTags = await Promise.all(tagArr.map(tag => {
            console.log()
            return createTag(tag)
        }))
        console.log('newTags:', newTags)

        await Promise.all(newTags.map(newTag => {
            console.log('links:', newLink, 'tags:', newTag)
            return createLinkTag(newLink.id, newTag.id)
        }))
        newLink.tags = newTags;
      
        if (newLink) {
            res.send({ newLink })
        } else {
            next({
                name: 'LinkError',
                message: `You need to enter a link to post!`
            });
        }

        // if (tagArr.length) {
        //     res.send({ newTag })
        //     tagData.tags = tagArr;
        // }


    } catch (error) {
        throw error
    }
});

module.exports = linksRouter;