import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layout_dashboard/header";
import QuickStats from "@/components/layout_dashboard/QuickStats";
import WeeklyGoalRing from "@/components/layout_dashboard/WeeklyGoalRing";
import SubjectsProgress from "@/components/layout_dashboard/SubjectsProgress";
import RecentSessions from "@/components/layout_dashboard/RecentSessions";
import QuickActions from "@/components/layout_dashboard/QuickActions";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex items-start justify-center bg-transparent">
        <main className="w-full max-w-4xl p-6 space-y-6 overflow-auto rounded-xl shadow">
          <Header />
          
          <QuickStats />
          
          <div className="grid lg:grid-cols-3 gap-6">
            <WeeklyGoalRing />
            <SubjectsProgress />
          </div>

          <RecentSessions />
          <QuickActions />
        </main>
      </div>
    </SidebarProvider>
  );
}