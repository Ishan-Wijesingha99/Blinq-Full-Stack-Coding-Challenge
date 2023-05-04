import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

// create Layout component so that every page includes Navigation and Footer component
export default function Layout(props) {
  const { children } = props;
  
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
