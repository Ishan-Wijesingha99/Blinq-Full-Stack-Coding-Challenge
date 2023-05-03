import React from 'react'
import { useRouter } from 'next/router'



export default function LoginReminderModal({ currentModalObject, setCurrentModalObject, loginReminderModal, setLoginReminderModal }) {

  const router = useRouter()

  const toLogin = () => router.push('/login')
  const toRegister = () => router.push('/register')

  return (
    <div className='login-reminder-modal'>
      <div className='login-reminder-container'>
        <h2 className='login-reminder-modal-title'>Please log in or register to set up {currentModalObject.name} integration</h2>

        <button
        onClick={() => {
          toLogin()
          setCurrentModalObject({})
        }}
        className='modal-btn'
        >
          Log In Page
        </button>

        <button
        onClick={() => {
          toRegister()
          setCurrentModalObject({})
        }}
        className='modal-btn'
        >
          Register Page
        </button>

        <button
        onClick={() => {
          setLoginReminderModal(false)
          setCurrentModalObject({})
        }}
        className='modal-btn'
        >
          Okay
        </button>
      </div>
    </div>
  )
}
