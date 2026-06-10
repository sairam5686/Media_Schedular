import React from 'react'
import {  SidebarProvider } from './Components/ui/sidebar';
import AppSideBar from './Components/AppSideBar';
import Dashboard from './Pages/Dashboard';
import SocialConnection from './Pages/SocialConnection';

const App = () => {
  return (
      <SidebarProvider>
      <AppSideBar />

      <main className="flex-1">
        <SocialConnection />
      </main>
    </SidebarProvider>
  )
}

export default App;
