  const Employeesched = require('../models/employeesched');
  const mongoose = require('mongoose');

  // Get all employee schedules
  const getEmployeessched = async (req, res) => {
    try {
      const employeessched = await Employeesched.find({}).sort({ createdAt: -1 });
      res.status(200).json(employeessched);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get a single employee schedule
  const getEmployeesched = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such employee schedule' });
    }

    try {
      const employeesched = await Employeesched.findById(id);

      if (!employeesched) {
        return res.status(404).json({ error: 'No such schedule' });
      }

      res.status(200).json(employeesched);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Create a new employee schedule
  const createEmployeesched = async (req, res) => {
    const { employeename, position, shiftfrom, shiftto } = req.body;

    try {
      const employeesched = await Employeesched.create({ employeename, position, shiftfrom, shiftto });
      res.status(201).json(employeesched);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Delete an employee schedule by employee name
  const deleteEmployeesched = async (req, res) => {
    const { employeename } = req.params; // Get the employeename from the request params

    try {
      // Find and delete the schedule by employee name
      const deletedSchedule = await Employeesched.findOneAndDelete({ employeename });

      if (!deletedSchedule) {
        return res.status(404).json({ error: 'Employee schedule not found' });
      }

      res.status(200).json({
        message: 'Employee schedule deleted successfully',
        schedule: deletedSchedule,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to delete employee schedule',
        details: error.message,
      });
    }
  };


  // Update an employee schedule
  const updateEmployeesched = async (req, res) => {
    const { employeename } = req.params; 
    const { position, shiftfrom, shiftto } = req.body; 

    try {
      // Find and update the schedule by employee name
      const updatedSchedule = await Employeesched.findOneAndUpdate(
        { employeename }, 
        { $set: { position, shiftfrom, shiftto } }, 
        { new: true, runValidators: true } 
      );

      if (!updatedSchedule) {
        return res.status(404).json({ error: 'Employee schedule not found' });
      }

      res.status(200).json({
        message: 'Employee schedule updated successfully',
        schedule: updatedSchedule,
      });
    } catch (err) {
      res.status(500).json({
        error: 'Failed to update employee schedule',
        details: err.message,
      });
    }
  };

  module.exports = {
    getEmployeessched,
    getEmployeesched,
    createEmployeesched,
    deleteEmployeesched,
    updateEmployeesched,
  };
