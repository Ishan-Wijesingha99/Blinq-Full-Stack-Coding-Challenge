import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

export default function IntegrationContainers({ setFormModal, setLoginReminderModal, setCurrentModalObject, setCurrentIntegrationId, updatedIntegrationList }) {
  const [dataArray, setDataArray] = useState([]);
  const [collectionIdArray, setCollectionIdArray] = useState([]);

  // get currentUser from Auth context
  const { currentUser } = useAuth();

  useEffect(() => {

    // define async function inside useEffect than call it
    const getIntegrationData = async () => {

      // get allDocs from firestore
      const snapshots = await getDocs(collection(db, 'integrations'))
      
      // need document ids for knowing which modal data to show
      const IdData = snapshots.docs.map(object => object.id);
      setCollectionIdArray(IdData);
      
      // extract document data
      const data = snapshots.docs.map(doc => doc.data());

      // check if user is logged in 
      if(currentUser) {
        // if so, filter out everything except the main 3 integrations and the ones that don't have that uid
        const filteredIntegrations = data.filter(object => object.name === 'Salesforce' || object.name === 'HubSpot' || object.name === 'Zapier' || object[currentUser.uid] != null);

        setDataArray(filteredIntegrations);
      } else {
        // if not, filter out everything except the main 3 integration
        const filteredIntegrations = data.filter(object => object.name === 'Salesforce' || object.name === 'HubSpot' || object.name === 'Zapier');

        setDataArray(filteredIntegrations);
      }

    }
  
    getIntegrationData();

  }, [currentUser, updatedIntegrationList])
  
  return (
    <>
      {
        dataArray.map((object, i) => (
          <div
          className='integration-container'
          onClick={() => {
            if(currentUser) {
              setCurrentModalObject(object);
              setCurrentIntegrationId(collectionIdArray[i]);
              setFormModal(true);
            } else {
              setCurrentModalObject(object);
              setLoginReminderModal(true);
            }
          }}
          key={i}
          >
            <h2 className='integration-title'>{object.name}</h2>
  
            <p className='integration-text'>Integrate {object.name} with Blinq!</p>
          </div>
        ))
      }
    </>
  )
}
