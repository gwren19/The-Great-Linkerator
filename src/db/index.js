const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/linkerator');

async function getAllLinks() {
    const { rows } = await client.query(`
        SELECT * 
        FROM links;
    `);

    return rows;
}

async function getAllTags() {
    const { rows } = await client.query(`
        SELECT * 
        FROM tags;
    `);
    return rows;
}

async function getAllLinkTags(){
    const { rows } = await client.query(`
        SELECT *
        FROM link_tags;
        `);
    return rows;
}

async function createLink({name, comments}) {
    try {
        const { rows } = await client.query(`
            INSERT INTO links(name, comments)
            VALUES ($1, $2)
            RETURNING *;
        `, [name, comments]);
        
        return rows[0];
    } catch(error) {
        console.error(error)
    }
}

async function createTag(name){
    try {
        const { rows: tag } = await client.query(`
            INSERT INTO tags(name)
            VALUES ($1)
            ON CONFLICT(name) DO NOTHING
            RETURNING *;
        `, [name]);
        return tag;
    } catch(error){
        console.error('Didnt create tags', error)
    }
}

async function createLinkTag(linksId, tagsId) {
    try{
       const {rows} = await client.query(`
            INSERT INTO link_tags( "linksId", "tagsId" )
            VALUES ($1, $2)
            ON CONFLICT ("linksId", "tagsId") DO NOTHING;
            `, [linksId, tagsId])
       
        return rows;
    } catch (error) {
        console.error("Failed to create Link Tag", error)
    }
}

async function getLinksById(linkId) {
    
    try {
         const { rows: [links] } = await client.query(`
         SELECT *
         FROM links
         WHERE id= $1;         
         `, [linkId]);
 
         const { rows: tags } = await client.query(`
         SELECT tags.*
         FROM tags
         JOIN link_tags ON tags.id=link_tags."tagsId"
         WHERE link_tags."linksId"= $1;
         `, [linkId])
         
         links.tags = tags;
 
     return links;

 }   catch(error){
     console.error("Failed to get links by Id", error)
}
}

async function addTagsToLinks(linksId, tagList){
    try{
        const createLinksTagPromises = tagList.map(
            tag => createLinkTag(linksId, tags.Id)
        );
        
        await Promise.all(createLinksTagPromises);

        return await getLinksById(linksId);
    } catch(error){
        console.error("Error adding Tags to Links")
    }
}

module.exports = {
    client,
    getAllLinks,
    getAllTags,
    getAllLinkTags,
    createLink,
    createTag,
    createLinkTag,
    getLinksById,
    addTagsToLinks,
}