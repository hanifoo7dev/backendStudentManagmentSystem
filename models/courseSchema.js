const mongoose = require('mongoose')
const {Schema}= mongoose

const courseSchema = new Schema({
    title:{
         type: String,
         required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    durartionInMonth:{
        type: Number,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }   
    },
    {timestamps: true }
   )

module.exports= mongoose.model('Course',courseSchema)