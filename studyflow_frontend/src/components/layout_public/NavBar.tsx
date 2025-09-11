import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/20 backdrop-blur-md bg-[#0f1115]/90">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">StudyFlow</h1>
        </div>
        {/* <ThemeToggle /> */}
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button
              variant="outline"
              className="border-transparent text-white hover:bg-[#3b82f6]/10 hover:text-[#3b82f6] transition duration-200"
            >
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button
              variant="default"
              className="bg-[#3b82f6] hover:bg-[#60a5fa] text-white transition duration-200"
            >
              Registrar
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
