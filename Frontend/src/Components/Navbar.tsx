import type { NavPropType } from '@/lib/Types'
import React from 'react'

const Navbar = ({Title,Para}:NavPropType) => {
  return (
    <nav className='flex flex-col bg-white px-5 pt-2'>
        <h1 className='text-2xl font-semibold'>
            {Title}
        </h1>
        <p className='text-md text-gray-500'>{Para}</p>
    </nav>
  )
}

export default Navbar