import mongoose from "mongoose";

const connectToDb = async () => {
  try {

    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

  } catch (error) {
    console.log("DB connection error:", error);
  }
};

export default connectToDb;