// Load environment variables first!
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const voteRoutes = require('./routes/vote');
const adminRoutes = require('./routes/admin');
const voterRoutes = require('./routes/voter');
const candidateRoutes = require('./routes/candidateRoutes');
const participantRoutes = require('./routes/participantRoutes');
const electionRoutes = require('./routes/electionRoutes');
const resultsRoute = require('./routes/results');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api/vote', voteRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/voters', voterRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/participants', participantRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api', resultsRoute);

// --- Debug: Print ENV URI just before connect ---
console.log('MongoDB connection URI:', process.env.MONGO_URI);

// Exit if missing
if (!process.env.MONGO_URI) {
  console.error('ERROR: MONGO_URI is undefined! Please set it in your .env file and restart.');
  process.exit(1);
}

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
