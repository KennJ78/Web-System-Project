const Coffee = require('../models/coffee');

// Get all coffee ingredients
const getCoffees = async (req, res) => {
  try {
    const coffees = await Coffee.find({}).sort({ createdAt: -1 });
    res.status(200).json(coffees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single coffee ingredient by ccode
const getCoffee = async (req, res) => {
  const { ccode } = req.params;

  try {
    const coffee = await Coffee.findOne({ ccode });

    if (!coffee) {
      return res.status(404).json({ error: 'No such coffee ingredient' });
    }

    res.status(200).json(coffee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new coffee ingredient
const createCoffee = async (req, res) => {
  const { ccode, coffeename, stocks } = req.body;

  try {
    const coffee = await Coffee.create({ ccode, coffeename, stocks });
    res.status(201).json(coffee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a coffee ingredient by ccode
const deleteCoffee = async (req, res) => {
  const { ccode } = req.params;

  try {
    const coffee = await Coffee.findOneAndDelete({ ccode });

    if (!coffee) {
      return res.status(404).json({ error: 'No such coffee ingredient' });
    }

    res.status(200).json({
      message: 'Coffee ingredient deleted successfully',
      coffee: coffee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a coffee ingredient by ccode
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
      return res.status(404).json({ error: 'No such coffee ingredient' });
    }

    res.status(200).json({
      message: 'Coffee ingredient updated successfully',
      coffee: coffee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Restock coffee (increase stock)
const restockCoffee = async (req, res) => {
  const { restockAmount } = req.body;
  const { ccode } = req.params;

  try {
    if (!ccode || !restockAmount) {
      return res.status(400).json({ error: 'ccode and restockAmount are required' });
    }

    const amount = parseInt(restockAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid restock amount' });
    }

    const coffee = await Coffee.findOne({ ccode });
    if (!coffee) {
      return res.status(404).json({ error: 'No such coffee ingredient' });
    }

    coffee.stocks += amount;
    await coffee.save();

    res.status(200).json({
      message: 'Coffee ingredient restocked successfully',
      coffee,
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
  restockCoffee,
};
