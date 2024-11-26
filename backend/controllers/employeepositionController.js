const Employee = require('../models/employeepostion');
const mongoose = require('mongoose');

// Get all employee positions
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
    return res.status(404).json({ error: 'No such employee position' });
  }

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ error: 'No such employee position' });
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

// Delete an employee position by employee code (ecode)
const deleteEmployee = async (req, res) => {
  const { ecode } = req.params; 

  try {
    // Find and delete the employee by ecode
    const employee = await Employee.findOneAndDelete({ ecode });

    if (!employee) {
      return res.status(404).json({ error: 'No such employee position' });
    }

    res.status(200).json({
      message: 'Employee position deleted successfully',
      employee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an employee position by ecode
const updateEmployee = async (req, res) => {
  const { ecode } = req.params; 
  const { employeename, position } = req.body; 

  try {
    // Find and update the employee by ecode
    const updatedEmployee = await Employee.findOneAndUpdate(
      { ecode }, 
      { $set: { employeename, position } }, 
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({
      message: 'Employee position updated successfully',
      employee: updatedEmployee,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to update employee position',
      details: err.message,
    });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
