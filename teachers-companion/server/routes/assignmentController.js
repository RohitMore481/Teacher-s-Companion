const db = require('../models');

exports.createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const assignment = await db.Assignment.create({ title, description, dueDate });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create assignment' });
  }
};

exports.getAssignments = async (req, res) => {
  const assignments = await db.Assignment.findAll();
  res.json(assignments);
};

exports.updateAssignment = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate } = req.body;
  await db.Assignment.update({ title, description, dueDate }, { where: { id } });
  res.json({ message: 'Updated successfully' });
};

exports.deleteAssignment = async (req, res) => {
  await db.Assignment.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Deleted successfully' });
};
