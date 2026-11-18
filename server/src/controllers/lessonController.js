const Lesson = require('../models/Lesson');

// Get all lessons
exports.getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find().sort({ createdAt: -1 });
        res.json(lessons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single lesson by ID
exports.getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found.' });
        }
        res.json(lesson);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new lesson (Restricted to teachers via middleware)
exports.createLesson = async (req, res) => {
    try {
        const { title, description, content, starterCode, difficulty } = req.body;

        const newLesson = new Lesson({
            title,
            description,
            content,
            starterCode,
            difficulty,
            createdBy: req.user.id // Injected by authMiddleware
        });

        const savedLesson = await newLesson.save();
        res.status(201).json(savedLesson);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};