import { ShoppingBag } from 'lucide-react'
import React from 'react'

const Boutton = ({textb}) => {
  return (
    <div className='group relative mt-10  mb-5    shadow-lg '>
         <div className='absolute  w-65 h-0.5 bg-amber-700'></div>
        <div className='bg-amber-700 w-59 h-15 border-l-2 border-amber-700 '>
  
           <div className=' flex items-center active:rounded-4xl transition-all font-caveat text-2xl h-12 bg-amber-50 w-56 p-2 hover:w-60 hover:h-15  hover:border-2 border-amber-700 duration-100'>
          <ShoppingBag className='w-5 h-5'/>
          {textb}
          <span className="absolute bottom-4 left-3w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-45"></span>
        </div>
        </div>
    </div>
  )
}

export default Boutton