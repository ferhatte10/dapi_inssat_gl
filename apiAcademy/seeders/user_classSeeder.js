const {class_,user_class} = require('../configs/db/config/db');

module.exports.connectStudentsToClass = async () => {
    try {

        const zakariaID = '0f9c1ee7-1bbf-41e4-9477-26a3a7a25d4b';
        const ferhatID = '1cabe1b3-e680-4cac-8d19-0fbeab35134f';
        const antoineID = '2cabe1b3-e680-4cac-8d19-0fbeab35134g';

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