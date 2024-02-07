const {student_ma_tutor} = require('../configs/db/config/db');

module.exports.connectStudentsToTutors = async () => {
  try {

    const zakariaID = '3c1342d3-db38-487c-b3fc-a56354ca62ea';
    const ferhatID = 'a70eeb35-541b-42a2-a201-2d25cbc364e3';
    const antoineID = 'c23ba8bb-6481-4658-82be-5105ee83a85c';

    const olivierID = '20034d06-453b-4532-820c-4c14d61d01e6';
    const handsonID = '09305a59-fe3e-4d0b-a5f4-4202372db24d';

    const marineID = '51fd6279-be3a-488f-9081-7e185a1309b6';
    const thomasID = '9a367934-4ed3-418b-882a-a71b54222ee5';


    // Connect Zakaria to Olivier and Marine
    await student_ma_tutor.create({
      student_id: zakariaID,
      tutor_id: olivierID,
      ma_id: marineID
    });

    // Connect Ferhat to Marine and Handson
    await student_ma_tutor.create({
      student_id: ferhatID,
      tutor_id: marineID,
      ma_id: handsonID
    });

    // Connect Antoine to Handson and Thomas
    await student_ma_tutor.create({
      student_id: antoineID,
      tutor_id: handsonID,
      ma_id: thomasID
    });

    console.log('Students connected to tutors successfully!');
  } catch (error) {
    // if duplicate constraint error, do nothing
    if (error.name === 'SequelizeUniqueConstraintError') {
        console.error('Error connecting students to tutors:');
        return;
    }
    console.error('Error connecting students to tutors:', error);
  }
};