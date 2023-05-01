import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';




export default function IntegrationModal(props) {
  const { integrationName, openModal, setOpenModal } = props
  
  return (
    <div className='integration-modal'>
      <Form className='integration-modal-form'>
        <h1 className='modal-title'>Add {integrationName} Integration</h1>

        <FloatingLabel
        label="client_id"
        className="mt-4 modal-form-input"
        >

          <Form.Control
          type="text"
          />

        </FloatingLabel>


        <FloatingLabel
        label="client_secret"
        className="mt-4 modal-form-input"
        >

          <Form.Control
          type="text"
          />

        </FloatingLabel>

        <Button
        type="submit"
        className='modal-form-btn'
        >
          Add Integration
        </Button>

        <Button
        onClick={() => setOpenModal(prevBool => !prevBool)}
        className='modal-form-btn'
        >
          Cancel
        </Button>

      </Form>

      <p>{integrationName}</p>
    </div>
  )
}
