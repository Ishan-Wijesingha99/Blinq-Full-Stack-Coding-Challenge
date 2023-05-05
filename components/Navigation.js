import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import navbarImage from '../public/navbar-image.png';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  // get currentUser and logout function from Auth context
  const { currentUser, logout } = useAuth();

  // creating functions to take user to different pages
  const router = useRouter();
  const goHome = () => router.push('/');
  const goRegister = () => router.push('/register');
  const goLogin = () => router.push('/login');

  return (
    <Navbar bg="white" expand="lg" className='navbar-container'>
      <Container>

        <div
        className='navbar-logo-div'
        onClick={goHome}
        >
          <Image
          src={navbarImage}
          alt='Company Logo'
          width={90}
          height={30}
          />
        </div>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>

        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav className="ms-auto">
            {
              currentUser
              ?
              (
                <>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </>
              )
              :
              (
                <>
                  <Nav.Link onClick={goRegister}>Register</Nav.Link>

                  <Nav.Link onClick={goLogin}>Log In</Nav.Link>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
}
