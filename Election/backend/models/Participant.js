// Participant.js
const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  participantId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number },
  constituency: { type: String },
  hasVoted: { type: Boolean, default: false } // ✅ still useful to avoid double voting
}, { timestamps: true });

module.exports = mongoose.model('Participant', ParticipantSchema);
