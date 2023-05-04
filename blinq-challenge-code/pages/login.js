import Button from 'react-bootstrap/Button';
import React from 'react'
import { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form';



export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [serverSideError, setServerSideError] = useState(null)

  const { currentUser, login } = useAuth()

  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm()



  const submitHandler = async event => {
   
    try {
      // log them in
      await login(email, password)
      
      // then redirect them to integrations page "/"
      router.push('/')
    } catch (error) {
      // if password is incorrect
      if(error.message === 'Firebase: Error (auth/wrong-password).') setServerSideError('Incorrect password')

      // if email does not exist in database
      if(error.message === 'Firebase: Error (auth/user-not-found).') setServerSideError('Email not found in our database')
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
          <Form
          className='login-form'
          onSubmit={handleSubmit(submitHandler)}
          >

            <h1 className='login-title'>Login</h1>

            <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="my-4"
            >

              <Form.Control
              type="text"
              placeholder="name@example.com"
              {...register("email", {
                required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              })}
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
              {...register("pword", {
                required: true,
                minLength: 6
              })}
              onChange={e => setPassword(e.target.value)}
              />

            </FloatingLabel>

            <Button
            type="submit"
            variant='primary'
            >
              Log In
            </Button>

            {errors.email && <p className='client-side-error'>- Email must be a valid email address</p>}
            {errors.pword && <p className='client-side-error'>- Password must be at least 6 characters</p>}

            {(serverSideError === 'Incorrect password') && <p className='client-side-error'>- Incorrect password</p>}

            {(serverSideError === 'Email not found in our database') && <p className='client-side-error'>- Email not found in our database</p>}

          </Form>
        )
      }

    </div>
  )
}
