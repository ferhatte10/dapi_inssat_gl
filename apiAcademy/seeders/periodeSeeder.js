const {period} = require('../configs/db/config/db');

const Periodes = [
    {
        name: 'Bilan d\'activités - Période entreprise 1',
        description: 'Cette évaluation est réalisée par le maître d\'apprentissage en tenant compte de la réalisation des objectifs attendus pour le travail à réaliser par l\'apprenti(e) durant cette période en entreprise et du niveau d\'expertise attendu de l\'apprenti(e) à cette période de sa formation.',
        number: 1
    },
    {
        name: 'Bilan d\'activités - Période entreprise 2',
        description: 'Cette évaluation est réalisée par le maître d\'apprentissage en tenant compte de la réalisation des objectifs attendus pour le travail à réaliser par l\'apprenti(e) durant cette période en entreprise et du niveau d\'expertise attendu de l\'apprenti(e) à cette période de sa formation.',
        number: 2
    },
    {
        name: 'Bilan d\'activités - Période entreprise 3',
        description: 'Cette évaluation est réalisée par le maître d\'apprentissage en tenant compte de la réalisation des objectifs attendus pour le travail à réaliser par l\'apprenti(e) durant cette période en entreprise et du niveau d\'expertise attendu de l\'apprenti(e) à cette période de sa formation.',
        number: 3
    },
    {
        name: 'Bilan d\'activités - Période entreprise 4',
        description: 'Cette évaluation est réalisée par le maître d\'apprentissage en tenant compte de la réalisation des objectifs attendus pour le travail à réaliser par l\'apprenti(e) durant cette période en entreprise et du niveau d\'expertise attendu de l\'apprenti(e) à cette période de sa formation.',
        number: 4
    },
    {
        name: 'Bilan d\'activités - Période entreprise 5',
        description: 'Cette évaluation est réalisée par le maître d\'apprentissage en tenant compte de la réalisation des objectifs attendus pour le travail à réaliser par l\'apprenti(e) durant cette période en entreprise et du niveau d\'expertise attendu de l\'apprenti(e) à cette période de sa formation.',
        number: 5
    },
    {
        name: 'Bilan d\'activités - Période entreprise 6',
        description: 'Cette évaluation est réalisée par le maître d\'apprentissage en tenant compte de la réalisation des objectifs attendus pour le travail à réaliser par l\'apprenti(e) durant cette période en entreprise et du niveau d\'expertise attendu de l\'apprenti(e) à cette période de sa formation.',
        number: 6
    },
]

module.exports.seedPeriods = async () => {
    try {
        await period.bulkCreate(Periodes);
        console.log('Seeding of period table done !');
    } catch (error) {
        console.error('Error while seeding period table');
        // if duplicate constraint error, do nothing
        if (error.name === 'SequelizeUniqueConstraintError') return;
        throw error;
    }
}