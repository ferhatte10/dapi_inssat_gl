// Import individual seeders and execute them

// Execute all seeders
const {seedSections} = require("./sectionSeeder");
const {seedActivities} = require("./activitySeeder");
const {seedAssessments} = require("./assessmentSeeder");
const {seedPeriods} = require("./periodeSeeder");
const {seedClasses} = require("./classSeeder");
const {seedCompanies} = require("./companySeeder");
const {seedLevels} = require("./levelSeeder");
const seedAll = async () => {
  try {
    await seedSections()
    await seedActivities()
    await seedAssessments()
    await seedPeriods()
    await seedClasses()
    await seedCompanies()
    await seedLevels()
    // Execute other seeders as needed
    console.log('All seeders executed successfully');
  } catch (error) {
    console.error('Error executing seeders:', error);
  }
};


module.exports = {
  seedAll,
};