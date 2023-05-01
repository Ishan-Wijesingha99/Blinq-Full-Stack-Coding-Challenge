import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
// for retrieving data from firestore
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'



export default function IntegrationContainers({ formModal, setFormModal, loginReminderModal, setLoginReminderModal, currentModalObject, setCurrentModalObject, currentIntegrationId, setCurrentIntegrationId }) {
  const { currentUser } = useAuth()
  const [dataArray, setDataArray] = useState([])
  const [collectionIdArray, setCollectionIdArray] = useState([])

  useEffect(() => {

    const getIntegrationData = async () => {
      const snapshots = await getDocs(collection(db, 'integrations'))


      // need Ids for updating (persisting fields to database)
      const IdData = snapshots.docs.map(object => object.id)
      setCollectionIdArray(IdData)
  


      const data = snapshots.docs.map(doc => doc.data())
      setDataArray(data)
    }
  
    getIntegrationData()

  }, [])
  



  return (
    <>
      {
        dataArray.map((object, i) => (
          <div
          className='integration-container'
          onClick={() => {
            if(currentUser) {
              setCurrentModalObject(object)
              setCurrentIntegrationId(collectionIdArray[i])
              setFormModal(prevBool => !prevBool)
            } else {
              setLoginReminderModal(prevBool => !prevBool)
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
