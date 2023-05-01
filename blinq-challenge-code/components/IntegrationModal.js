import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';




export default function IntegrationModal({ currentIntegrationName, currentInputArray, formModal, setFormModal, currentModal }) {
  
  const inputJSXArray = currentInputArray.map((element, i) => (
    <FloatingLabel
    label={element}
    className="mt-4 modal-form-input"
    key={i}
    >

      <Form.Control
      type="text"
      />

    </FloatingLabel>
  ))


  
  return (
    <div className='integration-modal'>
      <Form className='integration-modal-form'>
        <h1 className='modal-title'>Add {currentIntegrationName} Integration</h1>

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
