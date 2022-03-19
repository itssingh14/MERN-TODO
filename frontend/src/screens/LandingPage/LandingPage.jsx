import {Container, Form, Button, Card, Spinner} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom' 
import classes from './LandingPage.module.css'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import { UserActions } from '../../store/slices/UserSlice'
import axios from 'axios'

const LandingPage = () => {

    const dispatch = useDispatch();
    const email = useSelector(state=>state.user.email)
    const password = useSelector(state=>state.user.password)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        const userInfo = localStorage.getItem("userInfo")
        if(userInfo){
            navigate('/tasks')
        }
    })

    const handleEmail = (event) => {
        dispatch(UserActions.setEmail({email : event.target.value}))   
    }
    const handlePassword = (event) => {
        dispatch(UserActions.setPassword({password : event.target.value}))   
    }
    const handleForm = (event) => {
        event.preventDefault()
        setLoading(true)
        axios.post('http://localhost:5000/user/login',{
            email,
            password
        }).then((res)=>{
            localStorage.setItem('userInfo', JSON.stringify(res.data.User))
            dispatch(UserActions.setUser({
                name : res.data.User.name, 
                id : res.data.User._id, 
                profileImg : res.data.User.profileImg,
                token : res.data.User.token}))
            navigate('/tasks')
        }).catch((err)=>{
            console.log(err)
        })
        setLoading(false)
    }

    return(
        <Container className={classes.formContainer}>
            <Card>
                <Card.Title className={classes.formTitle}>
                    <h3>LOGIN</h3>
                </Card.Title>
                <Card.Body>
                    <Form onSubmit={handleForm}>
                        <Form.Group className={classes.formInput} controlId="loginformtodoEmail">
                            <Form.Control 
                            type="email" 
                            placeholder="Enter Email"
                            onChange={handleEmail} />
                        </Form.Group>
                        <Form.Group className={classes.formInput} controlId="loginformBasicPassword">
                            <Form.Control 
                            type="password" 
                            placeholder="Enter Password" 
                            onChange={handlePassword}/>
                        </Form.Group>
                        <Button className={classes.formButton} type='submit'>
                            {loading && <Spinner animation='border' size='sm'/>}
                            <span style={{marginLeft : "0.5rem"}}>
                                Login
                            </span>
                        </Button>
                        <Form.Group>
                            <Form.Text className="text-muted" style={{marginLeft : "5rem"}}>
                                Not Regitered? <Link to='/register'>Register Here</Link>
                            </Form.Text>
                        </Form.Group>
                    </Form>  
                </Card.Body>
            </Card>
        </Container>
    )
}

export default LandingPage