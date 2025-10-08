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
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type Subject = {
  id: string;
  name: string;
  color: string | null;
  progress: number;
  time: string;
};

export default function SubjectsProgress() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await api.get("/subjects");
        const subjectsWithFakeProgress = response.data.map((sub: any) => ({
          ...sub,
          progress: Math.floor(Math.random() * (90 - 40 + 1)) + 40,
          time: `${Math.floor(Math.random() * 10)}h ${Math.floor(
            Math.random() * 59
          )}m`,
        }));
        setSubjects(subjectsWithFakeProgress);
      } catch (err) {
        setError("Não foi possível carregar as matérias.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  if (isLoading) {
    return <SubjectsProgressSkeleton />;
  }

  if (error) {
    return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Progresso por Matéria</CardTitle>
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardHeader>
      </Card>
    );
  }

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
        {subjects.length > 0 ? (
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
