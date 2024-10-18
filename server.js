const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3040

const app = express()

// Set the 'public' directory for static assets
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

// Connection on MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/CMS')
const db = mongoose.connection
db.once('open', () => {
    console.log('Mongodb connection successful')
})


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
})
const Users = mongoose.model('CMS', userSchema)

// Serve the registration page (static HTML)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register.html'))
})

// Handles registration form submissions
app.post('/post', async (req, res) => {
    const { name, email, password, role } = req.body
    const user = new Users({ name, email, password,role })
    await user.save()
    console.log(user)
    res.sendFile(path.join(__dirname, 'public/login.html'))
})

// Handles login form submissions with validation
app.post('/login', async (req, res) => {
    const { email, password,role } = req.body
    try {
        // Checks if the user exists in the database by email
        const user = await Users.findOne({ email })
        if (!user) {
            // If the email is not found, send an error message
            console.log('Email not found')
            return res.sendFile(path.join(__dirname, 'public/login.html'), {
                error: 'Email not found. Please register or try again.'
            })
        }

        // Check if the password matches
        if (user.password !== password) {
            console.log('Incorrect password')
            return res.sendFile(path.join(__dirname, 'public/login.html'), {
                error: 'Incorrect password. Please try again.'
            })
        }

        if (user.role !== role) {
            console.log('Incorrect role')
            return res.sendFile(path.join(__dirname, 'public/login.html'), {
                error: 'Incorrect role. Please try again.'
            })
        }

        // If both email and password are correct, redirect to the main page
        console.log('Login successful')
        res.sendFile(path.join(__dirname, 'public/cafe.html'))

    } catch (err) {
        console.log('Error during login:', err)
        res.sendFile(path.join(__dirname, 'public/login.html'))
    }
})


// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
