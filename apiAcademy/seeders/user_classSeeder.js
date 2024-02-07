const {class_,user_class} = require('../configs/db/config/db');

module.exports.connectStudentsToClass = async () => {
    try {

        const zakariaID = '3c1342d3-db38-487c-b3fc-a56354ca62ea';
        const ferhatID = 'a70eeb35-541b-42a2-a201-2d25cbc364e3';
        const antoineID = 'c23ba8bb-6481-4658-82be-5105ee83a85c';

        const IAI3 = await class_.findOne({
            where : {
                name : 'IAI3'
            }
        })

        await user_class.bulkCreate([
            {
                user_id : zakariaID,
                class_id : IAI3.id
            },
            {
                user_id : ferhatID,
                class_id : IAI3.id
            },
            {
                user_id : antoineID,
                class_id : IAI3.id
            }
        ])
        console.log('Students connected to classes successfully!');

    } catch (error) {
        // if duplicate constraint error, do nothing
        console.log("error while seeding user_class")
        if (error.name === 'SequelizeUniqueConstraintError') return
        throw error
    }
};