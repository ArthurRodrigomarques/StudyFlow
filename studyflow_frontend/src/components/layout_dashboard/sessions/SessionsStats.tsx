import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, BookOpen, Play } from "lucide-react";

type Session = {
  duration: number;
};

const formatDuration = (minutes: number): string => {
  if (!minutes) return "0m";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0) return `${hours}h ${remainingMinutes > 0 ? `${remainingMinutes}m` : ''}`.trim();
  return `${remainingMinutes}m`;
};

export function SessionsStats({ sessions }: { sessions: Session[] }) {
  const totalSessions = sessions.length;
  const totalTimeMinutes = sessions.reduce((acc, s) => acc + s.duration, 0);
  const averageDuration = totalSessions > 0 ? Math.round(totalTimeMinutes / totalSessions) : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total de Sessões</p><p className="text-2xl font-bold">{totalSessions}</p></CardContent></Card>
      <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Tempo Total</p><p className="text-2xl font-bold text-green-500">{formatDuration(totalTimeMinutes)}</p></CardContent></Card>
      <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Duração Média</p><p className="text-2xl font-bold text-orange-500">{formatDuration(averageDuration)}</p></CardContent></Card>
      <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Em Andamento</p><p className="text-2xl font-bold text-blue-500">0</p></CardContent></Card>
    </div>
  );
}