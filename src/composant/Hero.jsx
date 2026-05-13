import React, { useState, useEffect,useCallback } from 'react';
import {ChevronLeft ,ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import im1 from '../assets/im1.jpg'; 
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';

 import img5 from '../assets/img5.jpg';
  import img6 from '../assets/img6.jpg';
 import img7 from '../assets/img7.jpg';
 import img8 from '../assets/img8.jpg'; 
const slides= [ img2,img3,img5,img6,img7,img8,im1,];
const Caroussel = ({ children: slides, autoSlide = true, autoSlideInterval = 3000 }) => {
  const [curr, setCurr] = useState(0);

  
  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = useCallback(() => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  }, [slides.length]);

  useEffect(() => {
    if (!autoSlide) return;
    
    const slideInterval = setInterval(next, autoSlideInterval);
    
   
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]); 

  return (
    <div className="overflow-hidden relative w-full h-full">
      <div 
        className="flex transition-transform ease-out duration-500 h-full" 
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      
      {/* Contrôles Précédent / Suivant */}
      <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
        <button 
          className="p-1 rounded-full shadow bg-white/80 text-amber-600 hover:bg-amber-600 hover:text-white pointer-events-auto" 
          onClick={prev}
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          className="p-1 rounded-full shadow bg-white/80 text-amber-600 hover:bg-amber-600 hover:text-white pointer-events-auto" 
          onClick={next}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Indicateurs (Points) */}
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === curr ? "bg-amber-600 scale-125" : "bg-amber-600/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Hero() {
    

  
 

    const images= [
    { id: 1, src: img2, title: 'Bague Éclat Éternel' },
    { id: 2, src: img3, title: 'Alliance Or Pur' },
    { id: 3, src: img5, title: 'Collier Signature Arilona' },
    { id: 4, src: img6, title: 'Bracelet Jonc Fin' },
    { id: 5, src: img7, title: 'Joc' },
    { id: 6, src: img8, title: ' jonc Fin' },
    { id: 7, src: im1, title: 'Fin' },
    
  ];

  
  return (  
    <main className="md:pt-45  bg-[#fffaf5] h-170">
      <div className="max-w-10xl mx-auto px-1.5  h-full flex flex-col justify-center">
       
        {/* --- GRILLE PC --- */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-1 h-130">
          <div className="col-span-2 row-span-2 relative overflow-hidden group ">
            <img src={images[0].src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Bijou" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            
          </div>
          <div className="col-span-1 row-span-1 relative overflow-hidden group ">
            <img src={images[1].src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Bijou" />
          </div>
          <div className="col-span-1 row-span-2 relative overflow-hidden group ">
            <img src={images[2].src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Bijou" />
          </div>
          <div className="col-span-1 row-span-1 relative overflow-hidden group ">
            <img src={images[3].src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Bijou" />
          </div>
        </div>
       <div className="md:hidden w-full h-100 mt-17 rounded-2xl  flex items-center flex-col overflow-hidden">
              <Caroussel autoSlide={true} autoSlideInterval={3000}>
                {images.map((image) => (
                  <img 
                    key={image.id}   src={image.src}     
                    alt={image.title}       
                    className="min-w-full h-full object-cover" 
                  />
                ))}
              </Caroussel>
        </div>
        {/* Bouton Global */}
        <div className="mt-5 text-center">


        <div className="p-10 flex justify-center items-center bg-gray-50">
        <Link  to="/boutique" 
        className=" relative px-8 py-3 rounded-full 
          bg-white text-gray-900 border-2 border-amber-300 font-parisienne text-3xl font-medium tracking-wide
           shadow-[0_4px_0_0_rgba(251,191,36,1)]   transition-all duration-150 ease-in-out  hover:shadow-[0_10px_20px_0_rgba(251,191,36,0.5)] hover:-translate-y-1 hover:bg-amber-50 active:shadow-[0_1px_0_0_rgba(251,191,36,1)] active:translate-y-2 active:scale-[0.98]        focus:outline-none focus:ring-4 focus:ring-amber-200" >
        <span className="inline-flex items-center gap-3">
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Visiter Boutique
        </span>
      </Link>
    </div>

        </div>

      </div>
       
    </main>
  );
};


