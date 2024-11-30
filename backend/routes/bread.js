const express = require('express');
const breadController = require('../controllers/breadController');

const router = express.Router();

router.get('/', breadController.getBreads);
router.get('/:bcode', breadController.getBread);
router.post('/', breadController.createBread);
router.delete('/:bcode', breadController.deleteBread);
router.put('/:bcode', breadController.updateBread);
router.put('/:bcode/restock', breadController.restockBread); // Restock by bcode

module.exports = router;
