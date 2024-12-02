const path = require('path');
const User = require('../models/userModel');

// Serve the login page (for front-end users)
const showRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/login.html'));
};

// Handle registration form submissions (for HTML forms)
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already registered.');
        }

        // Create a new user and save it to the database
        const user = new User({ name, email, password, role });
        await user.save();
        console.log('User created:', user);

        // Redirect to the login page after successful registration
        res.sendFile(path.join(__dirname, '../../frontend/login.html'));
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).send('Error during registration');
    }
};
//Handle User Login
const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Email not found. Please register or try again.' });
        }

        if (user.password === password && user.role === role) {
            const redirectUrl = user.role === 'admin' ? '/cafe.html' : '/employeego.html';
            return res.status(200).json({ redirectUrl });
        }

        return res.status(400).json({ error: 'Incorrect password or role. Please try again.' });
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ error: 'An error occurred during login. Please try again later.' });
    }
};


// Handle account creation for API (for Postman)
const createAccount = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered.' });
        }

        // Create a new user and save it to the database
        const user = new User({ name, email, password, role });
        await user.save();
        console.log('User created:', user);

        // Return a success message and user details (excluding password)
        return res.status(201).json({
            message: 'Account created successfully!',
            user: { name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        console.error('Error during account creation:', err);
        return res.status(500).json({ message: 'Error during account creation' });
    }
};

module.exports = {
    showRegisterPage,
    registerUser,
    loginUser,
    createAccount, // New method for Postman API route
};
