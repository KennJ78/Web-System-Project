const express = require('express');
const coffeeController = require('../controllers/coffeeController');

const router = express.Router();

// Get all coffee ingredients
router.get('/', coffeeController.getCoffees);

// Get a single coffee ingredient by ccode
router.get('/:ccode', coffeeController.getCoffee);

// Create a new coffee ingredient
router.post('/', coffeeController.createCoffee);

// Delete a coffee ingredient by ccode
router.delete('/:ccode', coffeeController.deleteCoffee);

// Update a coffee ingredient by ccode
router.put('/:ccode', coffeeController.updateCoffee);

// Restock coffee (increase stock) by ccode
router.put('/:ccode/restock', coffeeController.restockCoffee);

module.exports = router;
