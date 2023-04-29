import React from 'react'
import Navigation from './Navigation'

export default function Layout(props) {
  const { children } = props
  
  return (
    <div>
      <Navigation />

      <main>
        {children}
      </main>

      
    </div>
  )
}
