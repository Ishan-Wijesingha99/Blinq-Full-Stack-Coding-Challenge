import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import IntegrationModal from './IntegrationModal'
import LoginReminderModal from './LoginReminderModal'
import IntegrationContainers from './IntegrationContainers'
import AddIntegration from './AddIntegration'
import CustomIntegrationModal from './CustomIntegrationModal'

export default function IntegrationsDashboard() {
  const [formModal, setFormModal] = useState(false)
  const [loginReminderModal, setLoginReminderModal] = useState(false)
  const [customIntegrationModal, setCustomIntegrationModal] = useState(false)
  const [currentModalObject, setCurrentModalObject] = useState({})
  const [currentIntegrationId, setCurrentIntegrationId] = useState('')
  const [updatedIntegrationList, setUpdatedIntegrationList] = useState(false)

  // get currentUser from Auth context
  const { currentUser } = useAuth()

  return (
    <div>
      
      {/* conditionally render p tag based on whether user is logged in or not */}
      {currentUser ? <p className='header-message'>User is Logged In</p> : <p className='header-message'>Log In to Set up Integrations</p>}

      <h1 className='integrations-page-title'>Available Integrations</h1>

      {/* add custom integration component */}
      <AddIntegration
      setLoginReminderModal={setLoginReminderModal}
      setCustomIntegrationModal={setCustomIntegrationModal}
      />

      {/* all integrations */}
      <IntegrationContainers
        setFormModal={setFormModal}
        setCurrentModalObject={setCurrentModalObject}
        setCurrentIntegrationId={setCurrentIntegrationId}
        setLoginReminderModal={setLoginReminderModal}
        updatedIntegrationList={updatedIntegrationList}
      />

      {/* form modal */}
      {formModal && (
        <IntegrationModal
        formModal={formModal}
        setFormModal={setFormModal}
        currentModalObject={currentModalObject}
        setCurrentModalObject={setCurrentModalObject}
        currentIntegrationId={currentIntegrationId}
        setUpdatedIntegrationList={setUpdatedIntegrationList}
        />
      )}

      {/* modal telling user to log in */}
      {loginReminderModal && (
        <LoginReminderModal
        setCurrentModalObject={setCurrentModalObject}
        setLoginReminderModal={setLoginReminderModal}
        />
      )}

      {/* modal for adding a custom integration */}
      {customIntegrationModal && (
        <CustomIntegrationModal
        setCustomIntegrationModal={setCustomIntegrationModal}
        setUpdatedIntegrationList={setUpdatedIntegrationList}
        />
      )}

    </div>
  )
}
