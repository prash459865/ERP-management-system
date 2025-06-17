import jwt from "jsonwebtoken"
import Student from "../models/students.js"
import Faculty from "../models/faculties.js"
import Admin from  "../models/admin.js"

const protectedRoute = async (req,res,next) =>{
    try {
        const token = req.cookies.token;
        // console.log(token,"from authMiddleware")
        if(!token)
        {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Student.findById(decoded.userId).select("-password")||
                     await Faculty.findById(decoded.userId).select("-password")||
                     await Admin.findById(decoded.userId).select("-password");
        // console.log(user,"from authMiddleware")
        if(!user)
        {
             return res.status(401).json({ error: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
         console.log("Error in protecteRoute:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

export default protectedRoute;