const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

let electionSchedule = {
  start: null,
  end: null,
};

// Login Admin
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      adminId: admin._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Set Election Schedule
exports.setElectionDate = (req, res) => {
  const { start, end } = req.body;
  if (!start || !end) {
    return res.status(400).json({ message: 'Start and end date required' });
  }
  electionSchedule = { start: new Date(start), end: new Date(end) };
  res.status(200).json({ message: 'Election scheduled successfully', electionSchedule });
};

//  Check Election Status
exports.getElectionStatus = (req, res) => {
  const now = new Date();
  const isActive =
    electionSchedule.start &&
    electionSchedule.end &&
    now >= electionSchedule.start &&
    now <= electionSchedule.end;

  res.status(200).json({
    votingOpen: !!isActive,
    schedule: electionSchedule,
  });
};
