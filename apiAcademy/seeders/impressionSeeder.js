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

        const zakariaID = '3c1342d3-db38-487c-b3fc-a56354ca62ea';
        const ferhatID = 'a70eeb35-541b-42a2-a201-2d25cbc364e3';
        const antoineID = 'c23ba8bb-6481-4658-82be-5105ee83a85c';

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
                    student_id: zakariaID
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
                    student_id: ferhatID
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
