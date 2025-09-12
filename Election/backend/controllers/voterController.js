const Voter = require('../models/Voter');

exports.getAllVoters = async (req, res) => {
  try {
    const voters = await Voter.find().select('-password');
    res.status(200).json(voters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch voters' });
  }
};

exports.getVoterById = async (req, res) => {
  try {
    const voter = await Voter.findById(req.params.id).select('-password');
    if (!voter) return res.status(404).json({ message: 'Voter not found' });
    res.json(voter);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching voter' });
  }
};

exports.deleteVoter = async (req, res) => {
  try {
    const result = await Voter.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Voter not found' });
    res.json({ message: 'Voter deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete voter' });
  }
};
