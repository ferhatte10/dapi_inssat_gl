const {activity} = require('../configs/db/config/db');

const Activities = [

    // section 1
    {
        name: 'Analyser le cahier des charges, apprécier le contexte du système à développer',
        position: 1,
        is_delete: false,
        is_free: false,
        section_id: 1
    },
    {
        name: 'Décomposer le problème,\n' +
            'concevoir une solution',
        position: 2,
        is_delete: false,
        is_free: false,
        section_id: 1
    },
    {
        name: 'Mobiliser ses compétences techniques pour produire une solution',
        position: 3,
        is_delete: false,
        is_free: false,
        section_id: 1
    },
    {
        name: 'Produire une solution d\'un bon niveau technique',
        position: 4,
        is_delete: false,
        is_free: false,
        section_id: 1
    },
    {
        name: 'Valider la solution proposée au travers de scénarios réalistes',
        position: 5,
        is_delete: false,
        is_free: false,
        section_id: 1
    },

    // section 2
    {
        name: 'Organiser son travail et les différentes tâches, planifier le développement en fonction du contexte',
        position: 1,
        is_delete: false,
        is_free: false,
        section_id: 2
    },
    {
        name: 'Présenter son travail oralement',
        position: 2,
        is_delete: false,
        is_free: false,
        section_id: 2
    },
    {
        name: 'Etre en autonomie dans son travail',
        position: 3,
        is_delete: false,
        is_free: false,
        section_id: 2
    },
    {
        name: 'Travailler en équipe',
        position: 4,
        is_delete: false,
        is_free: false,
        section_id: 2
    },
    {
        name: 'S\'intégrer dans l\'entreprise/le service',
        position: 5,
        is_delete: false,
        is_free: false,
        section_id: 2
    },

    // section 3
    {
        name: 'Produire des livrables de bonne qualité',
        position: 1,
        is_delete: false,
        is_free: false,
        section_id: 3
    },
    {
        name: 'Produire une documentation de bonne qualité',
        position: 2,
        is_delete: false,
        is_free: false,
        section_id: 3
    },
    {
        name: 'Prendre du recul sur son travail régulièrement pour en améliorer l\'organisation',
        position: 3,
        is_delete: false,
        is_free: false,
        section_id: 3
    },

    // section 4
    {
        name: 'Éléments satisfaisants',
        position: 1,
        is_delete: false,
        is_free: true,
        section_id: 4
    },
    {
        name: 'Éléments perfectibles',
        position: 2,
        is_delete: false,
        is_free: true,
        section_id: 4
    },
    {
        name: 'Actions à mettre en oeuvre, démarche de progression',
        position: 3,
        is_delete: false,
        is_free: true,
        section_id: 4
    }
]

module.exports.seedActivities = async () => {
    try {
        await activity.bulkCreate(Activities);
        console.log('Seeding of activities table done !');
    } catch (error) {
        console.error('Error while seeding activities table');
        if (error.name === 'SequelizeUniqueConstraintError') return;
        throw error;
    }
}