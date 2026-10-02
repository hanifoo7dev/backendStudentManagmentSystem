require('node:dns').setServers(['1.1.1.1','8.8.8.8'])
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require ('mongoose')
const dbConnection = require('./config/dbConnection')
const studentRouter = require('./routers/studentRouter')
const courseRouter = require('./routers/courseRiuter')



app.use(express.json())
dbConnection()

app.use('/api/students',studentRouter)
app.use('/api/courses',courseRouter)



const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log("server is running...")
})