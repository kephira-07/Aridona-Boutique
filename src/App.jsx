import React from 'react'
import Hero from './composant/Hero'  
import Boutique from './pages/Boutique'
import Collection from './pages/Home'

import Navbar from './composant/Navbar'
import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <>
  
    <Navbar/>
     <Routes>
     <Route path="/" element={
  <>
    <Hero />
    <Collection />
  </>
} />

     
      <Route path='/boutique' element={<Boutique />} />

      </Routes>
    </>
  )
}

export default App
  