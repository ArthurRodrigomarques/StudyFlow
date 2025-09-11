import { BarChart3, BookOpen, Clock, Target, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function Content() {
  return (
    <div>
        <section className="text-center py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Organize seus estudos,{" "}
          <span className="text-[#3b82f6]">conquiste suas metas</span>
        </h2>
        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
          Plataforma completa para estudantes que querem maximizar seu
          aprendizado com organização, metas claras e acompanhamento de
          progresso.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/register">
            <Button
              size="lg"
              className="flex items-center justify-center gap-2 bg-[#3b82f6] hover:bg-[#60a5fa] text-white transition duration-200"
            >
              <Zap className="w-5 h-5" />
              Começar Gratuitamente
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              size="lg"
              variant="outline"
              className="flex items-center justify-center gap-2 text-white border-white/20 hover:border-[#3b82f6] hover:text-[#3b82f6] transition duration-200"
            >
              <BarChart3 className="w-5 h-5" />
              Ver Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-center">
          Funcionalidades Principais
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-[#3b82f6]/10 flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-[#3b82f6]" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Metas Inteligentes</h4>
            <p className="text-gray-400 text-sm">
              Defina objetivos semanais e mensais com acompanhamento visual do
              seu progresso
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-[#8b5cf6]/10 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-[#8b5cf6]" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Sessões de Estudo</h4>
            <p className="text-gray-400 text-sm">
              Registre e organize suas sessões por matéria com controle de tempo
              e notas
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Relatórios Visuais</h4>
            <p className="text-gray-400 text-sm">
              Gráficos e estatísticas detalhadas do seu desempenho e evolução
            </p>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-white">
              Dashboard Intuitivo
            </h3>
            <p className="text-lg text-gray-400">
              Interface limpa e moderna, pensada para não distrair seus estudos
            </p>
          </div>

          <div className="bg-[#1a1d23] rounded-xl p-6 border border-white/10 shadow-lg">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Card Progresso Semanal */}
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">
                    Progresso Semanal
                  </span>
                  <span className="text-2xl font-bold text-blue-500">78%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>

              {/* Card Metas Concluídas */}
              <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">
                    Metas Concluídas
                  </span>
                  <span className="text-2xl font-bold text-purple-400">
                    5/7
                  </span>
                </div>
                <div className="text-sm text-gray-400">Esta semana</div>
              </div>

              {/* Card Tempo Total */}
              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Tempo Total</span>
                  <span className="text-2xl font-bold text-green-500">24h</span>
                </div>
                <div className="text-sm text-gray-400">Este mês</div>
              </div>
            </div>

            {/* Botão CTA */}
            <div className="text-center">
              <Button
                asChild
                className="bg-[#3b82f6] hover:bg-[#60a5fa] text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200 hover:scale-105"
              >
                <Link href="/register">Experimente Agora</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
