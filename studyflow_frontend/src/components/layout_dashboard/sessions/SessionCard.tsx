import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  MoreVertical,
  Edit,
  Trash2,
  Clock,
  Calendar,
} from "lucide-react";

type Session = {
  id: string;
  notes: string | null;
  duration: string; 
  date: string;
  subject: {
    name: string;
    color: string;
  };
};

export function SessionCard({ session }: { session: Session }) {
  return (
    <Card className="cursor-pointer hover:bg-zinc-800">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mt-1"
              style={{ backgroundColor: `${session.subject.color}1A` }}
            >
              <BookOpen
                className="w-6 h-6"
                style={{ color: session.subject.color }}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-lg">
                  {session.subject.name}
                </CardTitle>
                <Badge
                  variant="outline"
                  style={{
                    borderColor: session.subject.color,
                    color: session.subject.color,
                  }}
                >
                  {session.subject.name}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {session.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {session.date}
                </span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
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
      {session.notes && (
        <CardContent>
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {session.notes}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
