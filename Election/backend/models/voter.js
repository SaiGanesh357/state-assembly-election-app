const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const voterSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  voterId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  constituency: { type: String, required: true },
  hasVoted: { type: Boolean, default: false }
});

voterSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

voterSchema.methods.comparePassword = function(pw) {
  return bcrypt.compare(pw, this.password);
};

module.exports = mongoose.model('Voter', voterSchema);
