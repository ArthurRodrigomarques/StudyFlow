"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Clock, Activity } from "lucide-react";
import { api } from "@/lib/api";

const WEEKLY_STUDY_GOAL_HOURS = 20;

export default function QuickStats() {
  const [stats, setStats] = useState({
    weeklyProgress: 0,
    monthlyGoals: { completed: 0, total: 0 },
    totalStudyTime: "0h 0m",
    todayStudyTime: "0h 0m",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/stats');
        setStats(response.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return <QuickStatsSkeleton />;
  }
  
  const weeklyGoalMinutes = WEEKLY_STUDY_GOAL_HOURS * 60;
  const weeklyProgressPercentage = weeklyGoalMinutes > 0
    ? Math.min(Math.round((stats.weeklyProgress / weeklyGoalMinutes) * 100), 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Progresso Semanal</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{weeklyProgressPercentage}%</div>
           <p className="text-xs text-muted-foreground">+12% desde a semana passada</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Metas do Mês</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.monthlyGoals.completed}/{stats.monthlyGoals.total}</div>
           <p className="text-xs text-muted-foreground">
            {stats.monthlyGoals.total > 0 ? Math.round((stats.monthlyGoals.completed / stats.monthlyGoals.total) * 100) : 0}% concluídas
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tempo Total</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalStudyTime}</div>
          <p className="text-xs text-muted-foreground">Desde o início</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Hoje</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.todayStudyTime}</div>
          <p className="text-xs text-muted-foreground">Tempo estudado hoje</p>
        </CardContent>
      </Card>
    </div>
  );
}

function QuickStatsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-4 rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-7 w-1/3 mb-2" />
                        <Skeleton className="h-3 w-1/2" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}