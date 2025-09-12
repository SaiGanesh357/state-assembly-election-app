const Candidate = require('../models/Candidate');

function formatCandidate(doc) {
  if (!doc) return null;
  return {
    candidateId: doc.candidateId, // keep consistent naming
    name: doc.name,
    party: doc.party,
    constituency: doc.constituency,
    _id: doc._id // optional MongoDB id
  };
}

exports.create = async (req, res) => {
  try {
    const { candidateId, name, party, constituency } = req.body;
    if (!candidateId || !name || !party || !constituency) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const exists = await Candidate.findOne({ candidateId });
    if (exists) return res.status(409).json({ error: 'Candidate with this id already exists' });

    const doc = new Candidate({ candidateId, name, party, constituency });
    await doc.save();
    res.status(201).json(formatCandidate(doc));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const docs = await Candidate.find().sort({ createdAt: -1 });
    res.json(docs.map(formatCandidate));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params; // this is candidateId
    const { name, party, constituency } = req.body;

    const updated = await Candidate.findOneAndUpdate(
      { candidateId: id },
      { name, party, constituency },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Candidate not found' });
    res.json(formatCandidate(updated));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params; // candidateId
    const deleted = await Candidate.findOneAndDelete({ candidateId: id });
    if (!deleted) return res.status(404).json({ error: 'Candidate not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
