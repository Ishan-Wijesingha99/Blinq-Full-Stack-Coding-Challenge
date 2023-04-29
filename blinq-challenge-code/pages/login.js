import Button from 'react-bootstrap/Button';
import React from 'react'
import { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';



export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  
  return (
    <Form className='login-form'>
      <h1 className='login-title'>Login</h1>

      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="my-4"
      >

        <Form.Control
        type="email"
        placeholder="name@example.com"
        />

      </FloatingLabel>


      <FloatingLabel
      controlId="floatingPassword"
      label="Password"
      className="my-4"
      >

        <Form.Control
        type="password"
        placeholder="Password"
        />

      </FloatingLabel>

      <Button
      type="submit"
      variant='primary'
      >
        Log in
      </Button>

    </Form>
  )
}
