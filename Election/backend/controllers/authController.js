const Voter = require('../models/Voter');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};


exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }
    const token = generateToken(admin._id, 'admin');
    res.status(200).json({ token, admin });
  } catch (err) {
    res.status(500).json({ message: 'Admin login failed', error: err.message });
  }
};

// controllers/authController.js
// const jwt = require("jsonwebtoken");
const Participant = require("../models/Participant");

exports.voterLogin = async (req, res) => {
  try {
    const { participantId, name } = req.body;
    if (!participantId || !name) {
      return res.status(400).json({ message: "Voter ID and Name are required" });
    }

    const voter = await Participant.findOne({ participantId, name });
    if (!voter) return res.status(401).json({ message: "Invalid Voter ID or Name" });

    // Include role in JWT
    const token = jwt.sign(
      { id: voter._id, participantId: voter.participantId, name: voter.name, role: "voter" },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      voter: {
        id: voter._id,
        participantId: voter.participantId,
        name: voter.name,
        constituency: voter.constituency,
        hasVoted: voter.hasVoted || false
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
