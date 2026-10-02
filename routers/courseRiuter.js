const express = require('express')
const _ = express.Router()
const {createCourseController,getAllCourses,getOneCourseController,UpdateCourseController,deleteCourseController} = require('../controllers/courseController')

_.post('/create/course',createCourseController)
_.get('/all/course',getAllCourses)
_.get('/course/:id',getOneCourseController)
_.patch('/update/course/:id',UpdateCourseController)
_.delete('/delete/course/:id',deleteCourseController)




module.exports= _