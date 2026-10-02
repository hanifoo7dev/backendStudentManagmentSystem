const Student = require('../models/studentSchema')
const Course = require('../models/courseSchema')
// create student 
const createStudentController = async (req,res)=>{
    let{name,email,phone,age}= req.body
    if(!name||!email||!phone||!age){
        return res.status(400).json({
            success: false,
            message: "please fill all the fields"
        })
    }
    let student = new Student({
        name: name,
        email: email,
        phone: phone,
        age: age
    })
    await student.save()
    return res.status(201).json({
        success: true,
        message: "create student succcessfully.." 
       })
}
// get one student and endroll course id 
const getStudentAndHisCourseId = async(req,res)=>{
  let {id}= req.params
  if(!id){
     return res.status(400).json({
            success: false,
            message: "please fill all the fields"
        })
  }
  let existingCourses = await Course.find({ enrolledCourses: id}).populate('Course')
  if(!existingCourses){
    return res.status(400).json({
            success: false,
            message: "no course found"
        })
  }
  return res.status(200).json({
    success: true,
    message: "successfully endrolled..",
    data: existingCourses
  })
}


module.exports= {createStudentController,getStudentAndHisCourseId}