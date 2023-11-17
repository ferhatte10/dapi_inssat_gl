const { tag } = require('../configs/db/config/db');

const tagSeeder = async () => {
  try {
    // Check if the tag already exists in the database
    const alreadySeededTag = await tag.findOne({
      where: { title: 'already_been_seeded' }
    });

    if (!alreadySeededTag) {
      // Sample data to be inserted
      const tags = [
        { title: 'Technology' },
        { title: 'Travel' },
        { title: 'Food & Cooking' },
        { title: 'Health & Fitness' },
        { title: 'Fashion' },
        { title: 'Art & Design' },
        { title: 'Science' },
        { title: 'Business & Finance' },
        { title: 'Sports' },
        { title: 'Education' },
        { title: 'Lifestyle' },
        { title: 'already_been_seeded' },
        // Add more tags as needed
      ];

      // Use the create method to insert data into the 'tag' table
      const data = await tag.bulkCreate(tags);

      console.log('Tags seeded successfully');
      return data;
    } else {
      console.log('Tag with title "already_been_seeded" already exists. Skipping seeding.');
    }
  } catch (error) {
    console.error('Tag seeder error:', error);
  }
};

module.exports = tagSeeder;
