import React from 'react'
import { useRouter } from 'next/router'



export default function LoginReminderModal({ currentIntegrationName, loginReminderModal, setLoginReminderModal }) {

  const router = useRouter()

  const toLogin = () => router('/login')
  const toRegister = () => router('/register')

  return (
    <div className='login-reminder-modal'>
      <div className='login-reminder-container'>
        <h2>Please Log In or Register to Set up {currentIntegrationName} Integration</h2>

        <button onClick={toLogin}>
          Log In Page
        </button>

        <button onClick={toRegister}>
          Register Page
        </button>

        <button onClick={() => setLoginReminderModal(false)}>
          Okay
        </button>
      </div>
    </div>
  )
}
