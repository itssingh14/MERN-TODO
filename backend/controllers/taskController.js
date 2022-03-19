const Task = require('../models/taskModel')
const asyncHandler = require('express-async-handler')

const getTasks = asyncHandler(
    async(req, res)=>{
        const tasks = await Task.find({user : req.user._id})
        if(tasks){
            res.status(200).json(tasks)
        }
        else{
            res.status(400).json({
                Error : "Can't fetch tasks"
            })
        }
    }
)

const createTask = asyncHandler(
    async(req, res)=>{
        const title = req.body.title
        if(!title){
            res.status(400).json({
                Error : "Enter title"
            })
        }
        const task = await Task.create({title, user : req.user._id})
        if(task){
            res.status(201).json(task)
        }
        else{
            res.status(400).json({
                Error : "Couldn't create task"
            })
        }
    }
)
    
const updateTask = asyncHandler(
    async(req, res)=>{
        const title = req.body.title
        const task = await Task.findById(req.params.id)
        if(task.user.toString() === req.user._id.toString()){
            task.title = title
            const updatedTask = await task.save()
            res.status(200).json({
                Message : "Task Updated"
            })
        }
        else{
            res.status(400).json({
                Error : "Permission Denied"
            })
        }
    }
)

const deleteTask = asyncHandler(
    async(req, res)=>{
        const task = await Task.findById(req.params.id)
        if(task.user.toString() === req.user._id.toString()){
            await task.remove()
            res.status(200).json({
                Message : "Task Deleted"
            })
        }
        else{
            res.status(400).json({
                Error : "Permission Denied"
            })
        }
    }
)

module.exports = {getTasks, createTask, updateTask, deleteTask}