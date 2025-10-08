import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layout_dashboard/header";
import QuickStats from "@/components/layout_dashboard/QuickStats";
import WeeklyGoalRing from "@/components/layout_dashboard/WeeklyGoalRing";
import SubjectsProgress from "@/components/layout_dashboard/SubjectsProgress";
import RecentSessions from "@/components/layout_dashboard/RecentSessions";
import QuickActions from "@/components/layout_dashboard/QuickActions";

const weeklyProgress = 78;
const monthlyGoals = { completed: 5, total: 7 };
const totalStudyTime = "24h 30m";
const todayStudyTime = "3h 15m";
const subjectsData = [
  { name: "Matemática", progress: 85, time: "8h 45m", color: "#3b82f6" },
  { name: "Física", progress: 62, time: "6h 20m", color: "#8b5cf6" },
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex items-start justify-center bg-transparent">
        <main className="w-full max-w-4xl p-6 space-y-6 overflow-auto rounded-xl shadow">
          <Header />

          <QuickStats
            weeklyProgress={weeklyProgress}
            monthlyGoals={monthlyGoals}
            totalStudyTime={totalStudyTime}
            todayStudyTime={todayStudyTime}
          />

          <div className="grid lg:grid-cols-3 gap-6">
            <WeeklyGoalRing weeklyProgress={weeklyProgress} />
            <SubjectsProgress subjects={subjectsData} />
          </div>

          <RecentSessions />

          <QuickActions />
        </main>
      </div>
    </SidebarProvider>
  );
}
