import React from 'react'
import { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../context/AuthContext'
import Link from 'next/link';
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form';



export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordsNotMatching, setPasswordsNotMatching] = useState(false)

  const { currentUser, signup } = useAuth()
  console.log(currentUser)

  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm()



  const submitHandler = async event => {
    if(password !== confirmPassword) return setPasswordsNotMatching(true)

    try {
      // signup function also logs user in
      await signup(email, password)

      // then redirect them to integrations page "/"
      router.push('/')
    } catch (error) {
      console.log(error)
    }

  }

  

  return (
    <div className='register-page-container'>

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
          className='register-form'
          onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className='register-title'>Register</h1>

            <FloatingLabel
            controlId="floatingInput"
            label="Email Address"
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

            <FloatingLabel
            controlId="floatingPassword"
            label="Confirm Password"
            className="my-4"
            >

              <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={e => setConfirmPassword(e.target.value)}
              />

            </FloatingLabel>

            <Button
            type="submit"
            variant='primary'
            >
              Register
            </Button>

            {errors.email && <p className='client-side-error'>- Email must be a valid email address</p>}
            {errors.pword && <p className='client-side-error'>- Password must be at least 6 characters</p>}
            {passwordsNotMatching && <p className='client-side-error'>- Password and Confirm Password field must be identical</p>}
          </Form>
        )
      }

    </div>
  )
}
