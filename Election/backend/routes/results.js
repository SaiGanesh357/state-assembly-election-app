const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// GET /api/results
router.get('/results', async (req, res) => {
  try {
    const candidates = await Candidate.find({}, { name: 1, party: 1, votes: 1 });
    res.json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching results' });
  }
});

module.exports = router;
