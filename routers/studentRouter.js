const express = require('express')
const _ = express.Router()
const {createStudentController,getStudentAndHisCourseId} = require('../controllers/studentController')

_.post('/create/student',createStudentController)
_.get('/student/:id/course',getStudentAndHisCourseId)




module.exports= _