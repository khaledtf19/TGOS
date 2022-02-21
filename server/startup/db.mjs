import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function dbConnection() {
  const connectionString = process.env.MONGODB_URI;

  mongoose.connect(connectionString).then(() => {
    console.log("Connected to the DB");
  });
}
