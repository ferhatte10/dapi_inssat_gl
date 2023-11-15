const { category } = require('../configs/db/config/db');

const categorySeeder = async () => {
  try {
    // Check if the category already exists in the database
    const alreadySeededCategory = await category.findOne({
      where: { title: 'already_been_seeded' }
    });

    if (!alreadySeededCategory) {
      // Sample data to be inserted
      const categories = [
        { title: 'Technology', parent_id: null },
        { title: 'Travel', parent_id: null },
        { title: 'Food & Cooking', parent_id: null },
        { title: 'Health & Fitness', parent_id: null },
        { title: 'Fashion', parent_id: null },
        { title: 'Art & Design', parent_id: null },
        { title: 'Science', parent_id: null },
        { title: 'Business & Finance', parent_id: null },
        { title: 'Sports', parent_id: null },
        { title: 'Education', parent_id: null },
        { title: 'Lifestyle', parent_id: null },
        { title: 'already_been_seeded', parent_id: null },
        // Add more categories as needed
      ];

      // Use the create method to insert data into the 'category' table
      const data = await category.bulkCreate(categories);

      console.log('Categories seeded successfully');
      return data;
    } else {
      console.log('Category with title "already_been_seeded" already exists. Skipping seeding.');
    }
  } catch (error) {
    console.error('Category seeder error:', error);
  }
};

module.exports = categorySeeder;
