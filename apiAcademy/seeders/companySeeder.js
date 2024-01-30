const {company} = require('../configs/db/config/db');

let Companies = [
    {
        name: 'Sopra Steria',
        address: '1 Avenue du Général de Gaulle',
        city: 'Meudon',
        phone: '01 40 67 29 29'
    },
    {
        name: 'Capgemini',
        address: '11 Rue de Tilsitt',
        city: 'Paris',
        phone: '01 47 16 34 00'
    },
    {
        name: 'Atos',
        address: '80 Quai Voltaire',
        city: 'Paris',
        phone: '01 73 26 00 00'
    },
    {
        name: 'Accenture',
        address: '118 Avenue de France',
        city: 'Paris',
        phone: '01 53 23 55 55'
    },
    {
        name: 'Alten',
        address: '40 Avenue André Morizet',
        city: 'Boulogne-Billancourt',
        phone: '01 46 08 70 00'
    },
    {
        name: 'SII',
        address: '6 Avenue de l\'Europe',
        city: 'Boulogne-Billancourt',
        phone: '01 46 10 68 00'
    },
    {
        name: 'Devoteam',
        address: '73 Rue Anatole France',
        city: 'Levallois-Perret',
        phone: '01 41 49 48 48'
    },
    {
        name: 'GFI Informatique',
        address: '145 Boulevard Victor Hugo',
        city: 'Clichy',
        phone: '01 44 67 20 00'
    }
]

module.exports.seedCompanies = async () => {
    try {
        await company.bulkCreate(Companies);
        console.log('Seeding of company table done !');
    } catch (error) {
        console.error('Error while seeding company table');
        // if duplicate constraint error, do nothing
        if (error.name === 'SequelizeUniqueConstraintError') return;
        throw error;
    }
}
