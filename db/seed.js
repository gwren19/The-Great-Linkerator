const { client, getAllLinks, createLink, createTags } = require('./index');

async function dropTables() {
    try {
        await client.query(`
            DROP TABLE IF EXISTS link_tags;
            DROP TABLE IF EXISTS tags;
            DROP TABLE IF EXISTS links;
        `);
    } catch(error) {
        console.error(error);
        throw error;
    }
}

async function createTables() {
    try {
        await client.query(`
            CREATE TABLE links (
            id SERIAL PRIMARY KEY, 
            name TEXT UNIQUE NOT NULL, 
            click_count INTEGER, 
            comments varchar(255) NOT NULL, 
            date DATE NOT NULL DEFAULT CURRENT_DATE
            );

            CREATE TABLE tags (
            id SERIAL PRIMARY KEY,
            name varchar(255) UNIQUE NOT NULL  
            );

            CREATE TABLE link_tags (
            "linksId" INTEGER REFERENCES links(id),
            "tagsId" INTEGER REFERENCES tags(id),
            UNIQUE ("linksId", "tagsId")

            );
        `);
    } catch(error) {
        console.error(error);
        throw error;
    }
}

async function createInitialLink() {
    try {
        const google = await createLink({
            name: 'www.google.com', 
            comments: 'Best search engine',
            });
        console.log(google)
    } catch(error) {
        console.error(error)
    }
}

async function createInitialTags(){
    try {
        const newTag = await createTags({
            name: "search knowledge tool"
        });
        console.log(newTag)
    } catch(error){
        console.error(error)
    }
}



async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialLink();
        await createInitialTags();
        console.log('DB rebuilt!!!')
    } catch(error) {
        console.error(error)
    } finally {
        client.end();
    }
}

// async function testDB() {
//     try {
//       console.log("Starting to test database...");
  
//       const links = getAllLinks()
      
  
//       console.log("Finished database tests!");
//     } catch (error) {
//       console.error("Error testing database!");
//       throw error;
//     }
// }
  

rebuildDB()