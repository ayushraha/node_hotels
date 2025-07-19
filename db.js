const mongoose = require('mongoose');

//configure dotenv
require('dotenv').config();

const connectDB = async () => {
  try {
    //below is connection of local mongodb
    //await mongoose.connect('mongodb://127.0.0.1:27017/painting');

    //below is connection url of mongodb atlas
    //await mongoose.connect('mongodb+srv://aayushrahangdale727:aayushraha1234@cluster0.disjhii.mongodb.net/painting?retryWrites=true&w=majority');

    //dot env 
    await mongoose.connect(process.env.MONGODB_URL);

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB Connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
