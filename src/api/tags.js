const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, createTags } = require('../db')

tagsRouter.use((req, res, next) => {
    console.log('A request in being made to /tags')
    next()
});

tagsRouter.get('/', async (req, res, next) => {
    const tags = await(getAllTags());
    res.send({ tags })
    next()
});

tagsRouter.post('/', async (req, res, next ) => {
    console.log('A post is being made to /tags')
    const { name } = req.body
    const tagData = { name }
    const newTag = await createTags(tagData);
    res.send({ newTag })
})

module.exports = tagsRouter;