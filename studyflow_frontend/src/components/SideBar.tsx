"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BookOpen,
  Target,
  Clock,
  Settings,
  User,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Matérias", url: "/subjects", icon: BookOpen },
  { title: "Metas", url: "/goals", icon: Target },
  { title: "Sessões", url: "/sessions", icon: Clock },
];

const settingsItems = [
  { title: "Configurações", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-[#0D1117] border-r border-[#1B1F28] flex flex-col h-full">
        <div className="p-4 border-b border-[#1B1F28]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A2342] to-[#1B2A47] flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0A2342] to-[#1B2A47]">
                  StudyFlow
                </h2>
                <p className="text-xs text-gray-400">Organize seus estudos</p>
              </div>
            )}
          </div>
        </div>

        {!isCollapsed && (
          <div className="p-4 border-b border-[#1B1F28]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#003366] to-[#004080] flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-200 truncate">
                  Arthur Marques
                </p>
                <p className="text-xs text-gray-400 truncate">Estudante</p>
              </div>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 uppercase text-xs tracking-wide">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-gray-300 transition-all duration-200 cursor-pointer
                        ${
                          isActive(item.url)
                            ? "bg-[#003366] text-white font-medium shadow-lg"
                            : "hover:bg-[#004080]/30 hover:text-white"
                        }
                      `}
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 uppercase text-xs tracking-wide">
            Configurações
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-gray-300 transition-all duration-200 cursor-pointer
                        ${
                          isActive(item.url)
                            ? "bg-[#003366] text-white font-medium shadow-lg"
                            : "hover:bg-[#004080]/30 hover:text-white"
                        }
                      `}
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-[#1B1F28]">
          {!isCollapsed ? (
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start transition-all duration-200 cursor-pointer hover:bg-[#003366] hover:text-white"
                asChild
              >
                <Link href="/upgrade" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Upgrade Pro
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-500 hover:bg-red-500/10 transition-all duration-200"
                asChild
              >
                <Link href="/login" className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Sair
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full p-2 transition-all duration-200 cursor-pointer hover:bg-[#003366] hover:text-white"
                asChild
              >
                <Link href="/upgrade">
                  <Sparkles className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full p-2 text-red-500 hover:bg-red-500/10 transition-all duration-200"
                asChild
              >
                <Link href="/login">
                  <LogOut className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
