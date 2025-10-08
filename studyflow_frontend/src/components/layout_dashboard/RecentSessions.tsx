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
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, BookOpen, AlertCircle } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

type Session = {
  id: string;
  subject: string;
  duration: string;
  date: string;
  notes: string | null;
};

//  Funções de formatação de dados
function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${
    remainingMinutes > 0 ? `${remainingMinutes}m` : ""
  }`.trim();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Hoje";
  if (date.toDateString() === yesterday.toDateString()) return "Ontem";

  const diffDays = Math.ceil(
    Math.abs(today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  return `${diffDays} dias atrás`;
}

export default function RecentSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get("/sessions");
        const formattedSessions = response.data.map((session: any) => ({
          id: session.id,
          subject: session.subject.name,
          duration: formatDuration(session.duration),
          date: formatDate(session.date),
          notes: session.notes,
        }));
        setSessions(formattedSessions);
      } catch (err) {
        setError("Não foi possível carregar as sessões recentes.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (isLoading) {
    return <RecentSessionsSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sessões Recentes</CardTitle>
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardHeader>
      </Card>
    );
  }

  if (sessions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-500" />
            Sessões Recentes
          </CardTitle>
          <CardDescription>
            Você ainda não registrou nenhuma sessão de estudo.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-500" />
              Sessões Recentes
            </CardTitle>
            <CardDescription>Suas últimas sessões de estudo</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/sessions">Ver Todas</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between p-4 rounded-lg bg-card-foreground/5 border"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">{s.subject}</p>
                  <p className="text-sm text-muted-foreground">{s.notes}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{s.duration}</p>
                <p className="text-sm text-muted-foreground">{s.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RecentSessionsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-500" />
          Sessões Recentes
        </CardTitle>
        <CardDescription>Carregando suas últimas sessões...</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="space-y-2 items-end flex flex-col">
            <Skeleton className="h-4 w-[50px]" />
            <Skeleton className="h-4 w-[70px]" />
          </div>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="space-y-2 items-end flex flex-col">
            <Skeleton className="h-4 w-[50px]" />
            <Skeleton className="h-4 w-[70px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
