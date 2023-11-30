// Import individual seeders and execute them
const categorySeeder = require('./categorySeeder')
const tagSeeder = require('./tagSeeder')
const articleSeeder = require('./articleSeeder')
const article_tagsSeeder = require('./article_tagsSeeder')


// Execute all seeders
const seedAll = async () => {
  try {
    const categories = await categorySeeder(); 
    const tags = await tagSeeder();
    const articles = await articleSeeder();

    if(articles)
      await article_tagsSeeder();

    // Execute other seeders as needed
    console.log('All seeders executed successfully');
  } catch (error) {
    console.error('Error executing seeders:', error);
  }
};


module.exports = {
  seedAll,
};