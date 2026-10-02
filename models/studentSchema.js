const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name:{
        type: String,
        required: true
    
    },
     email:{
        type: String,
        required: true,
        unique: true
    },
     phone:{
        type: String,
        required: true,
    },
     age:{
        type: String,
        required: true,
       
    },
    isActive:{
        type: Boolean,
        default: true
    },
    enrolledCourses:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Course'
    }
},
{timestamps: true}
)

module.exports= mongoose.model("Student",studentSchema)