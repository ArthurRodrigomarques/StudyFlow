import Header from "@/components/layout_dashboard/header";
import QuickStats from "@/components/layout_dashboard/QuickStats";
import WeeklyGoalRing from "@/components/layout_dashboard/WeeklyGoalRing";
import SubjectsProgress from "@/components/layout_dashboard/SubjectsProgress";
import RecentSessions from "@/components/layout_dashboard/RecentSessions";
import QuickActions from "@/components/layout_dashboard/QuickActions";

export default function Dashboard() {
  return (
    <div className="w-full space-y-6">
      <Header />

      <QuickStats />

      <div className="grid lg:grid-cols-3 gap-6">
        <WeeklyGoalRing />
        <SubjectsProgress />
      </div>

      <RecentSessions />
      <QuickActions />
    </div>
  );
}
