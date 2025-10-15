import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, TrendingUp, Target } from "lucide-react";

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

type SubjectsStatsProps = {
  subjects: Subject[];
};

const sumDurations = (subjects: Subject[]): string => {
  const totalMinutes = subjects.reduce((acc, subject) => {
    const timeParts = subject.totalTime.match(/(\d+)h|(\d+)m/g) || [];
    let minutes = 0;
    timeParts.forEach((part) => {
      if (part.includes("h")) {
        minutes += parseInt(part) * 60;
      } else if (part.includes("m")) {
        minutes += parseInt(part);
      }
    });
    return acc + minutes;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export function SubjectsStats({ subjects }: SubjectsStatsProps) {
  const totalSubjects = subjects.length;
  const totalStudyTime = sumDurations(subjects);
  const totalSessions = subjects.reduce((acc, sub) => acc + sub.sessions, 0);
  const averageProgress =
    totalSubjects > 0
      ? Math.round(
          subjects.reduce((acc, sub) => acc + sub.progress, 0) / totalSubjects
        )
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Matérias</p>
              <p className="text-2xl font-bold text-primary">{totalSubjects}</p>
            </div>
            <BookOpen className="w-8 h-8 text-primary/30" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tempo Total</p>
              <p className="text-2xl font-bold text-green-500">
                {totalStudyTime}
              </p>
            </div>
            <Clock className="w-8 h-8 text-green-500/30" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Progresso Médio</p>
              <p className="text-2xl font-bold text-orange-500">
                {averageProgress}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500/30" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sessões</p>
              <p className="text-2xl font-bold text-purple-500">
                {totalSessions}
              </p>
            </div>
            <Target className="w-8 h-8 text-purple-500/30" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
