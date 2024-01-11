// routes/activity.route.js
const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity.controller');
const {
  verifyRequestParamId,
  verifyRequestBodyIds
} = require('../validators/commonly_used.validator');
const {
  validateActivityCreation,
  validateActivityUpdate
} = require('../validators/activity.validator');

router.get('/', activityController.getAllActivities);
router.post('/', validateActivityCreation, activityController.createActivity);
router.put('/:id', verifyRequestParamId, validateActivityUpdate, activityController.updateActivity);
router.delete('/:id', verifyRequestParamId, activityController.deleteActivity);

router.get('/groupedBySection', activityController.getAllActivitiesGroupedBySection);
router.get('/sectionsAndImpressions', activityController.getSectionsWithActivitiesAndImpressionsByPeriodAndUserId);


router.get('/:id', verifyRequestParamId, activityController.getActivityById);

module.exports = router;
