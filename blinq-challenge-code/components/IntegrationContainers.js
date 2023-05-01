import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
// for retrieving data from firestore
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'



export default function IntegrationContainers({ formModal, setFormModal, loginReminderModal, setLoginReminderModal, currentModal, setCurrentModal}) {
  const { currentUser } = useAuth()
  const [dataArray, setDataArray] = useState([])



  useEffect(() => {

    const getIntegrationJSX = async () => {
      const snapshots = await getDocs(collection(db, 'integrations'))
  
      const data = snapshots.docs.map(doc => doc.data())

      setDataArray(data)

    }
  
    getIntegrationJSX()

    console.log(dataArray)

  }, [])
  



  return (
    <>
      {
        dataArray.map((object, i) => (
          <div
          className='integration-container'
          onClick={() => {
            if(currentUser) {
              setCurrentModal(object.name)
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
