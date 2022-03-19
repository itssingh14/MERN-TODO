const express = require('express')
const {registerUser, authUser} = require('../controllers/userController')
const multer = require('multer')

const userRouter = express.Router()

const storage = multer.diskStorage({
    destination : (req, file, callback) =>{
        callback(null, './frontend/public/uploads/')
    },
    filename : (req, file, callback)=>{
        callback(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({storage:storage})

userRouter.post('/register', upload.single("profileImg"), registerUser)
userRouter.post('/login', authUser)

module.exports = userRouter