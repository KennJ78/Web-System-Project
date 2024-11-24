const path = require('path');
const User = require('../models/userModel');

// Serve the login page
const showRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/login.html'));
};

// Handle registration form submissions
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = new User({ name, email, password, role });
        await user.save();
        console.log(user);
        res.sendFile(path.join(__dirname, '../../frontend/login.html'));
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).send('Error during registration');
    }
};

// Handle login form submissions
const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log('Email not found');
            return res.sendFile(path.join(__dirname, '../../frontend/login.html'), {
                error: 'Email not found. Please register or try again.',
            });
        }

        if (user.password === password && user.role === role) {
            if (user.role === 'admin') {
                console.log('Admin login successful');
                return res.sendFile(path.join(__dirname, '../../frontend/bread.html'));
            } else if (user.role === 'employee') {
                console.log('Employee login successful');
                return res.sendFile(path.join(__dirname, '../../frontend/employeego.html'));
            }
        }

        console.log('Incorrect password or role');
        return res.sendFile(path.join(__dirname, '../../frontend/login.html'), {
            error: 'Incorrect password or role. Please try again.',
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.sendFile(path.join(__dirname, '../../frontend/login.html'));
    }
};

module.exports = {
    showRegisterPage,
    registerUser,
    loginUser,
};
