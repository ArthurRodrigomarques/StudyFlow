"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { login } from "@/lib/api";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { session } = await login(email, password);
      if (!session) {
        throw new Error("Login falhou, sessão não retornada.");
      }
      await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.error || "Ocorreu um erro ao fazer login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className={cn("flex w-full flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Acesse sua conta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Insira seu email abaixo para acessar sua conta
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <Link href="#" className="ml-auto inline-block text-sm underline">
              Esqueceu sua senha?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro de Autenticação</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
        <Button variant="outline" type="button" disabled={isLoading}>
          Entrar com GitHub
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Não tem uma conta?{" "}
        <Link href="/signup" className="underline">
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
