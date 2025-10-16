"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Timer, Save } from "lucide-react";
import { TimerCard } from "@/components/layout_dashboard/sessions/TimerCard";

type Subject = {
  id: string;
  name: string;
  color: string;
};

export default function NewSessionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState(
    searchParams.get("materia") || ""
  );
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    api.get("/subjects").then((response) => setSubjects(response.data));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isPaused) {
      interval = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const handleStart = () => {
    if (!selectedSubject) {
      toast.error("Selecione uma matéria para iniciar.");
      return;
    }
    setIsRunning(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    toast.info("Cronômetro parado.", {
      description: "Preencha os detalhes e salve a sessão.",
    });
  };

  const handleSave = async () => {
    if (!selectedSubject) {
      toast.error("Erro: Matéria não selecionada.");
      return;
    }
    if (elapsedTime < 60) {
      toast.error("Erro: Sessão muito curta.", {
        description: "A sessão deve ter pelo menos 1 minuto.",
      });
      return;
    }

    try {
      await api.post("/sessions", {
        subjectId: selectedSubject,
        duration: Math.floor(elapsedTime / 60),
        title,
        notes,
        rating,
      });
      toast.success("Sessão salva com sucesso!");
      router.push("/sessoes");
    } catch (error) {
      toast.error("Erro ao salvar a sessão.");
    }
  };

  const subjectData = subjects.find((s) => s.id === selectedSubject);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <header>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hover:bg-blue-700"
            >
              <Link href="/sessions">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Timer className="w-6 h-6 text-blue-500" />
                Nova Sessão de Estudo
              </h1>
              <p className="text-muted-foreground">
                Registre seu tempo de estudo
              </p>
            </div>
          </div>
        </div>
      </header>

      <TimerCard
        elapsedTime={elapsedTime}
        isRunning={isRunning}
        isPaused={isPaused}
        selectedSubject={subjectData}
        onStart={handleStart}
        onPause={() => setIsPaused(!isPaused)}
        onStop={handleStop}
      />

      <Card className="bg-card border-border/10">
        <CardHeader>
          <CardTitle>Detalhes da Sessão</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject">Matéria *</Label>
            <Select
              value={selectedSubject}
              onValueChange={setSelectedSubject}
              disabled={isRunning}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma matéria" />
              </SelectTrigger>
              <SelectContent className="z-50 border-slate-800 bg-zinc-950/90 backdrop-blur-lg">
                {subjects.map((subject) => (
                  <SelectItem
                    key={subject.id}
                    value={subject.id}
                    className="cursor-pointer focus:bg-blue-600 focus:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: subject.color }}
                      />
                      {subject.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Título da Sessão (Opcional)</Label>
            <Input
              id="title"
              placeholder="Ex: Revisão de Derivadas"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Anotações</Label>
            <Textarea
              id="notes"
              placeholder="O que você estudou? Quais tópicos cobriu?"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Avaliação da Sessão</Label>
            <div className="flex gap-2 text-3xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <span
                    className={
                      star <= rating
                        ? "text-yellow-400"
                        : "text-muted-foreground/50"
                    }
                  >
                    {star <= rating ? "★" : "☆"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button variant="outline" asChild className="hover:bg-blue-700">
          <Link href="/sessions">Cancelar</Link>
        </Button>
        <Button
          onClick={handleSave}
          disabled={isRunning || elapsedTime < 60}
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" /> Salvar Sessão
        </Button>
      </div>
    </div>
  );
}
