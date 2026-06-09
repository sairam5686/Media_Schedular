import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

import {
  Home,
  User,
  Settings,
  FileText,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/",
  },
  {
    title: "Profile",
    icon: User,
    url: "/profile",
  },
  {
    title: "Documents",
    icon: FileText,
    url: "/documents",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

const AppSideBar = () => {
  return (
    <Sidebar side="left" collapsible="icon">
      {/* Header */}
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-bold">My App</h2>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent>
        <SidebarMenu>
         
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;