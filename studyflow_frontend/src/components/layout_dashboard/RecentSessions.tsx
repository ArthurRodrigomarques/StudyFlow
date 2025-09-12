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
import { Calendar, BookOpen } from "lucide-react";
import Link from "next/link";

type Session = {
  subject: string;
  duration: string;
  date: string;
  notes: string;
};

export default function RecentSessions({ sessions }: { sessions: Session[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <Calendar className="w-5 h-5 text-green-500" />
              Sessões Recentes
            </CardTitle>
            <CardDescription className="text-gray-400">
              Suas últimas sessões de estudo
            </CardDescription>
          </div>

          <Button
            className="hover:bg-blue-500"
            variant="outline"
            size="sm"
            asChild
          >
            <Link href="/sessions">Ver Todas</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {sessions.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-800/40 border border-gray-700/30"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-white">{s.subject}</p>
                  <p className="text-sm text-gray-400">{s.notes}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-white">{s.duration}</p>
                <p className="text-sm text-gray-400">{s.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
