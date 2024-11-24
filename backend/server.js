require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const coffeeRoutes = require('./routes/coffee');
const pastryRoutes = require('./routes/pastry');
const employeepositionRoutes = require('./routes/employeeposition');
const employeescheduleRoutes = require('./routes/employeeschedule');
const userRoutes = require('./routes/userRoutes');
const breadRoutes = require('./routes/bread');

// Express app
const app = express();

app.use(cors());

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the `frontend` folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Log all incoming requests
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

// Routes
app.use('/', userRoutes);
app.use('/api/employeeposition', employeepositionRoutes);
app.use('/api/employeeschedule', employeescheduleRoutes);
app.use('/api/pastry', pastryRoutes);
app.use('/api/coffee', coffeeRoutes);
app.use('/api/bread', breadRoutes);
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/register.html'));
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server listening on port', process.env.PORT);
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });
