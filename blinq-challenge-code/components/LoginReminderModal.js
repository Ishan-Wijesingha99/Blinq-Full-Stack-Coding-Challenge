import React from 'react'
import { useRouter } from 'next/router'



export default function LoginReminderModal({ currentModalObject, loginReminderModal, setLoginReminderModal }) {

  const router = useRouter()

  const toLogin = () => router('/login')
  const toRegister = () => router('/register')

  return (
    <div className='login-reminder-modal'>
      <div className='login-reminder-container'>
        <h2 className='login-reminder-modal-title'>Please log in or register to set up {currentModalObject.name} integration</h2>

        <button
        onClick={toLogin}
        className='login-reminder-btn'
        >
          Log In Page
        </button>

        <button
        onClick={toRegister}
        className='login-reminder-btn'
        >
          Register Page
        </button>

        <button
        onClick={() => setLoginReminderModal(false)}
        className='login-reminder-btn'
        >
          Okay
        </button>
      </div>
    </div>
  )
}
