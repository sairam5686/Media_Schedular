import React from 'react'
import { Sidebar, SidebarProvider, SidebarTrigger } from './Components/ui/sidebar';
import AppSideBar from './Components/AppSideBar';

const App = () => {
  return (
      <SidebarProvider>
      <AppSideBar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </main>
    </SidebarProvider>
  )
}

export default App;
