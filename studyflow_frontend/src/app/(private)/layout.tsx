import { ReactNode } from "react";
import { AppSidebar } from "@/components/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex flex-1 items-center justify-center">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
