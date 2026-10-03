import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
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
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";


const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    link: "/dashboard"
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
  const location = useLocation();

  return (
    <Sidebar side="left" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border/70 p-1">
        <div className="flex items-center gap-3 rounded-xl p-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lime-200 via-emerald-200 to-teal-300 shadow-sm ring-1 ring-emerald-900/5 group-data-[collapsible=icon]:size-8">
            <img
              src={Logo}
              alt="Social Scheduler"
              className="size-8 object-contain group-data-[collapsible=icon]:size-6"
            />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <h2 className="truncate text-sm font-bold tracking-tight text-sidebar-foreground">
              Social Scheduler
            </h2>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Your content workspace
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-5">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/80 group-data-[collapsible=icon]:hidden">
            Workspace
          </SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {menuItems.map((item) => {
              const isActive =
                location.pathname === item.link ||
                location.pathname.startsWith(`${item.link}/`);

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigator(item.link)}
                    isActive={isActive}
                    tooltip={item.title}
                    className="h-11 rounded-xl px-3 text-sidebar-foreground/75 transition-colors hover:bg-emerald-50 hover:text-emerald-900 data-active:bg-emerald-100/80 data-active:font-semibold data-active:text-emerald-950 data-active:shadow-sm [&_svg]:text-current"
                  >
                    <item.icon className="size-[18px]" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/70 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-14 rounded-xl border border-sidebar-border/70 bg-background/50 px-2 hover:bg-sidebar-accent">
              <span className="relative shrink-0">
                <img
                  src="https://images.pexels.com/photos/30938726/pexels-photo-30938726.jpeg"
                  alt="Profile"
                  className="size-9 rounded-full object-cover ring-2 ring-background group-data-[collapsible=icon]:size-4"
                />
                <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background group-data-[collapsible=icon]:hidden" />
              </span>
              <div className="flex min-w-0 flex-col items-start group-data-[collapsible=icon]:hidden">
                <span className="truncate text-sm font-semibold text-sidebar-foreground">
                  Sai Ram
                </span>
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