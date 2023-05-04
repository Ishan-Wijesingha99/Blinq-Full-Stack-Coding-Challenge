import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

export default function IntegrationModal({ formModal, setFormModal, currentModalObject, setCurrentModalObject, currentIntegrationId, setUpdatedIntegrationList }) {
  const [successfulModal, setSuccessfulModal] = useState(false)
  const [successfulModalMessage, setSuccessfulModalMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [inputJSXArray, setInputJSXArray] = useState([])

  // get currentUser from Auth context
  const { currentUser } = useAuth()

  useEffect(() => {

    // define async function inside useEffect and then call it
    const setInputs = async () => {
      // get document with the currentIntegrationId
      const docRef = doc(db, 'integrations', currentIntegrationId)

      const docSnap = await getDoc(docRef)

      // loop over currentModalObject.fields to create inputs for each of the integration's specific fields
      setInputJSXArray(currentModalObject.fields.map((element, i) => {
        // extract data
        const currentUserObject = docSnap.data()

        return (
          <FloatingLabel
          label={element}
          className='mt-4 modal-form-input'
          key={i}
          >
            <Form.Control
            className={`modal-form-input-${i}`}
            type="text"
            // display the values for each input if they are already saved in firestore, if not just display an empty string
            defaultValue={currentUserObject[currentUser.uid] ? currentUserObject[currentUser.uid][element] : ''}
            /> 
          </FloatingLabel>
        )
      }))

    }

    setInputs()

  }, [formModal])

  const submitHandler = event => {
    // prevent reloading of page
    event.preventDefault()

    let newObj

    const docRef = doc(db, "integrations", currentIntegrationId)

    currentModalObject.fields.forEach((fieldName, i) => {
      newObj = {
        ...newObj,
        [fieldName]: document.querySelector(`.modal-form-input-${i}`).value
      }
    })

    // spread newObj and currentModalObject, and also add uid, then update document in firestore
    setDoc(docRef, {
      ...currentModalObject,
      [currentUser.uid]: {
        uid: currentUser.uid,
        ...newObj
      }
    })
    .then(() => {
      // set currentModalObject to updated object
      setCurrentModalObject(prevObject => {
        return {
          ...prevObject,
          [currentUser.uid]: {
            uid: currentUser.uid,
            ...newObj
          }
        }
      })

      // take user to new modal that says update has been successful
      setSuccessfulModal(true)
      setSuccessfulModalMessage('Integration completed successfully!')

      // if firestore was successfully updated, make sure error message goes away
      setErrorMessage('')
    })
    .catch(err => {
      console.log(err)

      // if adding changes to firestore is unsuccessful, show error message
      setErrorMessage('An error occured when trying to set up this integration')
    })

  }

  const deleteIntegration = () => {
    const docRef = doc(db, 'integrations', currentIntegrationId)

    deleteDoc(docRef)
    .then(() => {
      // direct user to successful modal
      setSuccessfulModal(true)
      setSuccessfulModalMessage('Integration deleted successfully!')

      // reload integration containers by changing this state
      setUpdatedIntegrationList(prev => !prev)
    })
    .catch(err => {
      console.log(err)

      setErrorMessage('An error occured when trying to delete this integration')
    })
  }

  return (
    <div className='integration-modal'>

      {
        successfulModal
        ?
        (
          <div className='successful-modal'>
            <h2 className='successful-modal-title'>{successfulModalMessage}</h2>

            <button
            className="modal-btn"
            onClick={() => {
              setFormModal(false)
              setSuccessfulModal(false)
            }}
            >
              Okay
            </button>
          </div>
        )
        :
        (
          <Form
          className='integration-modal-form'
          onSubmit={submitHandler}
          >
            <h1 className='modal-title'>Add {currentModalObject.name} Integration</h1>

            {inputJSXArray}

            <Button
            type="submit"
            className='modal-form-btn'
            >
              Add Integration
            </Button>

            <Button
            onClick={() => setFormModal(prevBool => !prevBool)}
            className='modal-form-btn'
            >
              Cancel
            </Button>

            { 
              !(currentModalObject.name === 'Salesforce' || currentModalObject.name === 'HubSpot' || currentModalObject.name === 'Zapier') && (
                <Button
                className='modal-form-btn'
                onClick={deleteIntegration}
                >
                  Delete Custom Integration
                </Button>
              )
            }

            {!(errorMessage === '') && <p className='modal-error-msg'>{errorMessage}</p>}
          </Form>
        )
      }

    </div>
  )
}
