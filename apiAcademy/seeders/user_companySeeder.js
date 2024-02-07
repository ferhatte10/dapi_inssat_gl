const {user_company,company} = require('../configs/db/config/db');

module.exports.connectStudentsAndMaToCompanies = async () => {
    try {

        const zakariaID = '3c1342d3-db38-487c-b3fc-a56354ca62ea';
        const ferhatID = 'a70eeb35-541b-42a2-a201-2d25cbc364e3';
        const antoineID = 'c23ba8bb-6481-4658-82be-5105ee83a85c';

        const olivierID = '20034d06-453b-4532-820c-4c14d61d01e6';
        const handsonID = '09305a59-fe3e-4d0b-a5f4-4202372db24d';

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