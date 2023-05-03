import React from 'react'
import { useAuth } from '../context/AuthContext'



export default function AddIntegration({ loginReminderModal, setLoginReminderModal, customIntegrationModal, setCustomIntegrationModal }) {
  const { currentUser } = useAuth() 

  return (
    <div
    className='add-integration-container'
    onClick={() => {
      if(currentUser) {
        setCustomIntegrationModal(true)
      } else {
        setLoginReminderModal(true)
      }
    }}
    >
      <h2 className='add-integration-title'>Add Custom Integration...</h2>
    </div>
  )
}
