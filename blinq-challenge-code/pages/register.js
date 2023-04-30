import React from 'react'
import { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../context/AuthContext'



export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const { currentUser, signup } = useAuth()
  console.log(currentUser)

  const submitHandler = async event => {
    event.preventDefault()

    if(!email || !password) setError('Enter valid email and password')

    try {
      return await signup(email, password)      
    } catch (error) {
      console.log(error)
      setError('Incorrect email or password')
    }

  }

  
  return (
    <div className='register-page-container'>
      <Form className='register-form'>
        <h1 className='register-title'>Register</h1>

        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="my-4"
        >

          <Form.Control
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          value={password}
          onChange={e => setPassword(e.target.value)}
          />

        </FloatingLabel>

        <FloatingLabel
        controlId="floatingPassword"
        label="Confirm password"
        className="my-4"
        >

          <Form.Control
          type="password"
          placeholder="Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          />

        </FloatingLabel>

        <Button
        type="submit"
        variant='primary'
        onClick={submitHandler}
        >
          Register
        </Button>

      </Form>
    </div>
  )
}
