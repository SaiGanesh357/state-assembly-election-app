

const express = require('express');
const router = express.Router();
const { setElectionDate, getElectionStatus } = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const Admin = require('../models/Admin');


const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // use .env in production

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 🔐 Generate token with role 'admin'
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token, // 🔁 return token to use in Authorization header
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// POST /api/admin/create (Register New Admin)
router.post('/create', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Admin already exists' });

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (err) {
    res.status(500).json({ message: 'Error creating admin', error: err.message });
  }
});

// // Admin Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const admin = await Admin.findOne({ email });
//     if (!admin || admin.password !== password) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }
//     res.status(200).json({ message: 'Login successful', adminId: admin._id });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

router.post('/schedule', verifyToken, isAdmin, setElectionDate);
router.get('/status', getElectionStatus);


module.exports = router;
