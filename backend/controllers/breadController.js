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

// Get a single bread
const getBread = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such bread' });
  }

  try {
    const bread = await Bread.findById(id);

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

// Delete a bread
const deleteBread = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such bread' });
  }

  try {
    const bread = await Bread.findOneAndDelete({ _id: id });

    if (!bread) {
      return res.status(404).json({ error: 'No such bread' });
    }

    res.status(200).json(bread);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a bread
const updateBread = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such bread' });
  }

  try {
    const bread = await Bread.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!bread) {
      return res.status(404).json({ error: 'No such bread' });
    }

    res.status(200).json(bread);
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
