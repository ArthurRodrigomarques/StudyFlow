import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, MoreVertical, Edit, Trash2, Plus } from "lucide-react";

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

type SubjectCardProps = {
  subject: Subject;
};

export function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Card className="flex flex-col h-full bg-card border border-border/20 hover:border-blue-500/50 transition-colors group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${subject.color}1A` }}
            >
              <BookOpen className="w-6 h-6" style={{ color: subject.color }} />
            </div>
            <div>
              <CardTitle className="text-lg">{subject.name}</CardTitle>
              <CardDescription className="text-sm">
                {subject.description}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/materias/${subject.id}/editar`}>
                  <Edit className="w-4 h-4 mr-2" /> Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash2 className="w-4 h-4 mr-2" /> Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-semibold" style={{ color: subject.color }}>
              {subject.progress}%
            </span>
          </div>
          <Progress
            value={subject.progress}
            className="h-2"
            style={{ "--primary": subject.color } as React.CSSProperties}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <p className="text-muted-foreground">Tempo total</p>
            <p className="font-semibold">{subject.totalTime}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Esta semana</p>
            <p className="font-semibold">{subject.weeklyTime}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Sessões</p>
            <p className="font-semibold">{subject.sessions}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Último estudo</p>
            <p className="font-semibold">{subject.lastStudied}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4">
        <Button
          asChild
          size="sm"
          className="flex-1 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <Link href={`/materias/${subject.id}`}>Ver Detalhes</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex-1 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
        >
          <Link href={`/sessoes/nova?materia=${subject.id}`}>
            <Plus className="w-4 h-4 mr-1" /> Estudar
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
