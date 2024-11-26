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

// Get a single coffee by ccode
const getCoffee = async (req, res) => {
  const { ccode } = req.params;

  try {
    const coffee = await Coffee.findOne({ ccode });

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

// Delete a coffee by ccode
const deleteCoffee = async (req, res) => {
  const { ccode } = req.params;

  try {
    const coffee = await Coffee.findOneAndDelete({ ccode });

    if (!coffee) {
      return res.status(404).json({ error: 'No such coffee' });
    }

    res.status(200).json({
      message: 'Coffee deleted successfully',
      coffee: coffee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a coffee by ccode
const updateCoffee = async (req, res) => {
  const { ccode } = req.params;
  const { coffeename, stocks } = req.body;

  try {
    const coffee = await Coffee.findOneAndUpdate(
      { ccode },
      { $set: { coffeename, stocks } },
      { new: true, runValidators: true }
    );

    if (!coffee) {
      return res.status(404).json({ error: 'No such coffee' });
    }

    res.status(200).json({
      message: 'Coffee updated successfully',
      coffee: coffee,
    });
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
