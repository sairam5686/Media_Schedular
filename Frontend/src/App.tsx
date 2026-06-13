import React from 'react'
import {  SidebarProvider } from './Components/ui/sidebar';
import AppSideBar from './Components/AppSideBar';
import Dashboard from './Pages/Dashboard';
import SocialConnection from './Pages/SocialConnection';
import RuixenMoonChat from './Pages/RuixenMoonChat';
import { Outlet } from 'react-router';

const App = () => {
  return (
      <SidebarProvider>
      <AppSideBar />

      <main className="flex-1">
      <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default App;
