// server/controllers/studentController.js
const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ message: 'Student added', student });
  } catch (err) {
    console.error('Create Error:', err);
    res.status(500).json({ message: 'Failed to create student' });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    console.error('Get Error:', err);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.update(req.body, { where: { id } });
    res.json({ message: 'Student updated' });
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ message: 'Failed to update student' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.destroy({ where: { id } });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ message: 'Failed to delete student' });
  }
};
