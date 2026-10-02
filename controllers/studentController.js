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
    if(!id){
         return res.status(400).json({
            success: false,
            message: "student not founds"
        })
    }
    let oneExistingStudent = await Student.findById({_id: id})
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
    if(!id){
         return res.status(400).json({
            success: false,
            message: "student not founds"
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
// get one student under course and update profile
const deleteStudentController = async(req,res)=>{
    let{id}= req.params
    if(!id){
         return res.status(400).json({
            success: false,
            message: "student not founds"
        })
    }
    let oneExistingStudent = await Student.findByIdAndDelete({_id: id})
    if(!oneExistingStudent){
       return res.status(400).json({
            success: false,
            message: "student not founds"
        })  
    } 
     return res.status(200).json({
      success: true,
      message: " student was deleted successfully",
      data: oneExistingStudent
  })   

}












module.exports= {createStudentController,getAllStudentsController,getOneStudentController,UpdateStudentController,deleteStudentController}