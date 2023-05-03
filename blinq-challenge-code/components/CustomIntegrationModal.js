import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'



export default function CustomIntegrationModal({ customIntegrationModal, setCustomIntegrationModal }) {
  const [arrayOfInputs, setArrayOfInputs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const { currentUser } = useAuth()

  let keysAndValues = {}
  let keys = []
  let values = []

  const addIntegration = () => {

    for (let i = 0; i < arrayOfInputs.length; i++) {

      keysAndValues = {
        ...keysAndValues,
        [document.querySelector(`.input-left-${i}`).value]: document.querySelector(`.input-right-${i}`).value
      }

      keys = [...keys, document.querySelector(`.input-left-${i}`).value]

      values = [...values, document.querySelector(`.input-right-${i}`).value]

    }

    // client-side validation
    if(keys.includes('') || values.includes('') || document.querySelector('.integration-name-input').value == '') return setErrorMessage('Fields cannot be empty')



    const dbRef = collection(db, 'integrations')

    addDoc(dbRef, {
      [currentUser.uid]: {
        ...keysAndValues
      },
      name: document.querySelector('.integration-name-input').value,
      fields: keys
    })
    .then(data => {
      console.log('Document added successfully!')

      // if the document has been added successfully, you must direct users to the successful modal

      // you must also clear all the input fields

      // set errorMessage state to ''
    })
    .catch(err => {
      console.log(err)

      // if there was an error, you need to display the error message by changing the state

      // empty all the input values
    })

  }


  return (
    <div className='custom-integration-modal'>
      <div className='custom-integration-container'>

        <h2>Add Custom Integration</h2>

        <div className='custom-integration-name-container'>   
          <label
          htmlFor="custom-integration-name"
          className='custom-integration-placeholder'
          >
            Integration Name
          </label>
          <input
          type="text"
          id='custom-integration-name'
          className='integration-name-input'  
          />
        </div>

        <button
        className='add-field-btn'
        onClick={() => {
          setArrayOfInputs(prevArray => [...prevArray, {}])
        }}
        >
          Add Field
        </button>

        {
          arrayOfInputs.length > 0 && arrayOfInputs.map((object, i) => (
            <div
            className='two-inputs'
            key={i}
            >
              <input
              type="text"
              placeholder='Input key'
              className={`add-field-input input-left-${i}`}
              />

              <input
              type="text"
              placeholder='Input value'
              className={`add-field-input input-right-${i}`}
              style={{ marginLeft: '10px'}}
              />
            </div>
          ))
        }

        {arrayOfInputs.length > 0 && (
          <button
          className='add-integration-btn'
          onClick={addIntegration}
          >
            Add Integration
          </button>
        )}

        {(errorMessage !== '') && (
          <p className='client-side-error'>{errorMessage}</p>
        )}

      </div>
    </div>
  )
}
