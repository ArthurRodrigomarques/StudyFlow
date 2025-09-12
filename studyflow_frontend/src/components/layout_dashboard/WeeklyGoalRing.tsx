// src/components/dashboard/WeeklyGoalRing.tsx
"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
// import { ProgressRing } from "@/components/ui/progress-ring";
import { Award } from "lucide-react";

type Props = { weeklyProgress: number };

export default function WeeklyGoalRing({ weeklyProgress }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Award className="w-5 h-5 text-blue-500" />
          Meta Semanal
        </CardTitle>
        <CardDescription className="text-gray-400">
          Progresso da sua meta de 20 horas semanais
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {/* <ProgressRing value={weeklyProgress} size={140}> */}
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-500">
            {weeklyProgress}%
          </div>
          <div className="text-sm text-gray-400">15.6h / 20h</div>
        </div>
        {/* </ProgressRing> */}
      </CardContent>
    </Card>
  );
}
