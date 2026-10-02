const Course = require('../models/courseSchema')

// get all courses
const getAllCourses = async(req,res)=>{
    let{title,description,price,category,durartionInMonth,isPublished}= req.body
    if(!title|| !description|| !price|| !category|| !durartionInMonth || !isPublished)
         return res.status(400).json({
            success: false,
            message: "please fill all the fields"
        })
   let course = new Course({
    title: title,
    description: description,
    price: price,
    category: category,
    durartionInMonth: durartionInMonth,
    isPublished: isPublished
   })
  await course.save()
   return res.status(201).json({
        success: true,
        message: "create student succcessfully.." 
       })      
}



module.exports= {getAllCourses}