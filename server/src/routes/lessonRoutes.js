const express = require('express');
const router = express.Router();
// const { verifyToken, isTeacher } = require('../middleware/authMiddleware'); // Optional for protection

// @route   GET /api/lessons
// @desc    Get all available coding lessons/modules
// @access  Private/Public
router.get('/', (req, res) => {
    try {
        // TODO: Fetch lessons from the database
        res.status(200).json({ 
            success: true, 
            lessons: [
                { id: 1, title: 'Introduction to Variables', difficulty: 'Beginner' },
                { id: 2, title: 'Loops and Conditions', difficulty: 'Intermediate' }
            ] 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// @route   GET /api/lessons/:id
// @desc    Get a single lesson by ID
// @access  Private
router.get('/:id', (req, res) => {
    try {
        const lessonId = req.params.id;
        // TODO: Fetch single lesson details from database
        res.status(200).json({ 
            success: true, 
            lesson: { id: lessonId, title: 'Sample Lesson', content: 'Lesson description here...' } 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// @route   POST /api/lessons
// @desc    Create a new lesson (Teacher / Admin only)
// @access  Private (Teacher)
router.post('/', (req, res) => {
    try {
        const { title, description, starterCode, testCases } = req.body;
        // TODO: Save new lesson to database
        res.status(201).json({ 
            success: true, 
            message: 'Lesson created successfully',
            lesson: { title, description } 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;