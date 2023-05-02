import React, { useState } from 'react'
import Image from 'next/image'
import salesforceLogo from '../public/salesforce-logo.png'
import hubspotLogo from '../public/hubspot-logo.png'
import zapierlogo from '../public/zapier-logo.png'
import { useAuth } from '../context/AuthContext'
import IntegrationModal from './IntegrationModal'
import LoginReminderModal from './LoginReminderModal'
import IntegrationContainers from './IntegrationContainers'



export default function IntegrationsDashboard() {
  const [formModal, setFormModal] = useState(false)
  
  const [currentModalObject, setCurrentModalObject] = useState({})
  const [currentIntegrationId, setCurrentIntegrationId] = useState('')
  
  const [loginReminderModal, setLoginReminderModal] = useState(false)

  const { currentUser } = useAuth()



  return (
    <div>

      {currentUser ? <p className='header-message'>User is Logged In</p> : <p className='header-message'>Log In to Set up Integrations</p>}

      <h1 className='integrations-page-title'>Available Integrations</h1>


      <IntegrationContainers
        formModal={formModal}
        setFormModal={setFormModal}
        currentModalObject={currentModalObject}
        setCurrentModalObject={setCurrentModalObject}
        currentIntegrationId={currentIntegrationId}
        setCurrentIntegrationId={setCurrentIntegrationId}
        loginReminderModal={loginReminderModal}
        setLoginReminderModal={setLoginReminderModal}
      />



      {/* form modal */}
      {formModal && (
        <IntegrationModal
        formModal={formModal}
        setFormModal={setFormModal}
        currentModalObject={currentModalObject}
        setCurrentModalObject={setCurrentModalObject}
        currentIntegrationId={currentIntegrationId}
        setCurrentIntegrationId={setCurrentIntegrationId}
        />
      )}

      {/* modal telling user to log in */}
      {loginReminderModal && (
        <LoginReminderModal
        currentModalObject={currentModalObject}
        loginReminderModal={loginReminderModal}
        setLoginReminderModal={setLoginReminderModal}
        />
      )}



    </div>
  )
}
