const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from a .env file

// Import Route Handlers
const authRoutes = require('./routes/authRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const codeRoutes = require('./routes/codeRoutes');

// Initialize Express App
const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing for frontend communication
app.use(express.json()); // Parses incoming JSON requests

// Base Health Check Route
app.get('/', (req, res) => {
    status: 'online',
    message: 'EdTech Coding Sandbox API is running successfully! 🚀',
    timestamp: new Date()
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/code', codeRoutes);

// Global Error Handling Middleware (optional safety net)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        error: 'Internal Server Error',
        message: err.message 
    });
});

// Define Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🟢`);
});