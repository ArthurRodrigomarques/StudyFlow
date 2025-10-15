"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Plus } from "lucide-react";
import { SubjectCard } from "./SubjectCard";
import { SubjectsStats } from "./SubjectsStats";

type Subject = {
  id: string;
  name: string;
  description: string;
  progress: number;
  totalTime: string;
  weeklyTime: string;
  sessions: number;
  color: string;
  lastStudied: string;
};

const formatDuration = (minutes: number): string => {
  if (!minutes) return "0m";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0)
    return `${hours}h ${
      remainingMinutes > 0 ? `${remainingMinutes}m` : ""
    }`.trim();
  return `${remainingMinutes}m`;
};

const formatDate = (dateString: string | null): string => {
  if (!dateString) return "Nunca";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await api.get("/subjects");
        const formattedSubjects = response.data.map((sub: any) => ({
          id: sub.id,
          name: sub.name,
          description: `Álgebra, Geometria e Cálculo`,
          progress: Math.floor(Math.random() * 100), 
          totalTime: formatDuration(sub.totalStudyTime),
          weeklyTime: formatDuration(sub.weeklyTime),
          sessions: sub.sessionsCount,
          color: sub.color || "#3b82f6",
          lastStudied: formatDate(sub.lastStudied),
        }));
        setSubjects(formattedSubjects);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="w-full space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Minhas Matérias
          </h1>
          <p className="text-muted-foreground">
            Gerencie suas disciplinas e acompanhe o progresso
          </p>
        </div>
        <Button asChild>
          <Link href="/materias/nova">
            <Plus className="w-4 h-4 mr-2" />
            Nova Matéria
          </Link>
        </Button>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : (
        <SubjectsStats subjects={subjects} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full" />
            ))
          : subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
      </div>
    </div>
  );
}
