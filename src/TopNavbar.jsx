import { useState, useEffect } from 'react';
import { Nav, Navbar, NavDropdown, Container} from 'react-bootstrap';
import Logout from './Logout';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";


export default function TopNavbar() {

    let username = useSelector((state) => state.username);
    const dispatch = useDispatch();

    function checkLogin() {
        axios.get('/api/users/whoIsLoggedIn')
            .then((response) => dispatch({
                type: 'LOGIN',
                username: response.data,
            }))
            .catch((error) => console.log(error))
    }
    useEffect(checkLogin, []);


    let userLogComponent = (username!=='') ?
        (
        <Nav>
            <NavDropdown title={username} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/jobcreate">Create a job list</NavDropdown.Item>
                <NavDropdown.Item href="/favorites">Favorites</NavDropdown.Item>
                <NavDropdown.Divider />
                <Logout />
            </NavDropdown>
        </Nav>) :
        (
        <Nav className="me-auto">
            <Nav.Link href="/login">Log In</Nav.Link>
            <Nav.Link href="/register">Sign Up</Nav.Link>
        </Nav>)
    
    return (
        <>
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
            <Navbar.Brand href="/">Kaiwen's Job Board</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            {userLogComponent}

            </Container>
        </Navbar>
        </>
      );

}