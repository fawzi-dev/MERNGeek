import mongoose from "mongoose";


export const connectDb = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => {
      process.exit(1);
      console.log(error)
    });

};