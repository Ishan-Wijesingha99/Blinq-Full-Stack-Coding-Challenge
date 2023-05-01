import React, { useState } from 'react'
import Image from 'next/image'
import salesforceLogo from '../public/salesforce-logo.png'
import hubspotLogo from '../public/hubspot-logo.png'
import zapierlogo from '../public/zapier-logo.png'
import { useAuth } from '../context/AuthContext'
import IntegrationModal from './IntegrationModal'
import LoginReminderModal from './LoginReminderModal'



export default function IntegrationsDashboard() {
  const [formModal, setFormModal] = useState(false)
  const [loginReminderModal, setLoginReminderModal] = useState(false)
  const [currentIntegrationName, setCurrentIntegrationName] = useState('')
  const [currentInputArray, setCurrentInputArray] = useState([])

  const { currentUser } = useAuth()

  return (
    <div>

      {currentUser ? <p className='header-message'>User is Logged In</p> : <p className='header-message'>Log In to Set up Integrations</p>}

      <h1 className='integrations-page-title'>Available Integrations</h1>

      {/* salesforce integration */}
      <div
      className='integration-container'
      onClick={() => {
        if(currentUser) {
          setFormModal(prevBool => !prevBool)
          setCurrentIntegrationName('Salesforce')
          setCurrentInputArray(['client_id', 'client_secret'])
        } else {
          setLoginReminderModal(prevBool => !prevBool)
        }
      }}
      >
        <Image
        src={salesforceLogo}
        width={140}
        height={100}
        className='integration-logo'
        />

        <div className='integration-right-side'>
          <h2 className='integration-title'>Salesforce</h2>

          <p className='integration-text'>Integrate Salesforce with Blinq!</p>
        </div>

      </div>

      {/* HubSpot integration */}
      <div
      className='integration-container'
      onClick={() => {
        if(currentUser) {
          setFormModal(prevBool => !prevBool)
          setCurrentIntegrationName('HubSpot')
          setCurrentInputArray(['tenant_domain', 'client_id', 'client_secret', 'field_mappings'])
        } else {
          setLoginReminderModal(prevBool => !prevBool)
        }
      }}
      >
        <Image
        src={hubspotLogo}
        width={140}
        height={40}
        className='integration-logo'
        />

        <div className='integration-right-side'>
          <h2 className='integration-title'>HubSpot</h2>

          <p className='integration-text'>Integrate HubSpot with Blinq!</p>
        </div>

      </div>

      {/* Zapier integration */}
      <div
      className='integration-container'
      onClick={() => {
        if(currentUser) {
          setFormModal(prevBool => !prevBool)
          setCurrentIntegrationName('Zapier')
          setCurrentInputArray(['api_key'])
        } else {
          setLoginReminderModal(prevBool => !prevBool)
        }
      }}
      >
        <Image
        src={zapierlogo}
        width={140}
        height={40}
        className='integration-logo'
        />

        <div className='integration-right-side'>
          <h2 className='integration-title'>Zapier</h2>

          <p className='integration-text'>Integrate Zapier with Blinq!</p>
        </div>

      </div>

      {/* form modal */}
      {formModal && (
        <IntegrationModal
        formModal={formModal}
        setFormModal={setFormModal}
        currentIntegrationName={currentIntegrationName}
        currentInputArray={currentInputArray}
        />
      )}

      {/* modal telling user to log in */}
      {loginReminderModal && (
        <LoginReminderModal
        currentIntegrationName={currentIntegrationName}
        loginReminderModal={loginReminderModal}
        setLoginReminderModal={setLoginReminderModal}
        />
      )}



    </div>
  )
}
