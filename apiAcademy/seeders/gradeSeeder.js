const { grade, assessment, period, section } = require('../configs/db/config/db');
const { faker } = require('@faker-js/faker');

// fetch assessments from the database
const getAssessmentsFromDatabase = async () => {
    try {
        return await assessment.findAll();
    } catch (error) {
        console.error('Error while fetching assessments from the database:', error);
        throw error;
    }
};

// fetch periods from the database
const getPeriodsFromDatabase = async () => {
    try {
        return await period.findAll();
    } catch (error) {
        console.error('Error while fetching periods from the database:', error);
        throw error;
    }
};

// fetch sections from the database
const getSectionsNotation = async () => {
    try {
        return await section.findOne({
            where: {
                title: "Notation"
            }
        });
    } catch (error) {
        console.error('Error while fetching sections from the database:', error);
        throw error;
    }
};

// generate a random grade
const getRandomGrade = () => {
    // Generate a random grade between 10 and 20
    return Math.floor(Math.random() * (20 - 10 + 1) + 10);
};

// seed grades
module.exports.seedGrades = async () => {
    try {
        // Fetch assessments, periods, sections, and studentId
        const assessments = await getAssessmentsFromDatabase();
        const periods = await getPeriodsFromDatabase();
        const sectionNotation = await getSectionsNotation();
        const zakariaId = '0f9c1ee7-1bbf-41e4-9477-26a3a7a25d4b';
        const ferhatId = '1cabe1b3-e680-4cac-8d19-0fbeab35134f';
        const antoineID = '2cabe1b3-e680-4cac-8d19-0fbeab35134g';


        for (const currentPeriod of periods) {
            for (const currentAssessment of assessments) {
                const randomGrade = getRandomGrade();
                const randomComment = faker.lorem.sentence(); // Generate a random sentence

                // Create grade
                await grade.create({
                    student_id: zakariaId,
                    grade: randomGrade,
                    assessment_id: currentAssessment.id,
                    period_id: currentPeriod.id,
                    comment: randomComment,
                    section_id: sectionNotation.id
                });
            }
        }

        // ferhat grades
        for (const currentPeriod of periods) {
            for (const currentAssessment of assessments) {
                const randomGrade = getRandomGrade();
                const randomComment = faker.lorem.sentence(); // Generate a random sentence

                // Create grade
                await grade.create({
                    student_id: ferhatId,
                    grade: randomGrade,
                    assessment_id: currentAssessment.id,
                    period_id: currentPeriod.id,
                    comment: randomComment,
                    section_id: sectionNotation.id
                });
            }
        }


        // antoine grades
        for (const currentPeriod of periods) {
            for (const currentAssessment of assessments) {
                const randomGrade = getRandomGrade();
                const randomComment = faker.lorem.sentence(); // Generate a random sentence

                // Create grade
                await grade.create({
                    student_id: antoineID,
                    grade: randomGrade,
                    assessment_id: currentAssessment.id,
                    period_id: currentPeriod.id,
                    comment: randomComment,
                    section_id: sectionNotation.id
                });
            }
        }

        console.log('Seeding of grades table done!');
    } catch (error) {
        // if duplicate constraint error, do nothing
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Error while seeding grade table');
            return;
        }
        console.error('Error while seeding grades table:', error);
        // Handle errors accordingly
    }
};
