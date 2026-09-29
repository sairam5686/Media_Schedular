import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './Pages/Dashboard.tsx';
import SocialConnection from './Pages/SocialConnection.tsx';
import Poster from './Pages/Poster.tsx';
import RuixenMoonChat from './Pages/RuixenMoonChat.tsx';
import Landing from './Pages/Landing.tsx';
import Login from './Pages/Login.tsx';
import Signup from './Pages/Signup.tsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const routes = createBrowserRouter([
  {element: <Landing />, path: "/"},
  {element: <Login />,path: "/login"},
  {element: <Signup />,path: "/signup"},
  
  {
  element: <App />,
  children: [
  { path: "/dashboard",element: <Dashboard />},
  {path: "/socials", element: <SocialConnection />},
  { path: "/poster", element: <Poster /> },
  { path: "/aiposter", element: <RuixenMoonChat /> }
  ]
}
])

createRoot(document.getElementById('root')!).render(<>
        <ToastContainer />
  <RouterProvider router={routes} />
</>
)

