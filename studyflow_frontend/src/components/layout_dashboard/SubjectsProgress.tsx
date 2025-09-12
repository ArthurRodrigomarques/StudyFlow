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
import { BookOpen } from "lucide-react";
import Link from "next/link";

type Subject = { name: string; progress: number; time: string; color: string };

export default function SubjectsProgress({
  subjects,
}: {
  subjects: Subject[];
}) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <BookOpen className="w-5 h-5 text-purple-500" />
              Progresso por Matéria
            </CardTitle>
            <CardDescription className="text-gray-400">
              Tempo de estudo por disciplina este mês
            </CardDescription>
          </div>

          <Button
            className="hover:bg-blue-500"
            variant="outline"
            size="sm"
            asChild
          >
            <Link href="/subjects">Ver Todas</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {subjects.map((subject, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-white">{subject.name}</span>
              <span className="text-sm text-gray-400">{subject.time}</span>
            </div>

            <div className="w-full bg-gray-700/30 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${subject.progress}%`,
                  backgroundColor: subject.color,
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
