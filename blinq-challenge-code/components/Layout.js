import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

export default function Layout(props) {
  const { children } = props
  
  return (
    <div>
      <Navigation />

      <main>
        {children}
      </main>

      <Footer />
    </div>
  )
}
