// src/components/dashboard/DashboardHeader.tsx
"use client";

import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-700/30 bg-white/5 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">Bem vindo</p>
          </div>
        </div>

        <Button className="hover:bg-blue-500" asChild>
          <Link href="/sessions/new" className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nova Sessão
          </Link>
        </Button>
      </div>
    </header>
  );
}
