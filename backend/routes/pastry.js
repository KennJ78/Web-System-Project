const express = require('express');
const pastryController = require('../controllers/pastryController');

const router = express.Router();

// Get all pastry items
router.get('/', pastryController.getPastries);

// Get a single pastry by pcode
router.get('/:pcode', pastryController.getPastry);

// Create a new pastry
router.post('/', pastryController.createPastry);

// Delete a pastry by pcode
router.delete('/:pcode', pastryController.deletePastry);

// Update a pastry by pcode
router.put('/:pcode', pastryController.updatePastry);

// Restock pastry (increase stock) by pcode
router.put('/:pcode/restock', pastryController.restockPastry);

module.exports = router;
