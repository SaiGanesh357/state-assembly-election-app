
const mongoose = require('mongoose');

const ElectionSchema = new mongoose.Schema({
  electionId: { type: String, required: true, unique: true }, // matches frontend id
  name: { type: String, required: true },
  date: { type: Date, required: true },
  constituency: { type: String },
  isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Election', ElectionSchema);
