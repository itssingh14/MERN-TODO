const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRouter = require('./routes/userRoutes')
const taskRouter = require('./routes/taskRoutes')

const app = express()
app.use(express.json())
dotenv.config()
app.use(cors())
connectDB()
app.use('/user', userRouter)
app.use('/tasks',taskRouter)

const PORT = process.env.PORT || 5000 
app.listen(PORT, ()=>{
    console.log(`Server started on PORT : ${PORT}`)
})
