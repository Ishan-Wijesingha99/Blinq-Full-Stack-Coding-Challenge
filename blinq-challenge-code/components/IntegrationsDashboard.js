import React from 'react'
import Image from 'next/image'
import salesforceLogo from '../public/salesforce-logo.png'
import hubspotLogo from '../public/hubspot-logo.png'
import zapierlogo from '../public/zapier-logo.png'
import { useAuth } from '../context/AuthContext'



export default function IntegrationsDashboard() {
  const { currentUser } = useAuth()

  return (
    <div>

      {currentUser && <p className='logged-in-message'>User is Logged In</p>}

      <h1 className='integrations-page-title'>Available Integrations</h1>

      {/* salesforce integration */}
      <div className='integration-container'>
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
      <div className='integration-container'>
        <Image
        src={hubspotLogo}
        width={140}
        height={40}
        className='integration-logo'
        />

        <div className='integration-right-side'>
          <h2 className='integration-title'>Salesforce</h2>

          <p className='integration-text'>Integrate Salesforce with Blinq!</p>
        </div>

      </div>

      {/* Zapier integration */}
      <div className='integration-container'>
        <Image
        src={zapierlogo}
        width={140}
        height={40}
        className='integration-logo'
        />

        <div className='integration-right-side'>
          <h2 className='integration-title'>Salesforce</h2>

          <p className='integration-text'>Integrate Salesforce with Blinq!</p>
        </div>

      </div>



    </div>
  )
}
