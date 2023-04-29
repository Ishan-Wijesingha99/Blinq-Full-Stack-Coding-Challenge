import React from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import navbarImage from '../public/navbar-image.png'

import Image from 'next/image';
import Link from 'next/link';


export default function Navigation() {
  return (
    <Navbar bg="light" expand="lg" className='navbar-container'>

      <Container>

        <Link href='/'>
            <Image
              src={navbarImage}
              alt='Company Logo'
              width={90}
              height={30}
            />
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>

          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>

            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
}
