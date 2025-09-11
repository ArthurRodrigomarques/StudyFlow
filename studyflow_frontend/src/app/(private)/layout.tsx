import { ReactNode } from "react"
import { AppSidebar } from "@/components/SideBar"
import { SidebarProvider } from "@/components/ui/sidebar" // importa o provider do shadcn

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}
