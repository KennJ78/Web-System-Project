const Bread = require('../models/bread');
const mongoose = require('mongoose');

// Get all breads
const getBreads = async (req, res) => {
  try {
    const breads = await Bread.find({}).sort({ createdAt: -1 });
    res.status(200).json(breads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single bread by bcode
const getBread = async (req, res) => {
  const { bcode } = req.params;

  try {
    const bread = await Bread.findOne({ bcode });

    if (!bread) {
      return res.status(404).json({ error: 'No such bread' });
    }

    res.status(200).json(bread);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new bread
const createBread = async (req, res) => {
  const { bcode, breadname, stocks } = req.body;

  try {
    const bread = await Bread.create({ bcode, breadname, stocks });
    res.status(201).json(bread);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a bread by bcode
const deleteBread = async (req, res) => {
  const { bcode } = req.params;

  try {
    const bread = await Bread.findOneAndDelete({ bcode });

    if (!bread) {
      return res.status(404).json({ error: 'No such bread' });
    }

    res.status(200).json({
      message: 'Bread deleted successfully',
      bread: bread,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a bread by bcode
const updateBread = async (req, res) => {
  const { bcode } = req.params;
  const { breadname, stocks } = req.body;

  try {
    const bread = await Bread.findOneAndUpdate(
      { bcode },
      { $set: { breadname, stocks } },
      { new: true, runValidators: true }
    );

    if (!bread) {
      return res.status(404).json({ error: 'No such bread' });
    }

    res.status(200).json({
      message: 'Bread updated successfully',
      bread: bread,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBreads,
  getBread,
  createBread,
  deleteBread,
  updateBread,
};
