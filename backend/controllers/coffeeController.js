const Coffee = require('../models/coffee');
const mongoose = require('mongoose');

// Get all coffees
const getCoffees = async (req, res) => {
  try {
    const coffees = await Coffee.find({}).sort({ createdAt: -1 });
    res.status(200).json(coffees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single coffee
const getCoffee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such coffee' });
  }

  try {
    const coffee = await Coffee.findById(id);

    if (!coffee) {
      return res.status(404).json({ error: 'No such coffee' });
    }

    res.status(200).json(coffee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new coffee
const createCoffee = async (req, res) => {
  const { ccode, coffeename, stocks } = req.body;

  try {
    const coffee = await Coffee.create({ ccode, coffeename, stocks });
    res.status(201).json(coffee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a coffee
const deleteCoffee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such coffee' });
  }

  try {
    const coffee = await Coffee.findOneAndDelete({ _id: id });

    if (!coffee) {
      return res.status(404).json({ error: 'No such coffee' });
    }

    res.status(200).json(coffee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a coffee
const updateCoffee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such coffee' });
  }

  try {
    const coffee = await Coffee.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!coffee) {
      return res.status(404).json({ error: 'No such coffee' });
    }

    res.status(200).json(coffee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCoffees,
  getCoffee,
  createCoffee,
  deleteCoffee,
  updateCoffee,
};
