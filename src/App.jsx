import React from 'react'
import Hero from './composant/Hero'  
import Boutique from './pages/Boutique'
import Collection from './pages/Home'

import Navbar from './composant/Navbar'
import { Route, Routes } from 'react-router-dom'
import BarRecherche from './composant/BarRecherche'
import Footer from './composant/Footer'
import PageProduit from './pages/PageProduit'
  import { ToastContainer, toast } from 'react-toastify';
import Panier from './pages/Panier'
import PasserCommande from './pages/PasserCommande'


function App() {
  

  return (
    <>
       <ToastContainer />
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
        <Route path='/produit/:produitId' element={<PageProduit />} />  
        <Route path='/panier' element={<Panier/>}></Route>
        <Route path='/passer-commande' element={<PasserCommande/>}></Route>

      </Routes>
      <Footer/>
    </>
  )
}

export default App
  