const express = require('express');
const { showRegisterPage, registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

// Route for registration page
router.get('/', showRegisterPage);

// Route for registration submission
router.post('/post', registerUser);

// Route for login submission
router.post('/login', loginUser);

module.exports = router;
