import Faculty from "../../models/faculties.js";
import Student from "../../models/students.js";

export const accessTeacherDetail = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "Faculty ID not provided" });
    }

    try {
        const details = await Faculty.findById(id).select('-password');
        if (!details) {
            return res.status(404).json({ success: false, message: "Faculty not found" });
        }

        const today = new Date().toISOString().split('T')[0];
        const updatedDate = new Date(details.updatedAt).toISOString().split('T')[0];

        if (today !== updatedDate) {
            details.markedClassNames = [];
            details.updatedAt = new Date();
            await details.save(); // Only save when changed
        }

        return res.status(200).json({ success: true, message: "Faculty details found", details });

    } catch (error) {
        console.error("Error fetching faculty details:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


export const accessStudentsClassWise = async (req, res) => {
    try {
        console.log("accessStudentsClassWise hitted 1")
        const {className} = req.body;
        if(!className)
        {
            return res.status(400).json({success:false,message:"not found"})
        }
        const match = className.match(/^(\d+)([A-za-z]+)$/)
        const classNumber = match[1];
        const classSection = match[2];
        console.log(className, classSection, "accessStudentsClassWise 2")
        // Fetch students matching class and section
        const students = await Student.find({
            class: classNumber,
            section: classSection,
        });

        // If no students found
        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }
        console.log(students,"from acces studrnts classwise")
        // Success
        res.status(200).json({success:true,students});
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const markClassAttendance = async (req, res) => {
    const { lectureDetails, selfId, allAttendance } = req.body;

    try {
        const updatePromises = Object.entries(allAttendance).map(
            async ([studentId, attendance]) => {

                const student = await Student.findById(studentId)
                const alreadyExists = student.attendance.some(p => (p.date === attendance.date && p.period === lectureDetails[0]))
                if (!alreadyExists) {
                    student.attendance.push({
                        date: attendance.date,
                        status: attendance.status,
                        subjectName: lectureDetails[2],
                        period: lectureDetails[0]

                    })

                }
                await student.save()

            }

        );
        await Promise.all(updatePromises);
        const faculty = await Faculty.findById(selfId);

        if (faculty && !faculty.markedClassNames.includes(`${lectureDetails[0]},${lectureDetails[1]},${lectureDetails[2]}`)) {
            await Faculty.findByIdAndUpdate(selfId, {
                $push: {
                    markedClassNames: `${lectureDetails[0]},${lectureDetails[1]},${lectureDetails[2]}`
                }
            }, { new: true });
        }
        res.status(200).json({success:true, message: 'Attendance marked for all students.' });
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ message: 'Failed to mark attendance.' });
    }
};

export const accessStudentMarks = async (req, res) => {
    const { studentId } = req.body;


    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" })
        }

        return res.status(200).json({ success: true, student })

    } catch (error) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

export const submitOrEditMarks = async (req, res) => {
    const { marks, studentId, teacherId } = req.body
    // console.log(marks,studentId,teacherId,"submitOrEditMarks hitted")
    if (!marks || !studentId || !teacherId) {
        return res.status(400).json({ success: false, message: "Not Allowed" })
    }
    try {
        const teacher = await Faculty.findById(teacherId)
        if (!teacher) {
            return res.status(404).json({ success: false, message: "Not Allowed to Edit marks" })
        }
        const student = await Student.findById(studentId)
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" })
        }
        const subject = student.subjects.find(subject => subject.subjectName === marks.subjectName)
        {
            subject.marks.UT1 = marks.UT1 ?? subject.marks.UT1;
            subject.marks.UT2 = marks.UT2 ?? subject.marks.UT2;
            subject.marks.HalfYearly = marks.HalfYearly ?? subject.marks.HalfYearly;
            subject.marks.UT3 = marks.UT3 ?? subject.marks.UT3;
            subject.marks.UT4 = marks.UT4 ?? subject.marks.UT4;
            subject.marks.Final = marks.Final ?? subject.marks.Final;
        }
        await student.save();
        return res.status(200).json({ success: true, message: "Marks are updated" })
        //   console.log(subject,"from submitOrEditMarks")
    } catch (error) {
        console.error('Error in updating marks:', error);
        res.status(500).json({ error: 'Server error' });
    }

}

export const checkParticularAttendance = async (req, res) => {
    const { date, studentId, teacherId, subject,period } = req.body;
    // console.log(date,studentId,teacherId, subject,period,"checkParticularAttendance hitted after corretion")

    if (!date || !studentId || !teacherId || !subject || !period) {
        return res.status(400).json({ success: false, message: "Missing required data" });
    }

    try {
        const student = await Student.findById(studentId);
        const teacher = await Faculty.findById(teacherId);

        if (!student || !teacher) {
            return res.status(404).json({ success: false, message: "Student or Teacher not found" });
        }

        const particularAttendance = student.attendance.find((d) => (d.date === date && d.subjectName === subject && d.period === period));
        if (!particularAttendance) {
            return res.status(404).json({ success: false, message: "No attendance found for this date" });
        }

        return res.status(200).json({ success: true, status: particularAttendance.status });

    } catch (error) {
        console.error("Error checking attendance:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const editParticularAttendance = async(req,res)=>{
    const { date, studentId, teacherId,status, subject,period } = req.body;
    // console.log(date, studentId, teacherId, subject, period,status,"checkParticularAttendance hitted 2 after corretion");
   
    if (!date || !studentId || !teacherId ||!status || !subject || !period) {
        return res.status(400).json({ success: false, message: "Missing required data" });
    }
    try {
        const student = await Student.findById(studentId);
        const teacher = await Faculty.findById(teacherId);

        if (!student || !teacher) {
            return res.status(404).json({ success: false, message: "Student or Teacher not found" });
        }

        const particularAttendance = student.attendance.find((d) => (d.date === date && d.subjectName === subject && d.period === period));
        if (!particularAttendance) {
            return res.status(404).json({ success: false, message: "No attendance found for this date" });
        }
        console.log(particularAttendance.status,"bgtyhn")
        particularAttendance.status = status;
        student.save();
         return res.status(200).json({ success: true, message:"Attendance updated" });
    } catch (error) {
        console.error("Error checking attendance:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}