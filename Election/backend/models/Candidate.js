const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  candidateId: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  party: { type: String },
  constituency: { type: String },
  votes: { type: Number, default: 0 } // ✅ added votes count
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);
