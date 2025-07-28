const db = require('../models');
const Assignment = db.Assignment;

exports.createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (err) {
    console.error('Create Assignment Error:', err);
    res.status(500).json({ message: 'Failed to create assignment' });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.findAll();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get assignments' });
  }
};
