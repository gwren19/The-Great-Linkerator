const { client, getAllLinks, getLinksById, getAllTags, createLink, createTags, createLinkTag, getAllLinkTags } = require('./index');

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
        await createLink({
            id:1,
            name: 'www.google.com', 
            comments: 'Best search engine',
        });

        await createLink({
            id:2,
            name: 'www.espn.com', 
            comments: 'Sports Website',
        });

    } catch(error) {
        console.error(error)
    }
}

async function createInitialTags() {
    try {
            
        await createTags({
            name: ["knowledge","tool" ,"search"]
        });

        await createTags({
            name: ["Sports", "News", "Athletes"]
        });

        
    } catch(error){
        console.error(error)
    }
}

async function createInitialLinksTag(){
    
    const [{ id:linksId }]  = await getAllLinks()
    const [{ id:tagsId }] = await getAllTags()

    // const [{ linksId, tagsId }] = await getAllLinkTags();
    
    try {
        await createLinkTag({
            linksId,
            tagsId
        })

        await createLinkTag({
            linksId:2,
            tagsId:2
        })
       
    }catch (error){
        console.error("Failed to create Links Tag", error)
    }
}


async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialLink();
        await createInitialTags();
        await createInitialLinksTag();
    } catch(error) {
        console.error(error)
    }
}

async function testDB() {
    try {
      console.log("Starting to test database...");

      console.log("Initial Links Created!:");
      const links = await getAllLinks();
      console.log("Result:", links);

      console.log("Initial tags created!:");
      const tags = await getAllTags();
      console.log("Result:", tags);
      
      console.log("Initial LinkTags created!:")
      const linkTags = await getAllLinkTags();
      console.log("Result:", linkTags)

      console.log("Getting Links by Id")
      const idLinks = await getLinksById();
      console.log("Result:", idLinks)

      console.log("Finished database tests!");
    } catch (error) {
      console.error("Error testing database!");
      throw error;
    }
}
  

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end())