const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const poemController = require('../controllers/poemController');

// Get a specific poem by ID
router.get('/poems/:id', verifyToken, poemController.getPoemById);

// Create a new poem
router.post('/poems', verifyToken, poemController.createPoem);

// Update an existing poem
router.put('/poems/:id', verifyToken, poemController.updatePoem);

// Delete a poem
router.delete('/poems/:id', verifyToken, poemController.deletePoem);

// Get the written date of a specific poem
router.get('/poems/:id/writtenDate', verifyToken, poemController.getWrittenDate);

// Get all poems associated with the authenticated user
router.get('/poems/user/:userId', verifyToken, poemController.getPoemsByUserId);

module.exports = router;
