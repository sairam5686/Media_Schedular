import React from 'react'
import { useNavigate } from 'react-router'



const Landing = () => {
  
  const navigate = useNavigate();

  return (
     <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Build something people love
        </h1>
 
        <p className="mt-4 text-lg text-gray-600">subtitle</p>
 
        <button
          type="button"
          onClick={()=>navigate('/Login')}
          className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2">
          Get Started
        </button>
      </div>
    </main>
  )
}

export default Landing