import {Card, Row, Col, Button} from 'react-bootstrap'
import classes from './TaskCard.module.css'
import {Trash, PencilFill} from 'react-bootstrap-icons'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { UserActions } from '../../store/slices/UserSlice'

const TaskCard = (props) => {

    const dispatch = useDispatch()
    const user = useSelector(state=>state.user)
    const userInfo = localStorage.getItem('userInfo')
    const deleteTask = (id) =>{
        axios.delete(`http://localhost:5000/tasks/${id}`,{
            headers : {
                Authorization: `Bearer ${user.token}` 
            }
        })
        .then(res=>{
            console.log(res.data)
            dispatch(UserActions.deleteTask(id))
        })
        .catch(err=>console.log(err))
    }
    const editTask = (id)=>{
        dispatch(UserActions.toggleEditMode(true))
        dispatch(UserActions.editTask(props.id))
        dispatch(UserActions.setNewTask({title : props.title}))
    }
    return(
        <Card className={classes.card}>
                <Card.Title>
                    <Row>
                        <Col md={8} className={classes.cardTitle}>{props.title}</Col>
                        <Col md={2} style={{textAlign:"right"}}><Button className={classes.deleteBtn} onClick={()=>deleteTask(props.id)}><Trash size={20}/></Button></Col>
                        <Col md={2} style={{textAlign:"right"}}><Button className={classes.editBtn} onClick={()=>editTask(props.id)}><PencilFill size={20}/></Button></Col>
                    </Row>
                </Card.Title>
            </Card>
    )
}

export default TaskCard