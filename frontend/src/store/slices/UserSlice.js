import {createSlice} from '@reduxjs/toolkit'

const INIT_USER = {
    email : '',
    name : '',
    token : '',
    id : '',
    password : '',
    profileImg : ''
}

const INIT_NEW_TASK = {
    id : '',
    title : ''
}

const INIT_TASKS = []

const UserSlice = createSlice({
    name : "UserSlice",
    initialState : {
        user : INIT_USER,
        newTask : INIT_NEW_TASK,
        tasks : INIT_TASKS,
        editMode : false
    },
    reducers : {
        setUser(state, action){
            state.user = action.payload
        },
        setEmail(state, action){
            state.user = {...state.user, email : action.payload.email}
        },
        setPassword(state, action){
            state.user = {...state.user, password : action.payload.password}
        },
        setName(state, action){
            state.user = {...state.user, name : action.payload.name}
        },
        logOutUser(state){
            state.user = INIT_USER
            state.tasks = INIT_TASKS
        },
        setTasks(state, action){
            state.tasks = action.payload
        },
        addTask(state, action){
            state.tasks.push(action.payload)
            state.newTask = INIT_NEW_TASK
        },
        setNewTask(state, action){
            state.newTask = {...state.newTask, title : action.payload.title}
        },
        deleteTask(state, action){
            state.tasks = state.tasks.filter(item=>item._id !== action.payload)
        },
        editTask(state, action){
            state.newTask.id = action.payload
        },
        updateTask(state){
            const index = state.tasks.findIndex(item=>item._id === state.newTask.id)
            state.tasks[index].title = state.newTask.title
            state.newTask = INIT_NEW_TASK
        },
        toggleEditMode(state, action){
            state.editMode = action.payload
        },
        resetMode(state){
            state.editMode = false
            state.newTask = INIT_NEW_TASK
        }
    }
})

export const UserActions = UserSlice.actions
export default UserSlice.reducer