import React from 'react'
import { Sidebar, SidebarProvider, SidebarTrigger } from './Components/ui/sidebar';
import AppSideBar from './Components/AppSideBar';
import Dashboard from './Pages/Dashboard';

const App = () => {
  return (
      <SidebarProvider>
      <AppSideBar />

      <main className="flex-1">
        <Dashboard />
      </main>
    </SidebarProvider>
  )
}

export default App;
