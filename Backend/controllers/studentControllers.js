const Student = require("../models/Student");

exports.studentRegistration = async (req, res) => {
    try {
        const { name, age, email, course } = req.body;

        // validation 

        if (!name || !age || !email || !course) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, age, email, course) are required",
            });
        }

        // Check if student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: "Student with this email already exists",
            });
        }

        // Create new student
        const newStudent = new Student({ name, age, email, course });
        await newStudent.save();

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            student: newStudent,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


// Student list 
exports.studentList = async (req, res) => {
    try {
        const students = await Student.find({});
        console.log(students.length)
        if (students.length == 0) {
            return res.status(200).json({
                success: true,
                message: "No student found in database",
            })
        }

        res.status(200).json({
            success: true,
            data: students,
            message: "all students fetched successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error: error.message
        })
    }
}


// search the student
exports.searchStudent = async (req, res) => {
    try {
        const { name } = req.query;
        // console.log(name)
        if (!name) {
            return res.status(400).json({
                success: false,
                error: error.message,
                message: "name is required"
            });
        }

        const students = await Student.find({ name: { $regex: name, $options: "i" } });
        res.status(200).json({
            success: true,
            data: students,
            message: "student found"
        });
    } catch (error) {
        res.status(500).json(
            {
                error: "Server Error"
            }
        );
    }

}

// All Student details
exports.studentDetails = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                error: error.message,
                message: "Student not found"
            });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: "something went wrong"
        });
    }

}


// remove the student
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid request, id is missing",
            });
        }

        const student = await Student.findByIdAndDelete({ _id: id }, { new: true })

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: student,
            message: "student removed successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error: error.message
        })
    }
}
