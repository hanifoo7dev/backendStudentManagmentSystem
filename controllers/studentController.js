const mongoose = require('mongoose')
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
    // Student must be 18 or older
        if (age < 18) {
            return res.status(400).json({
                success: false,
                message: "Student must be 18 years or older"
            })
        }
        // Check duplicate email
        let existingStudent = await Student.findOne({ email })

        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: "Same email cannot create another student"
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
// get all student
const getAllStudentsController = async (req,res)=>{
    let existingStudent = await Student.find({}).populate('enrolledCourses')
    if(!existingStudent){
         return res.status(400).json({
            success: false,
            message: "student not founds"
        })
    }
    return res.status(200).json({
      success: true,
      message: `${existingStudent.length} students  were found`,
      data: existingStudent
  })

}
// get one student
const getOneStudentController = async(req,res)=>{
    let{id}= req.params
       // Check ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            })
        }
    let oneExistingStudent = await Student.findById({_id: id}).populate('enrolledCourses')
    if(!oneExistingStudent){
       return res.status(400).json({
            success: false,
            message: "student not founds"
        })  
    } 
     return res.status(200).json({
      success: true,
      message: " student was  found",
      data: oneExistingStudent
  })   

}
// get one student under course and update profile
const UpdateStudentController = async(req,res)=>{
    let{id}= req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            })
        }
    let oneExistingStudent = await Student.findByIdAndUpdate({_id: id},req.body,{new: true})
    if(!oneExistingStudent){
       return res.status(400).json({
            success: false,
            message: "student not founds"
        })  
    } 
     return res.status(200).json({
      success: true,
      message: " student was updated",
      data: oneExistingStudent
  })   

}
// get one student under course and delete profile
const deleteStudentController = async(req,res)=>{
    let{id}= req.params
   // Check ObjectId
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
      success: false,
      message: "Invalid student ID"
     })
  }
 if (Student.enrolledCourses.length > 0) {
   return res.status(400).json({
   success: false,
   message: "Cannot delete student because student is enrolled in a course"
    })
  }
 let oneExistingStudent = await Student.findByIdAndDelete({_id: id})
      return res.status(200).json({
      success: true,
      message: " student was deleted successfully",
      data: oneExistingStudent
  })   
}
// enroll student with published
const enrollStudentInCourseController = async (req, res) => {
    try {
        const { studentId, courseId } = req.params
       if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            })
        }
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID"
            })
        }
    const student = await Student.findById(studentId)
     if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            })
        }
   const course = await Course.findById(courseId)
        if (!course) {
          return res.status(404).json({
          success: false,
          message: "Course not found"
         })
    }
    if (!course.isPublished) {
      return res.status(400).json({
      success: false,
      message: "Cannot enroll in an unpublished course"
     })
  }
 const alreadyEnrolled = student.enrolledCourses.some((id) => id.toString() === courseId)
      if (alreadyEnrolled) {
        return res.status(400).json({
        success: false,
        message: "Student already enrolled in this course"
        })
     }
    student.enrolledCourses.push(courseId)
    await student.save()
    return res.status(200).json({
    success: true,
    message: "Student enrolled successfully",
    data: student
    })
} catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}













module.exports= {createStudentController,getAllStudentsController,getOneStudentController,UpdateStudentController,deleteStudentController,enrollStudentInCourseController}