const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/painting');
    console.log('MongoDB Connected!');
  } catch (error) {
    console.error('MongoDB Connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
