const express = require('express')
const {
  getPastries, 
  getPastry, 
  createPastry, 
  deletePastry, 
  updatePastry
} = require('../controllers/pastryController')

const router = express.Router()

// GET all pastries
router.get('/', getPastries)

// GET a single pastry
router.get('/:id', getPastry)

// POST a new pastry
router.post('/', createPastry)

// DELETE a pastry
router.delete('/:id', deletePastry)

// UPDATE a pastry
router.patch('/:id', updatePastry)

module.exports = router