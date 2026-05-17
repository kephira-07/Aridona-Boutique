import React from 'react'
import {  Heart,ChevronRight } from 'lucide-react';

import bijou1 from'../assets/bijoux1.jpg';
import bijou2 from'../assets/bijoux2.jpg';
import bijou3 from'../assets/bijoux3.jpg';
import bijou4 from'../assets/bijoux4.jpg';
import DerniereCollection from '../composant/DerniereCollection';
import MeilleurVente from '../composant/MeilleurVente';
import Hero from '../composant/Hero';
export default function Collection() {
  return (
    <div> 
      <Hero/>
      <DerniereCollection/>  
      <MeilleurVente />     
      
     
     </div>
    )
 }
 
