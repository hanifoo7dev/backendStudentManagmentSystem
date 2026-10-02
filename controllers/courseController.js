const Course = require('../models/courseSchema')


// create a course 
const createCourseController = async(req,res)=>{
     let {title,description,price,category,durartionInMonth}= req.body
     if(!title || !description || !price || !category || !durartionInMonth){
        return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      })
   }
   if(price <= 0){
     return res.status(400).json({
        success: false,
        message: "price must be over 0",
      })
   }
  let existingtitle = await Course.findOne({title: title.toLowerCase()})
        if (existingtitle) {
            return res.status(400).json({
                success: false,
                message: "title already exists",
            })
        }
  let existingTitle = await Course.findOne({title: title.toLowerCase()}) 
  if(existingTitle){
      return res.status(400).json({
        success: false,
        message: "Title  Already exits",
      })
   }
   let course = new Course({
     title: title.toLowerCase(),
     description: description,
     price: price,
     category: category,
     durartionInMonth: durartionInMonth
   })
   await course.save()
    return res.status(201).json({
      success: true,
      message: "Course created successfully"
   })
}
// get all courses
const getAllCourses = async(req,res)=>{
   let existingCourse = await Course.find({})
   if(!existingCourse){
     return res.status(400).json({
        success: false,
        message: "course not found",
      });
   }
   
   return res.status(201).json({
        success: true,
        message: `${existingCourse.length} course were found` ,
        data : existingCourse
       })      
}
// get one course 
const getOneCourseController = async(req,res)=>{
    let{id}= req.params
    if(!id){
         return res.status(400).json({
            success: false,
            message: "student not founds"
        })
    }
    let oneExistingStudent = await Course.findById({_id: id})
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
// update one course information
const UpdateCourseController = async(req,res)=>{
    let{id}= req.params
    if(!id){
         return res.status(400).json({
            success: false,
            message: "student not founds"
        })
    }
    let oneExistingStudent = await Course.findByIdAndUpdate({_id: id},req.body,{new: true})
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
// delete one course
const deleteCourseController = async(req,res)=>{
    let{id}= req.params
    if(!id){
         return res.status(400).json({
            success: false,
            message: "student not founds"
        })
    }
    let oneExistingStudent = await Course.findByIdAndDelete({_id: id})
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


module.exports= {createCourseController,getAllCourses,getOneCourseController,UpdateCourseController,deleteCourseController}