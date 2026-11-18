const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'EdTech Sandbox API is running successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});