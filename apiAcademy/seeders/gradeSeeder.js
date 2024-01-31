const { grade, assessment, period, section } = require('../configs/db/config/db');
const { faker } = require('@faker-js/faker');

// fetch assessments from the database
const getAssessmentsFromDatabase = async () => {
    try {
        const assessments = await assessment.findAll();
        return assessments;
    } catch (error) {
        console.error('Error while fetching assessments from the database:', error);
        throw error;
    }
};

// fetch periods from the database
const getPeriodsFromDatabase = async () => {
    try {
        const periods = await period.findAll();
        return periods;
    } catch (error) {
        console.error('Error while fetching periods from the database:', error);
        throw error;
    }
};

// fetch sections from the database
const getSectionsFromDatabase = async () => {
    try {
        const sections = await section.findAll();
        return sections;
    } catch (error) {
        console.error('Error while fetching sections from the database:', error);
        throw error;
    }
};

// generate a random grade
const getRandomGrade = () => {
    return Math.floor(Math.random() * 20) + 1; // Generate a random grade between 1 and 20
};

// seed grades
module.exports.seedGrades = async () => {
    try {
        // Fetch assessments, periods, sections, and studentId
        const assessments = await getAssessmentsFromDatabase();
        const periods = await getPeriodsFromDatabase();
        const sections = await getSectionsFromDatabase();
        const studentId = '0f9c1ee7-1bbf-41e4-9477-26a3a7a25d4b';

        // Seed grades for each assessment, period, and section
        for (const currentAssessment of assessments) {
            for (const currentPeriod of periods) {
                for (const currentSection of sections) {
                    const randomGrade = getRandomGrade();
                    const randomComment = faker.lorem.sentence(); // Generate a random sentence

                    // Create grade
                    await grade.create({
                        student_id: studentId,
                        grade: randomGrade,
                        assessment_id: currentAssessment.id,
                        period_id: currentPeriod.id,
                        comment: randomComment,
                        section_id: currentSection.id
                    });
                }
            }
        }

        console.log('Seeding of grades table done!');
    } catch (error) {
        // if duplicate constraint error, do nothing
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Error while seeding section table');
            return;
        }
        console.error('Error while seeding grades table:', error);
        // Handle errors accordingly
    }
};
