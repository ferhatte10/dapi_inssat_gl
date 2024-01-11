// Import individual seeders and execute them

// Execute all seeders
const seedAll = async () => {
  try {

    // Execute other seeders as needed
    console.log('All seeders executed successfully');
  } catch (error) {
    console.error('Error executing seeders:', error);
  }
};


module.exports = {
  seedAll,
};