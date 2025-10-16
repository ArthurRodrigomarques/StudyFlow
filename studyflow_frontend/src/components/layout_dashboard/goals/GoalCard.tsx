import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Target,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type Goal = {
  id: string;
  title: string;
  description: string;
  progress: number;
  completed: boolean;
  createdAt: string;
  status: "active" | "completed" | "behind";
};

const getStatusProps = (status: Goal["status"]) => {
  switch (status) {
    case "completed":
      return {
        text: "Concluída",
        icon: <CheckCircle2 className="w-4 h-4" />,
        className: "bg-green-500/10 text-green-500 border-green-500/20",
      };
    case "behind":
      return {
        text: "Atrasada",
        icon: <AlertCircle className="w-4 h-4" />,
        className: "bg-red-500/10 text-red-500 border-red-500/20",
      };
    default:
      return {
        text: "Em andamento",
        icon: <Target className="w-4 h-4" />,
        className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      };
  }
};

export function GoalCard({ goal }: { goal: Goal }) {
  const statusProps = getStatusProps(goal.status);

  return (
    <Card className="hover:border-primary/50 transition-colors group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-3">
              <CardTitle>{goal.title}</CardTitle>
              <Badge className={statusProps.className}>
                {statusProps.icon}
                <span className="ml-1">{statusProps.text}</span>
              </Badge>
            </div>
            <CardDescription>
              {goal.description || "Sem descrição"}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" /> Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-semibold text-primary">
              {goal.progress}% concluído
            </span>
          </div>
          <Progress value={goal.progress} />
        </div>
        <div className="flex gap-2 pt-2">
          <Button asChild size="sm" className="flex-1 cursor-pointer bg-blue-600">
            <Link href={`/metas/${goal.id}`}>Ver Detalhes</Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 cursor-pointer hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-1" /> Atualizar Progresso
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
