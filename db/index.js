const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/linkerator');

async function getAllLinks() {
    const { rows } = await client.query(
      `SELECT * 
       FROM links;
    `);
    return rows;
}

async function createLink({name, comments, tags = []}) {
    try {
        const {rows} = await client.query(`
            INSERT INTO links(name, comments)
            VALUES ($1, $2)
            RETURNING *;
            `, [name, comments]);

        return rows;
    } catch(error) {
        console.error(error)
    }
}

async function createTags(id , name){
    try {
        const {rows}= await client.query(`
            SELECT * 
            FROM tags;
        `)
        return rows;
    } catch(error){
        console.error('Didnt create tags', error)
    }
}

module.exports = {
    client,
    getAllLinks,
    createLink,
    createTags
}