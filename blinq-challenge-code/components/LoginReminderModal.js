import React from 'react'
import { useRouter } from 'next/router'

export default function LoginReminderModal({ setCurrentModalObject, setLoginReminderModal }) {

  // functions to take user to /login or /register
  const router = useRouter()
  const toLogin = () => router.push('/login')
  const toRegister = () => router.push('/register')

  return (
    <div className='login-reminder-modal'>
      <div className='login-reminder-container'>
        <h2 className='login-reminder-modal-title'>Please log in or register to set up integration</h2>

        <button
        className='modal-btn'
        onClick={() => {
          toLogin()
          setCurrentModalObject({})
        }}
        >
          Log In Page
        </button>

        <button
        className='modal-btn'
        onClick={() => {
          toRegister()
          setCurrentModalObject({})
        }}
        >
          Register Page
        </button>

        <button
        className='modal-btn'
        onClick={() => {
          setLoginReminderModal(false)
          setCurrentModalObject({})
        }}
        >
          Okay
        </button>
      </div>
    </div>
  )
}
