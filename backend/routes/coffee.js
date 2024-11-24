const express = require('express')
const {
  getCoffees, 
  getCoffee, 
  createCoffee, 
  deleteCoffee, 
  updateCoffee
} = require('../controllers/coffeeController')

const router = express.Router()

// GET all coffees
router.get('/', getCoffees)

// GET a single coffee
router.get('/:id', getCoffee)

// POST a new coffee
router.post('/', createCoffee)

// DELETE a coffee
router.delete('/:id', deleteCoffee)

// UPDATE a coffee
router.patch('/:id', updateCoffee)

module.exports = router