"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, Pause, Square, BookOpen } from "lucide-react";

type TimerCardProps = {
  elapsedTime: number;
  isRunning: boolean;
  isPaused: boolean;
  selectedSubject?: { name: string; color: string };
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
};

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export function TimerCard({
  elapsedTime,
  isRunning,
  isPaused,
  selectedSubject,
  onStart,
  onPause,
  onStop,
}: TimerCardProps) {
  const timerColor = isRunning
    ? selectedSubject?.color || "hsl(var(--primary))"
    : "hsl(var(--muted-foreground))";

  return (
    <Card className="bg-card border-border/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Cronômetro
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6 py-8">
        <div
          className="text-7xl font-mono font-bold"
          style={{ color: timerColor }}
        >
          {formatTime(elapsedTime)}
        </div>

        {selectedSubject && isRunning && (
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${selectedSubject.color}1A` }}
            >
              <BookOpen
                className="w-4 h-4"
                style={{ color: selectedSubject.color }}
              />
            </div>
            <span className="font-medium">{selectedSubject.name}</span>
          </div>
        )}

        <div className="flex gap-3">
          {!isRunning ? (
            <Button
              size="lg"
              onClick={onStart}
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Play className="w-5 h-5 mr-2" />
              Iniciar
            </Button>
          ) : (
            <>
              <Button
                size="lg"
                variant="outline"
                onClick={onPause}
                className="hover:bg-white/5 hover:text-white transition-colors"
              >
                {isPaused ? (
                  <>
                    <Play className="w-5 h-5 mr-2" /> Retomar
                  </>
                ) : (
                  <>
                    <Pause className="w-5 h-5 mr-2" /> Pausar
                  </>
                )}
              </Button>
              <Button size="lg" variant="destructive" onClick={onStop}>
                <Square className="w-5 h-5 mr-2" />
                Parar
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
