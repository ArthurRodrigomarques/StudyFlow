"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, AlertCircle } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

type Subject = {
  id: string;
  name: string;
  color: string | null;
  progress: number;
  time: string;
};

// Função para formatar minutos em "Xh Ym"
const formatDuration = (minutes: number): string => {
  if (!minutes) return "0m";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${
      remainingMinutes > 0 ? `${remainingMinutes}m` : ""
    }`.trim();
  }
  return `${remainingMinutes}m`;
};

export default function SubjectsProgress() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await api.get("/subjects");
        // Agora usamos os dados reais que vêm do backend
        const formattedSubjects = response.data.map((sub: any) => ({
          id: sub.id,
          name: sub.name,
          color: sub.color,
          time: formatDuration(sub.totalStudyTime), // Usando o tempo real
          // O progresso ainda é um placeholder até definirmos metas por matéria
          progress: Math.floor(Math.random() * (90 - 40 + 1)) + 40,
        }));
        setSubjects(formattedSubjects);
      } catch (err) {
        setError("Não foi possível carregar as matérias.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  // ... o resto do seu componente (isLoading, error, JSX) continua igual ...
  // (O código que já está no seu arquivo está correto)

  // O JSX para exibir a lista:
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-500" />
              Progresso por Matéria
            </CardTitle>
            <CardDescription>Seu andamento nos estudos</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/subjects">Ver Todas</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <SubjectsProgressSkeleton />
        ) : error ? (
          <p className="text-destructive text-sm">{error}</p>
        ) : subjects.length > 0 ? (
          subjects.map((subject) => (
            <div key={subject.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{subject.name}</span>
                <span className="text-sm text-muted-foreground">
                  {subject.time}
                </span>
              </div>
              <Progress
                value={subject.progress}
                style={{ accentColor: subject.color || "#3b82f6" }}
              />
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhuma matéria cadastrada ainda.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
function SubjectsProgressSkeleton() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-500" />
          Progresso por Matéria
        </CardTitle>
        <CardDescription>Carregando o andamento...</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pt-1">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
