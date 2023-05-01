import React, { useState } from 'react'
import Image from 'next/image'
import salesforceLogo from '../public/salesforce-logo.png'
import hubspotLogo from '../public/hubspot-logo.png'
import zapierlogo from '../public/zapier-logo.png'
import { useAuth } from '../context/AuthContext'
import IntegrationModal from './IntegrationModal'



export default function IntegrationsDashboard() {
  const [openModal, setOpenModal] = useState(false)

  const { currentUser } = useAuth()

  return (
    <div>

      {currentUser ? <p className='header-message'>User is Logged In</p> : <p className='header-message'>Log In to Set up Integrations</p>}

      <h1 className='integrations-page-title'>Available Integrations</h1>

      {/* salesforce integration */}
      <div
      className='integration-container'
      onClick={() => setOpenModal(prevBool => !prevBool)}
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
      onClick={() => setOpenModal(prevBool => !prevBool)}
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
      onClick={() => setOpenModal(prevBool => !prevBool)}
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

      {/* modal */}
      {openModal && (
        <IntegrationModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        />
      )}


    </div>
  )
}
