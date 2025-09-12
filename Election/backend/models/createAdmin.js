const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const email = 'admin@example.com'; // change if needed
    const password = 'admin123';       // change if needed

    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log('⚠️ Admin already exists');
      process.exit(0);
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();
    console.log('✅ Admin created successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
