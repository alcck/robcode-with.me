const express = require('express');
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user (Student or Teacher)
// @access  Public
router.post('/register', (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // TODO: Add registration logic (hashing password, saving user to database)
        
        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully',
            user: { name, email, role }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get JWT token
// @access  Public
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        // TODO: Add login logic (verify credentials, generate JWT)
        
        res.status(200).json({ 
            success: true, 
            message: 'Logged in successfully',
            token: 'mock-jwt-token-xyz' 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;