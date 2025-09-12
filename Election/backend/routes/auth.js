// // routes/auth.js
// const express = require('express');
// const router = express.Router();
// const { registerVoter, loginVoter, loginAdmin } = require('../controllers/authController');

// // Voter
// router.post('/register', registerVoter);
// router.post('/login', loginVoter);

// // Admin
// router.post('/admin-login', loginAdmin);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { registerVoter, loginVoter, loginAdmin } = require('../controllers/authController');

// router.post('/register', registerVoter);
// router.post('/login', loginVoter);
router.post('/admin-login', loginAdmin);

module.exports = router;

// const express = require("express");
// const router = express.Router();
const { voterLogin } = require("../controllers/authController");

router.post("/login1", voterLogin);

module.exports = router;
