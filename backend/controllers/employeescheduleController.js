const Employeesched = require('../models/employeesched');
const mongoose = require('mongoose');

// Get all employees position
const getEmployeessched = async (req, res) => {
  try {
    const employeessched = await Employeesched.find({}).sort({ createdAt: -1 });
    res.status(200).json(employeessched);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single employee position
const getEmployeesched = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such employee' });
  }

  try {
    const employeesched = await Employeesched.findById(id);

    if (!employeesched) {
      return res.status(404).json({ error: 'No such pastry' });
    }

    res.status(200).json(employeesched);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new employee position
const createEmployeesched = async (req, res) => {
  const {  employeename, position,shiftfrom,shiftto } = req.body;

  try {
    const employeesched = await Employeesched.create({  employeename, position,shiftfrom,shiftto });
    res.status(201).json(employeesched);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a employee position
const deleteEmployeesched = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such pastry' });
  }

  try {
    const employeesched = await Employeesched.findOneAndDelete({ _id: id });

    if (!employeesched) {
      return res.status(404).json({ error: 'No such pastry' });
    }

    res.status(200).json(employeesched);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a employee position
const updateEmployeesched = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such pastry' });
  }

  try {
    const employeesched = await Employeesched.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!employeesched) {
      return res.status(404).json({ error: 'No such pastry' });
    }

    res.status(200).json(employeesched);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getEmployeessched,
  getEmployeesched,
  createEmployeesched,
  deleteEmployeesched,
  updateEmployeesched,
};
