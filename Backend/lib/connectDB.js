import mongoose from "mongoose"

const connectDB = async(URL) =>{
  try {
    await mongoose.connect(URL);
    console.log("DB connected")
  } catch (error) {
      console.log("error in connecting database",error);
  }
} 

export default connectDB