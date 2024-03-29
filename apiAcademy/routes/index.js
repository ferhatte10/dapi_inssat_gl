const express = require('express');
const router = express.Router();

// Mounting each route under the right path
router.use('/users', require('./user.route'));
router.use('/groups', require('./group.route'));
router.use('/class', require('./class.route'));
router.use('/activities', require('./activity.route'));  
router.use('/assessments', require('./assessment.route')); 
router.use('/companies', require('./company.route'));  
router.use('/grades', require('./grade.route'));  
router.use('/impressions', require('./impression.route'));  
router.use('/levels', require('./level.route'));  
router.use('/periods', require('./period.route'));  
router.use('/sections', require('./section.route')); 
router.use('/student-ma-tutors', require('./student_ma_tutor.route'));  


router.use('/user-class', require('./user_class.route'));
router.use('/user-company', require('./user_company.route'));

module.exports = router;
