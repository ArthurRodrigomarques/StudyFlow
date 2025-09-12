"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Clock, Activity } from "lucide-react";

type Props = {
  weeklyProgress: number;
  monthlyGoals: { completed: number; total: number };
  totalStudyTime: string;
  todayStudyTime: string;
};

export default function QuickStats({
  weeklyProgress,
  monthlyGoals,
  totalStudyTime,
  todayStudyTime,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Progresso Semanal
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-500">
            {weeklyProgress}%
          </div>
          <div className="mt-2">
            <Progress value={weeklyProgress} className="h-2 bg-gray-700/40" />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            +12% desde a semana passada
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Metas do Mês
          </CardTitle>
          <Target className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-500">
            {monthlyGoals.completed}/{monthlyGoals.total}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {Math.round((monthlyGoals.completed / monthlyGoals.total) * 100)}%
            concluídas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Tempo Total
          </CardTitle>
          <Clock className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            {totalStudyTime}
          </div>
          <p className="text-xs text-gray-400 mt-2">Este mês</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-white">Hoje</CardTitle>
          <Activity className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-500">
            {todayStudyTime}
          </div>
          <p className="text-xs text-gray-400 mt-2">Tempo estudado hoje</p>
        </CardContent>
      </Card>
    </div>
  );
}
