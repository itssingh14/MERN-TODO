import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import classes from './Header.module.css'
import {useSelector, useDispatch} from 'react-redux'
import { UserActions } from '../../store/slices/UserSlice'

const Header = () => {

    const user = useSelector(state=>state.user)
    const dispatch = useDispatch()

    const logoutUser = () => {
        localStorage.removeItem("userInfo")
        dispatch(UserActions.logOutUser())
    }

    return(
        <Navbar variant='dark' className={classes.Navbar} expand="lg">
            <Container>
                <Navbar.Brand className={classes.navbarText}>TODO App</Navbar.Brand>
                <Navbar.Toggle aria-controls="=todo-navbar-nav" />
                <Navbar.Collapse id="todo-navbar-nav">
                {user.id!==''?
                <Nav className="ms-auto">
                    <NavDropdown
                    title={<span style={{color : "#d2dde8"}}>{user.name}<img className={classes.navUser} src={`/uploads/${user.profileImg}`} alt='...'/></span>} 
                    id="todo-nav-dropdown">
                        <LinkContainer to='/tasks'><NavDropdown.Item className={classes.navbarDrop}>Tasks</NavDropdown.Item></LinkContainer>
                        <LinkContainer to='/profile'><NavDropdown.Item className={classes.navbarDrop}>Profile</NavDropdown.Item></LinkContainer>
                        <NavDropdown.Divider />
                        <LinkContainer to='/'><NavDropdown.Item className={classes.navbarDrop} onClick={logoutUser}>Logout</NavDropdown.Item></LinkContainer>
                    </NavDropdown>
                </Nav>
                :
                <Nav className="ms-auto">
                    <LinkContainer to='/'><Nav.Link className={classes.navbarText}>Login</Nav.Link></LinkContainer>
                    <LinkContainer to='/Register'><Nav.Link className={classes.navbarText}>Register</Nav.Link></LinkContainer>
                </Nav>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header