const { impression, level, activity, period } = require('../configs/db/config/db');
const { faker } = require('@faker-js/faker');

// fetch levels from the database
const getLevelsFromDatabase = async () => {
    try {
        const levels = await level.findAll();
        return levels;
    } catch (error) {
        console.error('Error while fetching levels from the database:', error);
        throw error;
    }
};

// generate a random level
const getRandomLevel = (levels) => {
    const randomIndex = Math.floor(Math.random() * levels.length);
    return levels[randomIndex].position;
};

// seed impressions
module.exports.seedImpressions = async () => {
    try {
        // Fetch all activities, periods, students, and levels
        const allActivities = await activity.findAll();
        const allPeriods = await period.findAll();
        const studentId = '0f9c1ee7-1bbf-41e4-9477-26a3a7a25d4b'; //zakariaID
        const levels = await getLevelsFromDatabase();

        // Seed impressions for each activity and period
        for (const currentActivity of allActivities) {
            for (const currentPeriod of allPeriods) {
                const randomLevel = getRandomLevel(levels);
                const randomContent = faker.lorem.sentence(); // Generate a random sentence

                // Create impression
                await impression.create({
                    content: randomContent,
                    level_id: randomLevel,
                    activity_id: currentActivity.id,
                    period_id: currentPeriod.id,
                    student_id: studentId
                });
            }
        } 

        console.log('Seeding of impressions table done!');
    } catch (error) {
        // if duplicate constraint error, do nothing
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Error while seeding section table');
            return;
        }
        console.error('Error while seeding impressions table:', error);
        // Handle errors accordingly
    }
};
