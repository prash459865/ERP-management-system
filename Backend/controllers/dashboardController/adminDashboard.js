import Admin from "../../models/admin.js"
import Student from "../../models/students.js"
import Faculty from "../../models/faculties.js";
import Class from "../../models/classes.js";
import Notice from "../../models/notice.js";


export const accessAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        return res.status(200).json({ students })

    } catch (error) {
        return res.status(500).json({ message: "Error fetching students", error });
    }

}

export const accessTeachers = async (req, res) => {
    try {
        const teachers = await Faculty.find();

        return res.status(200).json({ teachers })

    } catch (error) {
        return res.status(500).json({ message: "Error fetching teachers", error });
    }
}


export const createStudent = async (req, res) => {
    try {
        const formData = req.body;

        if (!formData) {
            return res.status(400).json({ success: false, message: "Missing formData in request body" });
        }

        let existingStudent = await Student.findOne({ adharNumber: formData.adharNumber });

        if (existingStudent) {
            return res.status(400).json({ success: false, message: "This student is already registered" });
        }

        const student = new Student({
            name: formData.name,
            rollNumber: formData.rollNumber,
            phone: formData.phone,
            password: formData.password,
            class: formData.class,
            session: formData.session,
            age: formData.age,
            adharNumber: formData.adharNumber,
            section: formData.section,
            fatherName: formData.fatherName,
            motherName: formData.motherName,
            address: formData.address,
            college: formData.college,
            profileImage: formData.profileImage,
        });


        const studentClass = await Class.findOne({ name: formData.class, section: formData.section });
        if (studentClass && studentClass.subjects.length > 0) {
            studentClass.subjects.forEach((subjectName) => {
                student.subjects.push({
                    subjectName: subjectName,
                    marks: {
                        UT1: null,
                        UT2: null,
                        HalfYearly: null,
                        UT3: null,
                        UT4: null,
                        Final: null,
                    }
                });
            });
        }

        await student.save();
        return res.status(201).json({ success: true, message: "Student created" });

    } catch (error) {
        console.error("Error in createStudent:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteStudent = async(req,res)=>{
     try {
        const {studentId} = req.body;
        if(!studentId)
        {
            return res.status(400).json({success:false,error:"Can not delete"})
        }
        console.log(studentId)
        await Student.findByIdAndDelete(studentId);
        return res.status(200).json({success:true,message:"Student deleted"})
     } catch (error) {
        console.error("Error in deleting student:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
     }
}


export const CreateTeacher = async (req, res) => {
    try {
        const formData = req.body;
        // console.log(formData,"from admin dashboard")
        if (!formData) {
            return res.status(400).json({ success: false, message: "Missing formData in request body" });
        }
        let existingTeacher = await Faculty.findOne({ adharNumber: formData.adharNumber });
        if (existingTeacher) {
            return res.status(400).json({ success: false, message: "This teacher is already registered" });
        }

        const teacher = new Faculty({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            adharNumber: formData.adharNumber,
            department: formData.department,
            designation: formData.designation,
            qualifications: formData.qualifications,
            subjects: formData.subjects,
            dateOfJoining: formData.dateOfJoining,
            address: formData.address,
            gender: formData.gender,
            dob: formData.dob

        })

        await teacher.save();
        return res.status(200).json({ success: true, message: "Teacher created" });

    } catch (error) {
        console.error("Error in createStudent:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const CreateClass = async (req, res) => {
    try {
        const formData = req.body;
        if (!formData) {
            return res.status(400).json({ success: false, message: "Missing formData in request body" });
        }
        let existingTeacher = await Class.findOne({ name: formData.name, section: formData.section });
        if (existingTeacher) {
            return res.status(400).json({ success: false, message: "This class is already created" });
        }
        const newClass = new Class({
            name: formData.name,
            section: formData.section
        })

        await newClass.save();
        return res.status(200).json({ success: true, message: "Class created" });
    } catch (error) {
        console.error("Error in createStudent:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

}

export const AccessAllClasses = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(userId, "admin userId")
        const admin = await Admin.findById(userId) || await Faculty.findById(userId)
        if (!admin) {
            return res.status(400).json({ success: false, message: "not an admin" });
        }
        else {
            const allClasses = await Class.find();
            // console.log(allClasses,"bsjhkjbjksbkjcbakjbkjbkbkbb")
            return res.status(200).json({ success: true, message: "Teacher created", allClasses });
        }
    } catch (error) {
        console.error("Error in createStudent:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const updateLecture = async (req, res) => {
    try {
        const newLecture = req.body;  // assuming newLecture is sent directly, not nested
        console.log(newLecture.subjectName,"from admin dashboard")
        if (!newLecture || !newLecture._id) {
            return res.status(400).json({ success: false, message: "Lecture information missing or incomplete" });
        }

        const updateResult = await Class.updateOne(
            { "days.lectures._id": newLecture._id },
            {
                $set: {
                    "days.$[day].lectures.$[lecture].subjectName": newLecture.subjectName,
                    "days.$[day].lectures.$[lecture].faculty": newLecture.faculty,
                    "days.$[day].lectures.$[lecture].startTime": newLecture.startTime,
                    "days.$[day].lectures.$[lecture].endTime": newLecture.endTime,
                }
            },
            {
                arrayFilters: [
                    { "day.lectures._id": newLecture._id },
                    { "lecture._id": newLecture._id }
                ]
            }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "Lecture not found" });
        }

        const faculty = await Faculty.findOne({ name: newLecture.faculty })
        console.log(faculty, "from saving appointment 1")
        if (!faculty) {
            return res.status(404).json({ success: false, message: "faculty not found" });
        }

        console.log(newLecture, "from saving appointment 1.5")

        const updateAppointment = faculty.week[newLecture.day] || []
        if (!updateAppointment.includes(`${newLecture.nameAndSection},${newLecture.period}`)) {
            faculty.week[newLecture.day] = [...updateAppointment, `${newLecture.period},${newLecture.nameAndSection},${newLecture.subjectName}`]
        }
        faculty.markModified('week');
        await faculty.save();
        res.status(200).json({ success: true, message: "Lecture updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const createNotice = async (req, res) => {
    const { notice, selfId } = req.body;

    if (!notice || !selfId) {
        return res.status(400).json({ success: false, message: "Missing notice content or admin ID." });
    }
    try {
        const adminExists = await Admin.findById(selfId);
        if (!adminExists) {
            return res.status(404).json({ success: false, message: "Admin not found." });
        }

        const newNotice = new Notice({
            notice: notice
        });

        await newNotice.save();

        return res.status(201).json({ success: true, message: "Notice posted successfully", notice: newNotice });

    } catch (error) {
        console.error("Error posting notice:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const accessNotice = async (req, res) => {
    const { selfId } = req.body;
    console.log(selfId, "accessNotice hitted")
    try {
        const admin = await Admin.findById(selfId) || Faculty.findById(selfId) || Student.findById(selfId);
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        const notices = await Notice.find().sort({ createdAt: -1 }); // latest first
        return res.status(200).json({ success: true, message: "Notices fetched", notices });
    } catch (error) {
        console.error("Error accessing notices:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


export const deleteNotice = async (req, res) => {
    const { selfId, noticeId } = req.body;
    console.log(selfId, "deleteNotice hitted")
    try {
        const admin = await Admin.findById(selfId);
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        const notice = await Notice.findById(noticeId);
        if (!notice) {
            return res.status(404).json({ success: false, message: "Notice not found" });
        }

        await Notice.findByIdAndDelete(noticeId);

        return res.status(200).json({ success: true, message: "Notice deleted successfully" });
    } catch (error) {
        console.error("Error deleting notice:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


export const addSubjectToClass = async (req, res) => {
    const { selfId, classId, className, subjectName } = req.body;

    if (!selfId || !classId || !subjectName) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        const admin = await Admin.findById(selfId);
        if (!admin) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        const particularClass = await Class.findById(classId);
        if (!particularClass) {
            return res.status(404).json({ success: false, message: "Class not found" });
        }
        if (particularClass.subjects.includes(subjectName)) {
            return res.status(200).json({ success: false, message: "Subject is already added", class: particularClass });
        }
        particularClass.subjects.push(subjectName);
        await particularClass.save();

        const students = await Student.find({
            class: className.class,
            section: className.section
        })
        await Promise.all(
            students.map(student => {
                student.subjects.push({
                    subjectName: subjectName,
                    marks: {
                        UT1: null,
                        UT2: null,
                        HalfYearly: null,
                        UT3: null,
                        UT4: null,
                        Final: null
                    }
                });
                return student.save();
            })
        );

        return res.status(200).json({ success: true, message: "Subject added successfully", subjects: particularClass.subjects });
    } catch (error) {
        console.error("Error adding subject:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const accessParticularClass = async (req, res) => {
    const { classId } = req.body;
    // console.log(classId,"accessParticularClass")
    try {
        if (!classId) {
            return res.status(400).json({ success: false, message: "no class found" })
        }
        const classdetail = await Class.findById(classId)
        return res.status(200).json({ success: true, classdetail })
    } catch (error) {
        console.error("Error adding subject:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

