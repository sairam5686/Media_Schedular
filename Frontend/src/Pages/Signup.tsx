import { Link, useNavigate } from 'react-router-dom'
import WorldMapDemo from '../Components/world-map-demo'
import { useState } from 'react'
import {  toast } from 'react-toastify';
const Signup = () => {
  const [UserAuth , setUserAuth] = useState<any>({
    UserName: "" , 
    Password : "",
    Email:""
  })

  const navigate = useNavigate()

  const onClickHandler = async () => {
    if (  !UserAuth.UserName?.trim() || !UserAuth.Password || !UserAuth.Email?.trim()) {
       toast.warning("Fill all the required details")
       return ; 
    } else {
      try {
        const response = await fetch("http://127.0.0.1:5000/signup", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(UserAuth)
        })
        
        const data = await response.json()
        if(response.status == 200 ){
          toast.success(data.message)
          navigate('/login');
        }else if(response.status == 409){
          toast(data.message); 
          return ; 
        }

      } catch (error) {
        console.log(error);

      }
    }

  } 

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-2">
      <section className="order-2 flex items-center justify-center px-6 py-12 sm:px-12 lg:order-1 lg:px-16">
        <div className="w-full max-w-md">
          <Link to="/" className="text-xl font-bold tracking-tight text-gray-950">
            Social<span className="text-indigo-600">Flow</span>
          </Link>

          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
              Get started
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
              Create your account
            </h1>
            <p className="mt-3 text-gray-600">
              Bring your social channels together and make planning easier.
            </p>
          </div>

        
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-800">
                Full name
              </label>
              <input
                onChange={(e)=>setUserAuth(()=>({...UserAuth ,UserName: e.target.value }))}
                value={UserAuth.UserName}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                required
                className="h-12 w-full rounded-md border border-gray-300 bg-white px-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/15"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-800">
                Email address
              </label>
              <input
                onChange={(e)=>setUserAuth(()=>({...UserAuth , Email:e.target.value }))}
                
                value={UserAuth.Email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="h-12 w-full rounded-md border border-gray-300 bg-white px-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/15"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-800">
                Password
              </label>
              <input
                onChange={(e)=>setUserAuth(()=>({...UserAuth , Password:e.target.value }))}
                value={UserAuth.Password}
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                minLength={8}
                required
                className="h-12 w-full rounded-md border border-gray-300 bg-white px-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/15"
              />
              <p className="mt-2 text-xs text-gray-500">Use at least 8 characters.</p>
            </div>

            <button
              type="submit"
              onClick={onClickHandler}
              className="h-12 w-full rounded-md bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            >
              Create account
            </button>
          

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Sign in
            </Link>
          </p>
        </div>
      </section>

      <aside className="order-1 overflow-hidden lg:order-2">
        <WorldMapDemo />
      </aside>
    </main>
  )
}

export default Signup