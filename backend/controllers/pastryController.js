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

// Get a single pastry
const getPastry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such pastry' });
  }

  try {
    const pastry = await Pastry.findById(id);

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

// Delete a pastry
const deletePastry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such pastry' });
  }

  try {
    const pastry = await Pastry.findOneAndDelete({ _id: id });

    if (!pastry) {
      return res.status(404).json({ error: 'No such pastry' });
    }

    res.status(200).json(pastry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a pastry
const updatePastry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such pastry' });
  }

  try {
    const pastry = await Pastry.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!pastry) {
      return res.status(404).json({ error: 'No such pastry' });
    }

    res.status(200).json(pastry);
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
