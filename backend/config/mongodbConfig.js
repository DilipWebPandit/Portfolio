import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/portfolio`);
    console.log("Database connected");

    mongoose.connection.on("error", (err) => {
      console.log("Database connection error", err);
    });
  } catch (error) {
    console.log("Failed to connected Database", error);
  }
};

export default connectDB;
