const { impression, level, activity, period } = require('../configs/db/config/db');
const { faker } = require('@faker-js/faker');

// fetch levels from the database
const getLevelsFromDatabase = async () => {
    try {
        return await level.findAll();
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
        const levels = await getLevelsFromDatabase();

        const zakariaId = '0f9c1ee7-1bbf-41e4-9477-26a3a7a25d4b';
        const ferhatId = '1cabe1b3-e680-4cac-8d19-0fbeab35134f';
        const antoineID = '2cabe1b3-e680-4cac-8d19-0fbeab35134g';

        // zakaria impressions
        for (const period of allPeriods) {
            for (const activity of allActivities) {
                const randomLevel = getRandomLevel(levels);
                const randomContent = faker.lorem.sentence(); // Generate a random sentence

                // Create impression
                await impression.create({
                    content: activity.is_free ? randomContent : "",
                    level_id: activity.is_free ? 7 : randomLevel,
                    activity_id: activity.id,
                    period_id: period.id,
                    student_id: zakariaId
                });
            }
        }

        // ferhat impressions
        for (const period of allPeriods) {
            for (const activity of allActivities) {
                const randomLevel = getRandomLevel(levels);
                const randomContent = faker.lorem.sentence(); // Generate a random sentence

                // Create impression
                await impression.create({
                    content: activity.is_free ? randomContent : "",
                    level_id: activity.is_free ? 7 : randomLevel,
                    activity_id: activity.id,
                    period_id: period.id,
                    student_id: ferhatId
                });
            }
        }

        // antoine impressions
        for (const period of allPeriods) {
            for (const activity of allActivities) {
                const randomLevel = getRandomLevel(levels);
                const randomContent = faker.lorem.sentence(); // Generate a random sentence

                // Create impression
                await impression.create({
                    content: activity.is_free ? randomContent : "",
                    level_id: activity.is_free ? 7 : randomLevel,
                    activity_id: activity.id,
                    period_id: period.id,
                    student_id: antoineID
                });
            }
        }


        console.log('Seeding of impressions table done!');
    } catch (error) {
        // if duplicate constraint error, do nothing
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Error while seeding impressions table');
            return;
        }
        console.error('Error while seeding impressions table:', error);
        // Handle errors accordingly
    }
};
