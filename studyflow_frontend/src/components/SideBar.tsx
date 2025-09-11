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
      <SidebarContent className="bg-sidebar border-r border-sidebar-border">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold gradient-primary bg-clip-text text-transparent">
                  StudyFlow
                </h2>
                <p className="text-xs text-sidebar-foreground/60">
                  Organize seus estudos
                </p>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        {!isCollapsed && (
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-green-500 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Arthur Marques
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  Estudante
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors duration-200 cursor-pointer
                        ${
                          isActive(item.url)
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "hover:bg-blue-500 hover:text-white"
                        }`}
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

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60">
            Configurações
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors duration-200 cursor-pointer
                        ${
                          isActive(item.url)
                            ? "bg-blue-500 text-white font-medium"
                            : "hover:bg-blue-500 hover:text-white"
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

        {/* Bottom Actions */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          {!isCollapsed ? (
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start transition-colors duration-200 cursor-pointer hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <Link
                  className="hover:bg-blue-500 hover:text-white"
                  href="/upgrade"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Upgrade Pro
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors duration-200 cursor-pointer"
                asChild
              >
                <Link href="/login">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full p-2 transition-colors duration-200 cursor-pointer hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <Link href="/upgrade">
                  <Sparkles className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full p-2 text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors duration-200 cursor-pointer"
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
