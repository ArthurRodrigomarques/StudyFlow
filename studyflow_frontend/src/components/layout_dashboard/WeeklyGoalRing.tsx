"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Award, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";

const WEEKLY_STUDY_GOAL_HOURS = 20;

const formatMinutesToHours = (minutes: number) => {
  return (minutes / 60).toFixed(1);
};

export default function WeeklyGoalRing() {
  const [minutesStudied, setMinutesStudied] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/stats");
        setMinutesStudied(response.data.weeklyProgress || 0);
      } catch (err) {
        setError("Não foi possível carregar a meta semanal.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return <WeeklyGoalRingSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Meta Semanal</CardTitle>
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardHeader>
      </Card>
    );
  }

  const goalMinutes = WEEKLY_STUDY_GOAL_HOURS * 60;
  const weeklyProgressPercentage =
    goalMinutes > 0
      ? Math.min(Math.round((minutesStudied / goalMinutes) * 100), 100)
      : 0;

  const hoursStudied = formatMinutesToHours(minutesStudied);
  const goalHours = formatMinutesToHours(goalMinutes);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-500" />
          Meta Semanal
        </CardTitle>
        <CardDescription>
          Progresso da sua meta de {goalHours} horas semanais
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-500">
            {weeklyProgressPercentage}%
          </div>
          <div className="text-sm text-muted-foreground">
            {hoursStudied}h / {goalHours}h
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function WeeklyGoalRingSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/5" />
        <Skeleton className="h-4 w-4/5 mt-2" />
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="h-9 w-20 mx-auto" />
          <Skeleton className="h-4 w-24 mx-auto mt-2" />
        </div>
      </CardContent>
    </Card>
  );
}
