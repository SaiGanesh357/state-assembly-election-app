
const Election = require('../models/Election');

function formatElection(doc){
  if(!doc) return null;
  return {
    id: doc.electionId,
    name: doc.name,
    date: doc.date,
    constituency: doc.constituency,
    isCompleted: doc.isCompleted,
    _id: doc._id
  };
}

exports.create = async (req, res) => {
  try {
    const { electionId, name, date, constituency } = req.body;  // ✅ fixed
    if(!electionId || !name || !date || !constituency) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const exists = await Election.findOne({ electionId });
    if (exists) return res.status(409).json({ error: 'Election with this id exists' });

    const doc = new Election({ 
      electionId, 
      name, 
      date: new Date(date), 
      constituency 
    });

    await doc.save();
    res.status(201).json(formatElection(doc));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const docs = await Election.find().sort({ date: -1 });
    res.json(docs.map(formatElection));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;  // still frontend id
    const { name, date, constituency, isCompleted } = req.body;

    const updated = await Election.findOneAndUpdate(
      { electionId: id },
      { 
        name, 
        date: date ? new Date(date) : undefined, 
        constituency, 
        isCompleted 
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Election not found' });
    res.json(formatElection(updated));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Election.findOneAndDelete({ electionId: id });
    if(!deleted) return res.status(404).json({ error: 'Election not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
