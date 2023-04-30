import React from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import navbarImage from '../public/navbar-image.png'

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';


export default function Navigation() {
  const { currentUser, logout } = useAuth()

  return (
    <Navbar bg="light" expand="lg" className='navbar-container'>

      <Container>

        <Link href='/'>
            <div className='navbar-logo-div'>
              <Image
              src={navbarImage}
              alt='Company Logo'
              width={90}
              height={30}
              />
            </div>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

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
                <Nav.Link href="/register">Register</Nav.Link>

                <Nav.Link href="/login">Log In</Nav.Link>
                </>
              )
            }
          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
}
