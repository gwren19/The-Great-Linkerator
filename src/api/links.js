const express = require('express');
const linksRouter = express.Router();
const { getAllLinks, createLink, createTag, createLinkTag, getLinksById, updateLink, getClickCount, updateClickCount } = require('../db');

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
        const newTags = await Promise.all(tagArr.map(tag => {
            return createTag(tag)
        }))
        
        console.log('newTags:', newTags)

        await Promise.all(newTags.map(newTag => {
            console.log('links:', newLink, 'tags:', newTag)
            return createLinkTag(newLink.id, newTag.id)
        }));

        newLink.tags = newTags;
      
        if (newLink) {
            res.send( newLink )
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

linksRouter.patch('/:linkId', async (req, res, next) => {
    const { linkId } = req.params;
    const { name, comments, click_count } = req.body;
    const updateFields = {};

    if (name) {
      updateFields.name = name;
    };

    if (comments) {
      updateFields.comments = comments;
    };

    if (click_count) {
      updateFields.click_count = click_count;
    }

    try {
      const originalLink = await getLinksById(linkId);

      if(originalLink) {
        const updatedLink = await updateLink(linkId, updateFields);
        res.send({link: updatedLink});
      } else {
        next({
          name: 'Error', 
          description: 'Cannot update link'
        })
      }
      
      const click_count = await getClickCount(linkId);

      if(click_count) {
        const updatedClickCount = await updateLink(linkId, updateFields);
        res.send({link: updatedClickCount});
      } else {
        next({
          name: 'Error', 
          description: 'Cannot update click count'
        })
      }
    } catch({name, message}) {
      next({name, message})
    }
});

module.exports = linksRouter;