const express = require('express')
const {
  getBreads, 
  getBread, 
  createBread, 
  deleteBread, 
  updateBread
} = require('../controllers/breadController')

const router = express.Router()

// GET all breads
router.get('/', getBreads)

// GET a single bread
router.get('/:id', getBread)

// POST a new bread
router.post('/', createBread)

// DELETE a bread
router.delete('/:bcode', deleteBread)

// UPDATE a bread
router.put('/:bcode', updateBread)

module.exports = router