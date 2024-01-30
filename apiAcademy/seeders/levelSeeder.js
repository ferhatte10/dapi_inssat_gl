const {level} = require('../configs/db/config/db');

let Levels = [
    {
        name: 'Excellent',
        position: 1
    },
    {
        name: 'Très bien',
        position: 2
    },
    {
        name: 'Bien',
        position: 3
    },
    {
        name: 'Assez bien',
        position: 4
    },
    {
        name: 'Passable',
        position: 5
    },
    {
        name: 'Insuffisant',
        position: 6
    },
    {
        name: 'Non évaluable',
        position: 7
    }
]

module.exports.seedLevels = async () => {
    try {
        await level.bulkCreate(Levels);
        console.log('Seeding of level table done !');
    } catch (error) {
        console.error('Error while seeding level table');
        // if duplicate constraint error, do nothing
        if (error.name === 'SequelizeUniqueConstraintError') return;
        throw error;
    }
}
