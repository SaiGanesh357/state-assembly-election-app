const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const authRoutes = require('./routes/auth');
const voteRoutes = require('./routes/vote');
const adminRoutes = require('./routes/admin');
const voterRoutes = require('./routes/voter');
const candidateRoutes = require('./routes/candidateRoutes');
const participantRoutes = require('./routes/participantRoutes');
const electionRoutes = require('./routes/electionRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/vote', voteRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/voters', voterRoutes);
// app.use('/api', candidateRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/participants', participantRoutes);
app.use('/api/elections', electionRoutes);
const resultsRoute = require('./routes/results');
app.use('/api', resultsRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


