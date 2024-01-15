const {assessment} = require('../configs/db/config/db');

const Assessments = [
    {
        name: 'Travail réalisé en entreprise',
        coefficient: 6,
        position: 1
    },
    {
        name: 'Rapport écrit rendu à l\'école',
        coefficient: 2,
        position: 2
    },
    {
        name: 'Soutenance orale',
        coefficient: 1,
        position: 3
    },
]

module.exports.seedAssessments = async () => {
    try {
        await assessment.bulkCreate(Assessments);
        console.log('Seeding of assessment table done !');
    } catch (error) {
        console.error('Error while seeding assessment table');
        // if duplicate constraint error, do nothing
        if (error.name === 'SequelizeUniqueConstraintError') return;
        throw error;
    }
}