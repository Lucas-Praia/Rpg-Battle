import { Card } from "@/components/ui/card"

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">📋 Regras do Jogo</h1>
          <p className="text-muted-foreground">Como jogar RPG Battle</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">⚔️ Objetivo</h2>
            <p className="text-muted-foreground">
              Derrote o inimigo reduzindo seus pontos de vida a zero antes que ele faça o mesmo com você.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">🎮 Ações Disponíveis</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">⚔️</span>
                <div>
                  <h3 className="font-semibold">Ataque Básico</h3>
                  <p className="text-sm text-muted-foreground">
                    Causa dano de 5 a 10 pontos no inimigo. Sempre disponível.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-2xl">💥</span>
                <div>
                  <h3 className="font-semibold">Ataque Especial</h3>
                  <p className="text-sm text-muted-foreground">
                    Causa dano de 10 a 20 pontos e tem 50% de chance de atordoar o inimigo. Fica indisponível por 2
                    turnos após o uso.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-2xl">💚</span>
                <div>
                  <h3 className="font-semibold">Curar</h3>
                  <p className="text-sm text-muted-foreground">
                    Restaura de 5 a 15 pontos de vida. Não pode exceder 100 HP.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-2xl">🏃</span>
                <div>
                  <h3 className="font-semibold">Desistir</h3>
                  <p className="text-sm text-muted-foreground">Encerra a batalha imediatamente. Não ganha pontuação.</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">👹 Comportamento do Inimigo</h2>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">• O inimigo ataca automaticamente após sua ação</p>
              <p className="text-sm text-muted-foreground">• A cada 3 turnos, usa ataque especial (8-16 de dano)</p>
              <p className="text-sm text-muted-foreground">• Nos outros turnos, usa ataque básico (6-12 de dano)</p>
              <p className="text-sm text-muted-foreground">• Se estiver atordoado, perde o turno</p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">🏆 Sistema de Pontuação</h2>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">• Pontuação = (Vida Restante × 1000) ÷ Número de Turnos</p>
              <p className="text-sm text-muted-foreground">
                • Quanto mais vida você mantiver e menos turnos usar, maior a pontuação
              </p>
              <p className="text-sm text-muted-foreground">• Apenas vitórias são registradas no ranking</p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">💡 Dicas Estratégicas</h2>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                • Use ataques especiais estrategicamente para atordoar o inimigo
              </p>
              <p className="text-sm text-muted-foreground">• Cure-se quando sua vida estiver baixa (abaixo de 50%)</p>
              <p className="text-sm text-muted-foreground">• Observe o padrão de ataques do inimigo para se preparar</p>
              <p className="text-sm text-muted-foreground">
                • Termine a batalha rapidamente para maximizar sua pontuação
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
