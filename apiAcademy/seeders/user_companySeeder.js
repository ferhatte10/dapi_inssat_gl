const {user_company,company} = require('../configs/db/config/db');

module.exports.connectStudentsAndMaToCompanies = async () => {
    try {

        const zakariaID = '0f9c1ee7-1bbf-41e4-9477-26a3a7a25d4b';
        const ferhatID = '1cabe1b3-e680-4cac-8d19-0fbeab35134f';
        const antoineID = '2cabe1b3-e680-4cac-8d19-0fbeab35134g';

        const olivierID = 'fa14f04a-4c86-442e-a2c3-1fd244c4a5e0';
        const handsonID = '862813bb-3a68-4fc1-9a69-947163b17bf1';

        const companies = await company.findAll();

        await user_company.bulkCreate([
            // Connect Zakaria and Olivier to the same company
            {
                user_id : zakariaID,
                company_id : companies[0].id
            },
            {
                user_id : olivierID,
                company_id : companies[0].id
            },
            // Connect Antoine and Ferhat and Handson to the same company
            {
                user_id : ferhatID,
                company_id : companies[1].id
            },
            {
                user_id : handsonID,
                company_id : companies[1].id
            },
            {
                user_id : antoineID,
                company_id : companies[1].id
            }
        ])
        console.log('Students connected to companies successfully!');
    } catch (error) {
        // if duplicate constraint error, do nothing
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Error while seeding user company tables');
            return;
        }
        console.error('Error connecting user company:', error);
    }
};