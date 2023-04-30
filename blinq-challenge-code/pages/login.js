import Button from 'react-bootstrap/Button';
import React from 'react'
import { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../context/AuthContext';



export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { currentUser, login } = useAuth()
  console.log(currentUser)

  const submitHandler = async event => {
    event.preventDefault()

    if(!email || !password) setError('Enter valid email and password')

    try {
      return await login(email, password)      
    } catch (error) {
      console.log(error)
      setError('Incorrect email or password')
    }
  }

  

  return (
    <div className='login-page-container'>
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

        <Button
        type="submit"
        variant='primary'
        onClick={submitHandler}
        >
          Log in
        </Button>

      </Form>
    </div>
  )
}
