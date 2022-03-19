import {Container, Form, Button, Card, Spinner} from 'react-bootstrap'
import {Link} from 'react-router-dom' 
import classes from './RegisterPage.module.css'
import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { UserActions } from '../../store/slices/UserSlice'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const RegisterPage = () => {
    const userInfo = localStorage.getItem('userInfo')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const[confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const user = useSelector(state=>state.user)
    const [profileImg, setProfileImg] = useState(null)

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    })

    const handleEmail = (event) => {
        dispatch(UserActions.setEmail({email : event.target.value}))
    }
    const handleName = (event) => {
        dispatch(UserActions.setName({name : event.target.value}))
    }
    const handlePassword = (event) => {
        dispatch(UserActions.setPassword({password : event.target.value}))
    }
    const validateDetails = () => {
        if(user.name !== '' && user.email !== '' && user.password !== '' && profileImg !== ''){
            if(user.password === confirmPassword){
                return true
            }
            else{
                alert("Check confirm password")
                return false
            }
        }
        else{
            alert("Enter Details")
            return false
        }
    }

    const handleFile = (event)=>{
        setProfileImg(event.target.files[0])
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(validateDetails()){
            setLoading(true)
            const formData = new FormData()
            formData.append("name", user.name)
            formData.append("email", user.email)
            formData.append("password", user.password)
            formData.append("profileImg", profileImg)
            axios.post('http://localhost:5000/user/register', formData)
            .then(res=>{
                localStorage.setItem('userInfo', JSON.stringify(res.data.User))
                dispatch(UserActions.setUser({
                    name : res.data.User.name, 
                    id : res.data.User._id,
                    profileImg : res.data.User.profileImg, 
                    token : res.data.User.token}))
                navigate('/tasks')
            }).catch(err=>{
                console.log(err)
            })
            setLoading(false)
        }
    }

    return(
        <Container className={classes.formContainer}>
            <Card>
                <Card.Title className={classes.formTitle}>
                    <h3>REGISTER</h3>
                </Card.Title>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                         <Form.Group className={classes.formInput} controlId="registerformtodoName">
                            <Form.Control onChange={handleName} type="text" placeholder="Enter Name" />
                        </Form.Group>
                        <Form.Group className={classes.formInput} controlId="registerformtodoEmail">
                            <Form.Control onChange={handleEmail} type="email" placeholder="Enter Email" />
                        </Form.Group>
                        <Form.Group className={classes.formInput} controlId="registerformBasicPassword">
                            <Form.Control onChange={handlePassword} type="password" placeholder="Enter Password" />
                        </Form.Group>
                        <Form.Group className={classes.formInput} controlId="registerformBasicConfirmPassword">
                            <Form.Control onChange={(event)=>setConfirmPassword(event.target.value)} type="password" placeholder="Enter Confirm Password" />
                        </Form.Group>
                        <Form.Group className={classes.formInput} controlId="registerformtodoFile">
                            <Form.Control onChange={handleFile} type="file"/>
                        </Form.Group>
                        <Button type='Submit' className={classes.formButton}>
                        {loading && <Spinner animation='border' size='sm'/>}
                            <span style={{marginLeft : "0.5rem"}}>
                                Register
                            </span>
                        </Button>
                        <Form.Group>
                            <Form.Text className="text-muted" style={{marginLeft : "5rem"}}>
                                Already Registered? <Link to='/'>Login</Link>
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default RegisterPage