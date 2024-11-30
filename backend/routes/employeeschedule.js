const express = require('express')
const {
  getEmployeessched, 
  getEmployeesched, 
  createEmployeesched, 
  deleteEmployeesched, 
  updateEmployeesched,
} = require('../controllers/employeescheduleController')

const router = express.Router()

// GET all employees position
router.get('/', getEmployeessched)

// GET a single employee position
router.get('/:id', getEmployeesched)

// POST a new employee position
router.post('/', createEmployeesched)

// DELETE a employee position
router.delete('/:employeename', deleteEmployeesched)

// UPDATE a employee position
router.put('/:employeename', updateEmployeesched);


module.exports = router