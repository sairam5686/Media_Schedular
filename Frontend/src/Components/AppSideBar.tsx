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

import Logo from "../assets/Logo.svg";

import {
  LayoutDashboard,
  Link2,
  FileText,
  Sparkles,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router";


const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    link: "/"
  },
  {
    title: "Connects",
    icon: Link2,
    link: "/socials"
  },
  {
    title: "Posts",
    icon: FileText,
    link: "/poster"
  },
  {
    title: "AI Generator",
    icon: Sparkles,
    link: "/aiposter"
  },
];

const AppSideBar = () => {
  const navigator = useNavigate();

  return (
    <Sidebar side="left" collapsible="icon">
      {/* Header */}
      <SidebarHeader className="border-b">
        <div className="flex  items-center gap-3 p-4">
          <img src={Logo} alt="Logo" className="h-15 w-15 bg-gradient-to-r from-lime-100 to-teal-400 rounded-xl" />
          <div>
            <h2 className="font-bold text-lg">Social Scheduler</h2>
            <p className="text-xs text-muted-foreground">
              Manage your content
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-2 py-4">
        <SidebarMenu className="">
          {menuItems.map((item) => (
            <SidebarMenuItem  key={item.title}>
              <SidebarMenuButton onClick={()=>navigator(item.link)}
                tooltip={item.title}
                className="h-11 rounded-lg hover:bg-gradient-to-r from-lime-100 to-teal-400"
                
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
<SidebarFooter className="border-t p-3">
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton className="h-14 rounded-xl">
        <img
          src="https://images.pexels.com/photos/30938726/pexels-photo-30938726.jpeg"
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover"
        />

        <div className="flex flex-col items-start">
          <span className="font-medium">Sai Ram</span>
          <span className="text-xs text-muted-foreground">
            Content Creator
          </span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;