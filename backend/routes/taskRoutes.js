const express = require('express')
const {getTasks, createTask, updateTask, deleteTask} = require('../controllers/taskController')
const protect = require('../middlewares/authMiddleware')

const taskRouter = express.Router()

taskRouter.get('/', protect, getTasks)
taskRouter.post('/create', protect, createTask)
taskRouter.put('/:id', protect, updateTask)
taskRouter.delete('/:id', protect, deleteTask)

module.exports = taskRouter