const { client, getAllLinks, createLink } = require('./index');

async function dropTables() {
    try {
        await client.query(`
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
        `);
    } catch(error) {
        console.error(error);
        throw error;
    }
}

async function createInitialLink() {
    try {
        const google = await createLink({name: 'www.google.com', comments: 'Best search engine'});
        console.log(google)
    } catch(error) {
        console.error(error)
    }
}

async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialLink();
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