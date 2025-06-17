import Student from "../../models/students.js";
import Class from "../../models/classes.js";

export const accessStudentdetails = async(req,res)=>{
     const { selfId } = req.body;
        if (!selfId) {
            return res.status(400).json({ success: false, message: "Student ID not provided" });
        }
    
        try {
            const details = await Student.findById(selfId).select('-password');
            if (!details) {
                return res.status(404).json({ success: false, message: "student not found" });
            }
    
            return res.status(200).json({ success: true, message: "Faculty details found", details });
    
        } catch (error) {
            console.error("Error fetching faculty details:", error);
            return res.status(500).json({ success: false, message: "Server error" });
        }
}

export const accessTimeTable = async(req,res)=>{
    const {selfdata} = req.body;
    if(!selfdata)
    {
        return res.status(400).json({ success: false, message: "ID not provided" });
    }
    try {
       const className = selfdata.class;
       const section = selfdata.section;

       const particularClass = await Class.findOne({name:className,section:section})
       if(!particularClass)
       {
        return res.status(404).json({ success: false, message: "Class not found" });
       }
       
       res.status(200).json({success:true,timeTable:particularClass.days})


    } catch (error) {
        
    }
}