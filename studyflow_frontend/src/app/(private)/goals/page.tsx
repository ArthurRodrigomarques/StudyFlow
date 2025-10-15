"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Target,
  Plus,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { GoalCard } from "@/components/layout_dashboard/goals/GoalCard";

type Goal = {
  id: string;
  title: string;
  description: string;
  progress: number;
  completed: boolean;
  createdAt: string;
  status: "active" | "completed" | "behind";
};

function GoalsStats({ goals }: { goals: Goal[] }) {
  const activeGoals = goals.filter((g) => g.status === "active").length;
  const completedGoals = goals.filter((g) => g.status === "completed").length;
  const behindGoals = goals.filter((g) => g.status === "behind").length;
  const successRate =
    goals.length > 0 ? Math.round((completedGoals / goals.length) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Metas Ativas</p>
          <p className="text-2xl font-bold">{activeGoals}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Concluídas</p>
          <p className="text-2xl font-bold text-green-500">{completedGoals}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Atrasadas</p>
          <p className="text-2xl font-bold text-red-500">{behindGoals}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
          <p className="text-2xl font-bold">{successRate}%</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await api.get("/goals");
        setGoals(response.data);
      } catch (error) {
        console.error("Failed to fetch goals:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGoals();
  }, []);

  return (
    <div className="w-full space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Minhas Metas
          </h1>
          <p className="text-muted-foreground">
            Defina objetivos e acompanhe seu progresso
          </p>
        </div>
        <Button asChild>
          <Link href="/metas/nova">
            <Plus className="w-4 h-4 mr-2" />
            Nova Meta
          </Link>
        </Button>
      </header>

      {isLoading ? (
        <Skeleton className="h-24 w-full" />
      ) : (
        <GoalsStats goals={goals} />
      )}

      <div className="space-y-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))
        ) : goals.length > 0 ? (
          goals.map((goal) => <GoalCard key={goal.id} goal={goal} />)
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Target className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <CardTitle className="mb-2">Nenhuma meta definida</CardTitle>
              <CardDescription className="mb-6">
                Defina suas primeiras metas para manter o foco.
              </CardDescription>
              <Button asChild>
                <Link href="/metas/nova">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeira Meta
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
