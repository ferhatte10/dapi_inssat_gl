const {class_} = require('../configs/db/config/db');

const Classes = [
    {
        name: 'IAI1',
        apprenticeship: true
    },
    {
        name: 'IAI2',
        apprenticeship: true
    },
    {
        name: 'IAI3',
        apprenticeship: true
    },
    {
        name: 'IAPE1',
        apprenticeship: true
    },
    {
        name: 'IAPE2',
        apprenticeship: true
    },
    {
        name: 'IAPE3',
        apprenticeship: true
    },
    {
        name: 'INFO1',
        apprenticeship: false
    },
    {
        name: 'INFO2',
        apprenticeship: false
    },
    {
        name: 'INFO3',
        apprenticeship: false
    },
    {
        name: 'PHOT1',
        apprenticeship: false
    },
    {
        name: 'PHOT2',
        apprenticeship: false
    },
    {
        name: 'PHOT3',
        apprenticeship: false
    },
    {
        name: 'SNUM1',
        apprenticeship: false
    },
    {
        name: 'SNUM2',
        apprenticeship: false
    },
    {
        name: 'SNUM3',
        apprenticeship: false
    }
]

module.exports.seedClasses = async () => {
    try {
        await class_.bulkCreate(Classes);
        console.log('Seeding of classe table done !');
    } catch (error) {
        console.error('Error while seeding classe table');
        // if duplicate constraint error, do nothing
        if (error.name === 'SequelizeUniqueConstraintError') return;
        throw error;
    }
}