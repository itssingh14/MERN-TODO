const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')
const asyncHandler = require('express-async-handler')

const registerUser = asyncHandler(
    async(req, res)=>{
        const { name, email, password } = req.body
        const profileImg = req.file.filename
        const userExist = await User.findOne({email})
        if(userExist){
            res.status(400).json({
                error : "User already registered"
            })
        }
        if(!name || !email || !password){
            res.status(400).json({
                error : "Enter details"
            })
        }
        const user = await User.create({name, email, password, profileImg})
        if(user){
            res.status(201).json({
                User : {
                    _id : user._id,
                    name : user.name,
                    email : user.email,
                    profileImg : user.profileImg,
                    token : generateToken(user._id)  
                },
                Message : "User created"
            })
        }
        else{
            res.status(400).json({
                error : "Error occured"
            })
        }
    }
)

const authUser = asyncHandler(
    async(req, res) => {
        const { email, password } = req.body
        if(!email || !password){
            res.status(400).json({
                Error : "Enter details"
            })
        }
        const user = await User.findOne({email})
        const matchPassword = await user.matchPaswwords(password)
        if(user && matchPassword){
            res.status(200).json({
                User : {
                    _id : user._id,
                    name : user.name,
                    email : user.email,
                    profileImg : user.profileImg,
                    token : generateToken(user._id)
                },
                Message : "User Found"
            })
        }
        else{
            if(!matchPassword){
                res.status(404).json({
                    Error : "Check Password"
                })  
            }
            res.status(404).json({
                Error : "Check Email or User not registered"
            })
        }
    }
)

module.exports = {registerUser, authUser}