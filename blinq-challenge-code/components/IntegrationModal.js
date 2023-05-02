import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';





export default function IntegrationModal({ formModal, setFormModal, currentModalObject, setCurrentModalObject, currentIntegrationId, setCurrentIntegrationId }) {

  const { currentUser } = useAuth()
  console.log(currentUser.uid)
  
  const inputJSXArray = currentModalObject.fields.map((element, i) => (
    <FloatingLabel
    label={element}
    className='mt-4 modal-form-input'
    key={i}
    >

      <Form.Control
      className={`modal-form-input-${i}`}
      type="text"
      />

    </FloatingLabel>
  ))


  
  const submitHandler = event => {
    event.preventDefault()

    let newObj

    const docRef = doc(db, "integrations", currentIntegrationId)


    currentModalObject.fields.forEach((fieldName, i) => {

      newObj = {
        ...newObj,
        [fieldName]: document.querySelector(`.modal-form-input-${i}`).value
      }

      console.log(fieldName, i, document.querySelector(`.modal-form-input-${i}`).value)
      console.log(newObj)
    })

    // spread newObj and currentModalObject, and also add uid, then update document in firestore
    setDoc(docRef, {
      ...currentModalObject,
      [currentUser.uid]: {
        uid: currentUser.uid,
        ...newObj
      }
    }).then(data => console.log('update successful!')).catch(err => console.log(err))

    setCurrentModalObject(prevObject => {
      return {
        ...prevObject,
        [currentUser.uid]: {
          uid: currentUser.uid,
          ...newObj
        }
      }
    })

    // take user to a page that says update succesful! then return them to integrations page

  }


  
  return (
    <div className='integration-modal'>
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

      </Form>
    </div>
  )
}
