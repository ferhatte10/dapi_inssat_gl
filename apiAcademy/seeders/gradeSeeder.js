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
        const zakariaID = '3c1342d3-db38-487c-b3fc-a56354ca62ea';
        const ferhatID = 'a70eeb35-541b-42a2-a201-2d25cbc364e3';
        const antoineID = 'c23ba8bb-6481-4658-82be-5105ee83a85c';


        for (const currentPeriod of periods) {
            for (const currentAssessment of assessments) {
                const randomGrade = getRandomGrade();
                const randomComment = faker.lorem.sentence(); // Generate a random sentence

                // Create grade
                await grade.create({
                    student_id: zakariaID,
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
                    student_id: ferhatID,
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
