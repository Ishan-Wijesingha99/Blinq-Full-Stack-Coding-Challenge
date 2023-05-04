import React, { useState } from 'react'
import Image from 'next/image'
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


  const { currentUser } = useAuth()



  return (
    <div>

      {currentUser ? <p className='header-message'>User is Logged In</p> : <p className='header-message'>Log In to Set up Integrations</p>}

      <h1 className='integrations-page-title'>Available Integrations</h1>



      <AddIntegration
      loginReminderModal={loginReminderModal}
      setLoginReminderModal={setLoginReminderModal}
      customIntegrationModal={customIntegrationModal}
      setCustomIntegrationModal={setCustomIntegrationModal}
      />

      <IntegrationContainers
        formModal={formModal}
        setFormModal={setFormModal}
        currentModalObject={currentModalObject}
        setCurrentModalObject={setCurrentModalObject}
        currentIntegrationId={currentIntegrationId}
        setCurrentIntegrationId={setCurrentIntegrationId}
        loginReminderModal={loginReminderModal}
        setLoginReminderModal={setLoginReminderModal}
        updatedIntegrationList={updatedIntegrationList}
        setUpdatedIntegrationList={setUpdatedIntegrationList}
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
        updatedIntegrationList={updatedIntegrationList}
        setUpdatedIntegrationList={setUpdatedIntegrationList}
        />
      )}

      {/* modal telling user to log in */}
      {loginReminderModal && (
        <LoginReminderModal
        currentModalObject={currentModalObject}
        setCurrentModalObject={setCurrentModalObject}
        loginReminderModal={loginReminderModal}
        setLoginReminderModal={setLoginReminderModal}
        />
      )}

      {/* modal for adding a custom integration */}
      {customIntegrationModal && (
        <CustomIntegrationModal
        customIntegrationModal={customIntegrationModal}
        setCustomIntegrationModal={setCustomIntegrationModal}
        updatedIntegrationList={updatedIntegrationList}
        setUpdatedIntegrationList={setUpdatedIntegrationList}
        />
      )}


    </div>
  )
}
