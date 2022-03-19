import { useEffect } from 'react'
import {Container, Row, Card} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { UserActions } from '../../store/slices/UserSlice'
import classes from './ProfilePage.module.css'
 
const ProfilePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    useEffect(()=>{
        if(!userInfo){
            navigate('/')
        }
        else{
            dispatch(UserActions.setUser({
                name : userInfo.name,
                id : userInfo._id,
                profileImg : userInfo.profileImg,
                email : userInfo.email,
                token : userInfo.token
            }))
        }
    },[])

    const user = useSelector(state=>state.user)

    return(
        <Container>
            <Row className={classes.profileRow}>
                <Card className={classes.profileCard}>
                <img className={classes.profileImg} src={`/uploads/${user.profileImg}`} alt='...' />
                <h2 className={classes.profileHeading}>{user.name}</h2>
                <p className={classes.profilePara}>Id : {user.id}</p>
                <p className={classes.profilePara}>Email : {user.email}</p>
                </Card>
            </Row>
        </Container>
    )
}

export default ProfilePage