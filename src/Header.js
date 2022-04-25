import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import './App.css';


function Header() {
    let user = JSON.parse(localStorage.getItem('user-info'));
    const nav = useNavigate();
    function logOut() {
        localStorage.clear();
        nav('/login');
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">e-Commerce</Navbar.Brand>
                    <Nav className="me-auto navbar-wrapper">
                        {
                            localStorage.getItem('user-info') ? (
                                <>
                                <Link to="/" className="nav-link">Product List</Link>
                                    <Link to="/add" className="nav-link">Add Products</Link>
                                    {/* <Link to="/update" className="nav-link">Update Products</Link> */}
                                    <Link to="/search" className="nav-link">Search Products</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="nav-link">Login</Link>
                                    <Link to="/register" className="nav-link">Register</Link>
                                </>
                            )}
                    </Nav>
                    {
                        localStorage.getItem('user-info') ? (
                            <Nav>
                                <NavDropdown title={user && user.name}>
                                    <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        ) : null
                    }
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;