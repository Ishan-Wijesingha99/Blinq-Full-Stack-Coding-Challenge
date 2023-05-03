import React, { useState } from 'react'



export default function CustomIntegrationModal({ customIntegrationModal, setCustomIntegrationModal }) {
  const [integrationName, setIntegrationName] = useState('')


  return (
    <div className='custom-integration-modal'>
      <div className='custom-integration-container'>

        <h2>Add Custom Integration</h2>

        <div className='custom-integration-name-container'>   
          <label htmlFor="custom-integration-name">
            Integration Name
          </label>
          <input
          type="text"
          id='custom-integration-name'
          value={integrationName}
          onChange={e => setIntegrationName(e.target.value)}    
          />
        </div>

      </div>
    </div>
  )
}
