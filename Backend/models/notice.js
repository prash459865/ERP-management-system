import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    notice:{type:String}
},{
    timestamps:true
})

export default mongoose.model("Notice",noticeSchema)