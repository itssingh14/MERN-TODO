const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : "user"
        }
    },
    {timestamps : true}
)

const Task = mongoose.model('task', taskSchema)

module.exports = Task