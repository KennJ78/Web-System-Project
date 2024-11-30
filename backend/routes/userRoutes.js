const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Route for registration page
router.get('/', userController.showRegisterPage);

// Route for registration submission (HTML form)
router.post('/post', userController.registerUser);

// Route for login submission (HTML form)
router.post('/login', userController.loginUser);

// API route for creating a new account (Postman)
router.post('/api/create-account', userController.createAccount);

module.exports = router;
