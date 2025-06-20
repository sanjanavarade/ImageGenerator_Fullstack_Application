import mongoose from 'mongoose';

const connectDB = async (url) => {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(url);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ Failed to connect with MongoDB');
    console.error(err.message);
  }
};

export default connectDB;