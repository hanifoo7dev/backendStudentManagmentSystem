const express = require('express')
const _ = express.Router()
const {getAllCourses} = require('../controllers/courseController')

_.post('/create/course',getAllCourses)




module.exports= _