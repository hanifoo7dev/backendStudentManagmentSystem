const express = require('express')
const _ = express.Router()
const {createStudentController,getAllStudentsController,getOneStudentController,UpdateStudentController,deleteStudentController,enrollStudentInCourseController} = require('../controllers/studentController')

_.post('/create/student',createStudentController)
_.get('/all/students',getAllStudentsController)
_.get('/one/student/:id',getOneStudentController)
_.patch('/update/student/:id',UpdateStudentController)
_.delete('/delete/student/:id',deleteStudentController)
_.post('/:studentId/enroll/:courseId',enrollStudentInCourseController)



// POST /api/students/68e123456789abcdef123456/enroll/68e987654321abcdef654321



module.exports= _