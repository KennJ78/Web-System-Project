const Employee = require('../models/employeepostion');
const mongoose = require('mongoose');

// Get all employees position
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}).sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single employee position
const getEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such employee' });
  }

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ error: 'No such pastry' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new employee position
const createEmployee = async (req, res) => {
  const { ecode, employeename, position } = req.body;

  try {
    const employee = await Employee.create({ ecode, employeename, position });
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a employee position
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such pastry' });
  }

  try {
    const employee = await Employee.findOneAndDelete({ _id: id });

    if (!employee) {
      return res.status(404).json({ error: 'No such pastry' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a employee position
const updateEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such pastry' });
  }

  try {
    const employee = await Employee.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!employee) {
      return res.status(404).json({ error: 'No such pastry' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
