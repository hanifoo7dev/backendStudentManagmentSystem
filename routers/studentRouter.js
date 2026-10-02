const express = require('express')
const _ = express.Router()
const {createStudentController,getAllStudentsController,getOneStudentController,UpdateStudentController,deleteStudentController} = require('../controllers/studentController')

_.post('/create/student',createStudentController)
_.get('/all/students',getAllStudentsController)
_.get('/one/student/:id',getOneStudentController)
_.patch('/update/student/:id',UpdateStudentController)
_.delete('/delete/student/:id',deleteStudentController)







module.exports= _