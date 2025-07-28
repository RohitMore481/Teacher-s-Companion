const express = require('express');
const router = express.Router();
const { createAssignment, getAssignments } = require('../controllers/assignmentController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, createAssignment);
router.get('/', verifyToken, getAssignments);

module.exports = router;
