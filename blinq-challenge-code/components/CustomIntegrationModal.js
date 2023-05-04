import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

export default function CustomIntegrationModal({ setCustomIntegrationModal, setUpdatedIntegrationList }) {
  const [arrayOfInputs, setArrayOfInputs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successfulModal, setSuccessfulModal] = useState(false);

  // get currentUser from Auth context
  const { currentUser } = useAuth();

  const addIntegration = () => {

    // client-side validation, don't add integration if name already exists
    let passedValidation = true;

    document.querySelectorAll('.integration-title').forEach(htmlElement => {

      if(htmlElement.innerHTML == document.querySelector('.integration-name-input').value) {
        setErrorMessage('Integration with this name already exists');

        passedValidation = false;
      }

    })
    if(!passedValidation) return;

    // defining the following for more client side validation and for persisting data to firestore
    let keysAndValues = {};
    let keys = [];
    let values = [];

    for (let i = 0; i < arrayOfInputs.length; i++) {
      // creating object based on user input
      keysAndValues = {
        ...keysAndValues,
        [document.querySelector(`.input-left-${i}`).value]: document.querySelector(`.input-right-${i}`).value
      };

      // creating array of keys
      keys = [...keys, document.querySelector(`.input-left-${i}`).value];

      // creating array of values
      values = [...values, document.querySelector(`.input-right-${i}`).value];
    }

    // client-side validation, making sure fields aren't empty
    if(keys.includes('') || values.includes('') || document.querySelector('.integration-name-input').value == '') return setErrorMessage('Fields cannot be empty');

    // adding custom integration to firestore
    const dbRef = collection(db, 'integrations');

    addDoc(dbRef, {
      [currentUser.uid]: {
        ...keysAndValues
      },
      name: document.querySelector('.integration-name-input').value,
      fields: keys
    })
    .then(() => {
      // change updatedIntegrationList state so that api call for integrations update
      setUpdatedIntegrationList(prev => !prev);

      // if the document has been added successfully, direct users to the successful modal
      setSuccessfulModal(true);

      // set errorMessage state to ''
      setErrorMessage('');
    })
    .catch(err => {
      console.log(err);

      // if there was an error, display the error message by changing the state
      setErrorMessage('There was an error setting up this integration');

      // empty all the input values
      for (let i = 0; i < arrayOfInputs.length; i++) {
        document.querySelector('.integration-name-input').value = '';
        document.querySelector(`.input-left-${i}`).value = '';
        document.querySelector(`.input-right-${i}`).value = '';
      }
    })

  }

  return (
    <div className='custom-integration-modal'>

      {
        successfulModal
        ?
        (
          <div className='successful-modal'>
            <h2 className='successful-modal-title'>Integration completed successfully!</h2>

            <button
            className="modal-btn"
            onClick={() => {
              setCustomIntegrationModal(false);
              setSuccessfulModal(false);
            }}
            >
              Okay
            </button>
          </div>
        )
        :
        (
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
              setArrayOfInputs(prevArray => [...prevArray, {}]);
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

            <button
            className='custom-cancel-btn'
            onClick={() => setCustomIntegrationModal(false)}
            >
              Cancel
            </button>

            {(errorMessage !== '') && (
              <p className='client-side-error'>{errorMessage}</p>
            )}

          </div>
        )
      }

    </div>
  )
}
