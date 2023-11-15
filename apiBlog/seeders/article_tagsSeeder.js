const { article, tag, article_tag } = require('../configs/db/config/db');


const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const articleTagSeeder = async () => {
  try {
    // Fetch all articles and tags
    const articles = await article.findAll();
    const tags = await tag.findAll();

    // Sample data to be inserted
    const articleTags = [];

    articles.forEach((article) => {
      // Generate a random number of tagsPerArticle between 2 and 4
      const tagsPerArticle = getRandomInt(1, 4);

      // Shuffle the array of tags to get random tags each time
      const shuffledTags = tags.sort(() => Math.random() - 0.5);

      // Take the first `tagsPerArticle` tags for the current article
      const selectedTags = shuffledTags.slice(0, tagsPerArticle);

      // Create entries for each selected tag-article pair
      selectedTags.forEach((tag) => {
        articleTags.push({
          tag_id: tag.id,
          article_id: article.id,
        });
      });
    });

    // Use the create method to insert data into the 'article_tag' table
    await article_tag.bulkCreate(articleTags);

    console.log('article tags seeded successfully');
  } catch (error) {
    console.error('article tag seeder error:', error);
  }
};

module.exports = articleTagSeeder;
