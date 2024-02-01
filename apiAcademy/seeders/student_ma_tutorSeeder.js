const {student_ma_tutor} = require('../configs/db/config/db');

module.exports.connectStudentsToTutors = async () => {
  try {

    const zakariaID = '0f9c1ee7-1bbf-41e4-9477-26a3a7a25d4b';
    const ferhatID = '1cabe1b3-e680-4cac-8d19-0fbeab35134f';
    const antoineID = '2cabe1b3-e680-4cac-8d19-0fbeab35134g';

    const olivierID = 'fa14f04a-4c86-442e-a2c3-1fd244c4a5e0';
    const handsonID = '862813bb-3a68-4fc1-9a69-947163b17bf1';

    const marineID = '8a367934-4ed3-418b-882a-a71b54222ee4';
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