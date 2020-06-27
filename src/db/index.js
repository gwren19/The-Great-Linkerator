const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/linkerator');

async function getAllLinks() {
    try {
        const { rows: linkId } = await client.query(
            `SELECT id, name, comments, date 
            FROM links;
        `);

        const links = await Promise.all(linkId.map(
            link => getLinksById(link.id)
        ));
        
        return links;
    } catch (error) {
        throw error;
    }
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
        const { rows: [tag] } = await client.query(`
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

async function getTagsById(tagId) {
    try {
        const { rows: [tag]} = await client.query(`
            SELECT *
            FROM tags
            WHERE id=$1;
            `, [tagId]);
            if(!tag) {
                throw {
                    name: 'TagNotFoundError',
                    description: 'Could not find activity with that tagId'
                }
            };
            return tag;
    } catch(error) {
        throw error;
    }
};

async function addTagsToLinks(linksId, tagList){
    try{
        const createLinksTagPromises = tagList.map(
            tag => createLinkTag(linksId, tag.Id)
        );
        
        await Promise.all(createLinksTagPromises);

        return await getLinksById(linksId);
    } catch(error){
        console.error("Error adding Tags to Links")
    }
}

async function updateLink(id, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if(setString.length === 0) {
        return;
    }

    try {
      const {rows: [link] } = await client.query(`
        UPDATE links
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `, Object.values(fields));

        return link;
    } catch (error) {
      throw error;
    }
};

async function updateTag(id, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${ index + 1 }`
    ).join(', ');

    if(setString.length === 0) {
        return;
    }

    try {
        const { rows: [tag] } = await client.query(`
            UPDATE tags
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));

        return tag;
    } catch(error) {
        throw error;
    }
};

// async function updateLinkTag( id, fields = {}) {
//     const setString = Object.keys(fields).map(
//       (key, index) => `${ key }=$${ index +1 }`
//     ).join(', ');

//     if(setString.length === 0) {
//       return;
//     }

//     try {
//       const{rows: [routine_activity]} = await client.query(`
//       UPDATE routine_activities
//       SET ${setString}
//       WHERE "routineId"=${id}
//       RETURNING *;
//       `, Object.values(fields));
//       return routine_activity;
//     } catch (error) {
//       throw error;
//     }
// };

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
    updateLink,
    updateTag,
    getTagsById
}