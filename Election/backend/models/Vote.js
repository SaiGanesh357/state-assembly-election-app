const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  voterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Voter', required: true, unique: true },
  candidate: { type: String, required: true },
  constituency: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vote', voteSchema);