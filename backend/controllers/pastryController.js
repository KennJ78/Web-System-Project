const Pastry = require('../models/pastry');
const mongoose = require('mongoose');

// Get all pastries
const getPastries = async (req, res) => {
  try {
    const pastries = await Pastry.find({}).sort({ createdAt: -1 });
    res.status(200).json(pastries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single pastry by pcode
const getPastry = async (req, res) => {
  const { pcode } = req.params; 

  try {
    const pastry = await Pastry.findOne({ pcode });

    if (!pastry) {
      return res.status(404).json({ error: 'No such pastry' });
    }

    res.status(200).json(pastry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new pastry
const createPastry = async (req, res) => {
  const { pcode, pastryname, stocks } = req.body;

  try {
    const pastry = await Pastry.create({ pcode, pastryname, stocks });
    res.status(201).json(pastry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a pastry by pcode
const deletePastry = async (req, res) => {
  const { pcode } = req.params; 

  try {
    const pastry = await Pastry.findOneAndDelete({ pcode });

    if (!pastry) {
      return res.status(404).json({ error: 'No such pastry' });
    }

    res.status(200).json(pastry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a pastry by pcode
const updatePastry = async (req, res) => {
  const { pcode } = req.params; 
  const { pastryname, stocks } = req.body; 
  try {
    // Use findOneAndUpdate with $set to update the specified fields
    const pastry = await Pastry.findOneAndUpdate(
      { pcode },
      { $set: { pastryname, stocks } },
      { new: true, runValidators: true } 
    );

    if (!pastry) {
      return res.status(404).json({ error: 'No such pastry' });
    }

    res.status(200).json({
      message: 'Pastry updated successfully',
      pastry: pastry,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPastries,
  getPastry,
  createPastry,
  deletePastry,
  updatePastry,
};
