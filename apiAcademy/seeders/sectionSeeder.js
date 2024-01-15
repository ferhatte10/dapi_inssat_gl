const {section} = require('../configs/db/config/db');

const Sections = [

    {
        title: 'Bilan des compétences techniques',
        description: null
    },
    {
        title: 'Bilan des compétences interpersonnelles',
        description: null
    },
    {
        title: 'Qualité du travail',
        description: null
    },
    {
        title: 'Autres éléments significatifs observés',
        description: null
    },
    {
        title: 'Notation',
        description: "Le niveau minimum requis pour valider le travail en entreprise et obtenir les points ECTS correspondants est de 10/20 en moyenne sur chaque période. Les notes ci-dessous sont définies après concertation entre le maître d'apprentissage et le tuteur école."
    },
]

module.exports.seedSections = async () => {
    try {
        await section.bulkCreate(Sections);
        console.log('Seeding of section table done !');
    } catch (error) {
        console.error('Error while seeding section table');
        // if duplicate constraint error, do nothing
        if (error.name === 'SequelizeUniqueConstraintError') return;
        throw error;
    }
}