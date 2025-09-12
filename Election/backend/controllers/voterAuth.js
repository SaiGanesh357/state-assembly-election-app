const jwt = require("jsonwebtoken");
const Voter = require("../models/Voter");

exports.voterLogin = async (req, res) => {
  try {
    const { voterId, name } = req.body;

    if (!voterId || !name) {
      return res.status(400).json({ message: "Voter ID and Name are required" });
    }

    const voter = await Voter.findOne({ voterId, name });

    if (!voter) {
      return res.status(401).json({ message: "Invalid Voter ID or Name" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: voter._id, voterId: voter.voterId, name: voter.name },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
