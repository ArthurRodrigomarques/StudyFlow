import { ReactNode } from "react";
import { AppSidebar } from "@/components/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}