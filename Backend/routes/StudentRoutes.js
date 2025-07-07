const express = require("express");
const {studentRegistration, searchStudent, studentList, deleteStudent,studentDetails } = require("../controllers/studentControllers");
const validateStudent = require("../middleware/Auth");
const router = express.Router();

router.post("/registration", validateStudent, studentRegistration);
router.get('/search', searchStudent)
router.get('/student', studentList);
router.get('/student/:id', studentDetails)
router.post('/student/delete', deleteStudent);

router.get('/test', (req, res) => {
    res.send("ka haal ba")
})








module.exports = router;