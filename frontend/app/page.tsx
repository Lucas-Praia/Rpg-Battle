import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ⚔️ RPG Battle
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Embarque em uma aventura épica de combate em turnos!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-[#1f2937] text-[#E2E8F0] hover:bg-[#1E3A8A] hover:shadow-lg transition-colors">
              <div className="text-4xl mb-4">⚔️</div>
              <h3 className="text-lg font-semibold mb-2">Combate Estratégico</h3>
              <p className="text-sm text-gray-300">
                Use ataques básicos, especiais e cura para derrotar seus inimigos
              </p>
            </Card>

            <Card className="p-6 bg-[#1f2937] text-[#E2E8F0] hover:bg-[#1E3A8A] hover:shadow-lg transition-colors">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-lg font-semibold mb-2">Sistema de Ranking</h3>
              <p className="text-sm text-gray-300">
                Compete com outros jogadores e alcance o topo do ranking
              </p>
            </Card>

            <Card className="p-6 bg-[#1f2937] text-[#E2E8F0] hover:bg-[#1E3A8A] hover:shadow-lg transition-colors">
              <div className="text-4xl mb-4">💥</div>
              <h3 className="text-lg font-semibold mb-2">Ataques Especiais</h3>
              <p className="text-sm text-gray-300">
                Atordoe inimigos com ataques especiais devastadores
              </p>
            </Card>
          </div>

          <div className="space-y-4">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/game">🎮 Iniciar Jogo</Link>
            </Button>

            <div className="flex justify-center space-x-4">
              <Button asChild variant="outline">
                <Link href="/rules">📋 Ver Regras</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/ranking">🏆 Ranking</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}