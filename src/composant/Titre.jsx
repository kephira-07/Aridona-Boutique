import React from 'react'

const Titre = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'> <p className='text-amber-500 text-4xl font-parisienne'>{text1} <span className='text-gray-900 font-medium font-alice '>{text2}</span></p>
    <p className='w-8 sm:w12 h-1 bg-gray-800'></p>
    </div>
  )
}

export default Titre