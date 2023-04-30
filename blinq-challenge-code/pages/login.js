import Button from 'react-bootstrap/Button';
import React from 'react'
import { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link'
import { useRouter } from 'next/router'



export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { currentUser, login } = useAuth()
  console.log(currentUser)

  const router = useRouter()

  const submitHandler = async event => {
    event.preventDefault()

    if(!email || !password) setError('Enter valid email and password')

    try {
      // log them in
      await login(email, password)
      
      // then redirect them to integrations page "/"
      router.push('/')
    } catch (error) {
      console.log(error)
      setError('Incorrect email or password')
    }
  }

  

  return (
    <div className='login-page-container'>

      {
        currentUser
        ?
        (
          <div className='already-logged-in-container'>
            <h1>You Are Already Logged In</h1>

            <p>Click the button below to go to integrations page</p>

            <Link href="/">
              <a className='already-logged-in-btn'>Integrations Page</a>
            </Link>
          </div>
        )
        :
        (
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
        )
      }

    </div>
  )
}
