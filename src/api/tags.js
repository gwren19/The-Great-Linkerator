const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, createTag, updateTag, getTagsById } = require('../db')

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
    const newTag = await createTag(tagData);
    res.send({ newTag })
});

tagsRouter.patch('/:tagId', async (req, res, next) => {
    const { tagId } = req.params;
    const { name } = req.body;
    const updateFields = {};

    if(name) {
      updateFields.name = name;
    };

    try {
      const originalTag = await getTagsById(tagId);

      if(originalTag) {
        const updatedTag = await updateTag(tagId, updateFields);
        res.send({tag: updatedTag});
      } else {
        next({
          name: 'Error', 
          description: 'Cannot update tag'
        })
      }
    } catch({name, message}) {
      next({name, message})
    }
});

module.exports = tagsRouter;