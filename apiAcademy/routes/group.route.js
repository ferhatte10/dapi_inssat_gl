const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/group.controller');
const {uuidValidator} = require("../validators/uuid.validator");

// Define routes
router.get('/', GroupController.getAllGroup);
router.get('/:id/users', uuidValidator, GroupController.getUsersByGroupId);

module.exports = router;
