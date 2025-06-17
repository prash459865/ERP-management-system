import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role:{type:String, default:"admin"}
    
});



export default mongoose.model("Admin", adminSchema);
