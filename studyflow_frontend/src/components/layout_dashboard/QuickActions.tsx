"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Target, BookOpen } from "lucide-react";
import Link from "next/link";

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-white">Ações Rápidas</CardTitle>
        <CardDescription className="text-gray-400">
          Comece uma nova atividade de estudo
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <Button asChild className="h-auto p-4 flex-col space-y-2 hover:bg-blue-500">
            <Link href="/sessions/new" className="flex flex-col items-center">
              <Clock className="w-6 h-6 text-blue-900" />
              <span className="text-white">Iniciar Sessão</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="h-auto p-4 flex-col space-y-2 hover:bg-blue-500"
          >
            <Link href="/goals/new" className="flex flex-col items-center">
              <Target className="w-6 h-6 text-purple-500" />
              <span className="text-white">Nova Meta</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="h-auto p-4 flex-col space-y-2 hover:bg-blue-500"
          >
            <Link href="/subjects/new" className="flex flex-col items-center">
              <BookOpen className="w-6 h-6 text-purple-500" />
              <span className="text-white">Adicionar Matéria</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
