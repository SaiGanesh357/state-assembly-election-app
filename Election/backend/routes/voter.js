const express = require('express');
const router = express.Router();
const { getAllVoters, deleteVoter, getVoterById } = require('../controllers/voterController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// View all voters
router.get('/', verifyToken, isAdmin, getAllVoters);

// View single voter
router.get('/:id', verifyToken, isAdmin, getVoterById);

// Delete voter
router.delete('/:id', verifyToken, isAdmin, deleteVoter);

module.exports = router;
