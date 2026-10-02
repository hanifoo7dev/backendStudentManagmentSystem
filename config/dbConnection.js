const mongoose = require('mongoose')

const dbConnection = ()=>{
    return mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Database is running....")
    }).catch((error)=>{
        console.log("Db connection is failed..")
    })
}

module.exports= dbConnection