const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load .env at the VERY top
dotenv.config();

const authRoutes = require('./routes/auth');
const voteRoutes = require('./routes/vote');
const adminRoutes = require('./routes/admin');
const voterRoutes = require('./routes/voter');
const candidateRoutes = require('./routes/candidateRoutes');
const participantRoutes = require('./routes/participantRoutes');
const electionRoutes = require('./routes/electionRoutes');
const resultsRoute = require('./routes/results');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/vote', voteRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/voters', voterRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/participants', participantRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api', resultsRoute);

// --- DEBUG YOUR ENV VARIABLE ---
console.log('MongoDB connection URI:', process.env.MONGO_URI);
if (!process.env.MONGO_URI) {
    console.error('ERROR: MONGO_URI is undefined. Did you set it in the .env file and restart the server?');
    process.exit(1); // Exit so you don't keep failing
}

// --- DB Connect with More Options ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,   // Only add if you are using older mongoose & need it
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
    console.error('❌ MongoDB error:', err);
    process.exit(1); // Optional: stop the server on DB failure
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
