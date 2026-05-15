import React from 'react'
import Hero from './composant/Hero'  
import Boutique from './pages/Boutique'
import Collection from './pages/Home'

import Navbar from './composant/Navbar'
import { Route, Routes } from 'react-router-dom'
import BarRecherche from './composant/BarRecherche'
import Footer from './composant/Footer'


function App() {
  

  return (
    <>
  
     <Navbar/>
  <div className="md:hidden mt-20"> 
       <BarRecherche isNavbar={false} />
    </div>
     <Routes>
      <Route path="/" element={
          <>
         
            <Collection />
          </>
              } />

     
        <Route path='/boutique' element={<Boutique />} />

      </Routes>
      <Footer/>
    </>
  )
}

export default App
  