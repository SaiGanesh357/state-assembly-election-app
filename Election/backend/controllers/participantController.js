const Participant = require('../models/Participant');

function formatParticipant(doc){
  if(!doc) return null;
  return {
    id: doc.participantId,
    name: doc.name,
    age: doc.age,
    constituency: doc.constituency,
    hasVoted: doc.hasVoted,
    _id: doc._id
  };
}

exports.create = async (req, res) => {
  try {
    const { participantId, name, age, constituency } = req.body;
    if(!participantId || !name) return res.status(400).json({ error: 'Missing id or name' });

    const exists = await Participant.findOne({ participantId});
    if (exists) return res.status(409).json({ error: 'Participant with this id exists' });

    const doc = new Participant({ participantId, name, age, constituency });
    await doc.save();
    res.status(201).json(formatParticipant(doc));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const docs = await Participant.find().sort({ createdAt: -1 });
    res.json(docs.map(formatParticipant));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, constituency, hasVoted } = req.body;
    const updated = await Participant.findOneAndUpdate(
      { participantId: id },
      { name, age, constituency, hasVoted },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Participant not found' });
    res.json(formatParticipant(updated));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Participant.findOneAndDelete({ participantId: id });
    if (!deleted) return res.status(404).json({ error: 'Participant not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
