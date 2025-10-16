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
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Plus, Filter, Search } from "lucide-react";
import { SessionCard } from "@/components/layout_dashboard/sessions/SessionCard";
import { SessionsStats } from "@/components/layout_dashboard/sessions/SessionsStats";

type ApiSession = {
  id: string;
  notes: string | null;
  duration: number;
  date: string;
  subject: {
    name: string;
    color: string;
  };
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
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "Hoje";
  if (date.toDateString() === yesterday.toDateString()) return "Ontem";
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

export default function SessionsPage() {
  const [sessions, setSessions] = useState<ApiSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get("/sessions");
        setSessions(response.data);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const formattedSessionsForCards = sessions.map((s) => ({
    ...s,
    duration: formatDuration(s.duration),
    date: formatDate(s.date),
  }));

  return (
    <div className="w-full space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="w-6 h-6 text-primary" />
            Sessões de Estudo
          </h1>
          <p className="text-muted-foreground">
            Registre e acompanhe suas sessões de estudo
          </p>
        </div>
        <Button asChild className="hover:bg-blue-600">
          <Link href="/sessions/newsession">
            <Plus className="w-4 h-4 mr-2" />
            Nova Sessão
          </Link>
        </Button>
      </header> 

      {isLoading ? (
        <Skeleton className="h-24 w-full" />
      ) : (
        <SessionsStats sessions={sessions} />
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar sessões..." className="pl-10" />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))
        ) : formattedSessionsForCards.length > 0 ? (
          formattedSessionsForCards.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Clock className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <CardTitle className="mb-2">Nenhuma sessão registrada</CardTitle>
              <CardDescription className="mb-6">
                Comece registrando suas sessões para acompanhar seu progresso.
              </CardDescription>
              <Button asChild>
                <Link href="/sessoes/nova">
                  <Plus className="w-4 h-4 mr-2" />
                  Registrar Primeira Sessão
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
