import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://127.0.0.1:27017/futurx"
      // "mongodb+srv://shyamkumaratech:nfNhQt6qbMlkIMCh@cluster0.vqg0cns.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
