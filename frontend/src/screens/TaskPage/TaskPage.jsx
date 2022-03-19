import {Container, Button, Form, Row, Col} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { UserActions } from '../../store/slices/UserSlice'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import TaskCard from '../../components/TaskCard/TaskCard'
import classes from './TaskPage.module.css'
import {X} from 'react-bootstrap-icons'


const TaskPage = () => {
    const tasks = useSelector(state=>state.tasks)
    const navigate = useNavigate()
    const user = useSelector(state=>state.user)
    const newTask = useSelector(state=>state.newTask)
    const dispatch = useDispatch()
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const editMode = useSelector(state=>state.editMode)

    useEffect(()=>{
        if(!userInfo){
            navigate('/')
        }
        else{
            dispatch(UserActions.setUser({
                name : userInfo.name,
                id : userInfo._id,
                token : userInfo.token,
                email : userInfo.email,
                profileImg : userInfo.profileImg
            }))
            axios.get('http://localhost:5000/tasks/',{
                headers : {
                    Authorization: `Bearer ${userInfo.token}` 
                }
            })
            .then(res=>dispatch(UserActions.setTasks(res.data)))
            .catch(err=>console.log(err))
        }
    }, [])

    const cancelMode = ()=>{
        dispatch(UserActions.resetMode())
    }

    const handleTask = (event)=>{
        dispatch(UserActions.setNewTask({title : event.target.value}))
    }

    const addTask = (event)=>{
        event.preventDefault()
        if(newTask.title!==''){
            if(editMode){
                axios.put(`http://localhost:5000/tasks/${newTask.id}`, 
                {
                    title : newTask.title
                },
                {
                    headers : {
                        Authorization: `Bearer ${userInfo.token}` 
                    }
                })
                .then(res=>{
                    console.log(res.data)
                    dispatch(UserActions.updateTask())
                })
                dispatch(UserActions.toggleEditMode(false))
            }
            else{
                axios.post('http://localhost:5000/tasks/create',
                {
                    title : newTask.title
                },
                {
                    headers : {
                        Authorization: `Bearer ${userInfo.token}` 
                    }
                })
                .then(res=>{
                    dispatch(UserActions.addTask(res.data))
                })
                .catch(err=>console.log(err))
            }
        }
        else{
            alert("Enter Title of the Task")
        }
    }

    const taskList = <>
    {tasks.map(item=>{
        return(
            <TaskCard key={item._id}  id={item._id} title = {item.title}/>
        )
    })}
    </>

    return(
        <Container className={classes.pageContainer}>
            <h1 className={classes.greetings}>Hello {user.name}</h1>
            <Form onSubmit={addTask}>
                <Row className={classes.formRow}>
                    <Col>
                        <Form.Group>
                            <Form.Label>{editMode?"Edit Task" : "New Task"}</Form.Label>
                            <Form.Control value={newTask.title} onChange={handleTask} type='text'/>
                        </Form.Group>
                    </Col>
                    <Col className={classes.buttonCol}>
                        <Button type='submit' className={classes.button}>Save</Button>
                        <Button onClick={cancelMode} className={classes.Xbutton}><X size={25}/></Button>
                    </Col>
                </Row>
            </Form>
            {userInfo?
            taskList:<Container><h1>Error 404</h1></Container>}
        </Container>
    )
}

export default TaskPage