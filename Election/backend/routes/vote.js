// // routes/vote.js
// const express = require('express');
// const router = express.Router();
// const { castVote, getResults } = require('../controllers/voteController');
// const { verifyToken, isVoter } = require('../middleware/authMiddleware');

// router.post('/cast', verifyToken, isVoter, castVote);
// router.get('/results', getResults);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { castVote, getResults } = require('../controllers/voteController');
// const { verifyToken, isVoter } = require('../middleware/authMiddleware');

// router.post('/cast', verifyToken, isVoter, castVote);
// router.get('/results', getResults);

// module.exports = router;

const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");
const { verifyToken, isVoter } = require("../middleware/authMiddleware");

// Only logged-in voters can cast vote
router.post("/cast", verifyToken, isVoter, voteController.castVote);

// Public route to see results
// router.get("/results", voteController.getResults);
router.get('/api/results', voteController.getResults);

module.exports = router;
