"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { getRanking, type Player } from "@/lib/api"

export default function RankingPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchRanking = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getRanking(50)
      setPlayers(data)
    } catch (err) {
      setError("Erro ao carregar ranking")
      toast({
        title: "Erro",
        description: "Não foi possível carregar o ranking.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRanking()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🏆 Ranking</h1>
          <p className="text-muted-foreground">Os melhores jogadores de RPG Battle</p>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Top 50 Jogadores</h2>
            <Button onClick={fetchRanking} disabled={loading}>
              {loading ? "Carregando..." : "🔄 Atualizar"}
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin text-4xl mb-4">⚔️</div>
              <p>Carregando ranking...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">❌</div>
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchRanking}>Tentar Novamente</Button>
            </div>
          ) : players.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🏆</div>
              <p className="text-muted-foreground">Nenhum jogador no ranking ainda.</p>
              <p className="text-sm text-muted-foreground mt-2">Seja o primeiro a jogar e aparecer aqui!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Posição</th>
                    <th className="text-left py-3 px-2">Nome</th>
                    <th className="text-left py-3 px-2">Pontuação</th>
                    <th className="text-left py-3 px-2">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => (
                    <tr key={player.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2">
                        <div className="flex items-center">
                          <span className="font-bold text-lg mr-2">
                            {index + 1 <= 3
                              ? index + 1 === 1
                                ? "🥇"
                                : index + 1 === 2
                                  ? "🥈"
                                  : "🥉"
                              : `#${index + 1}`}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-semibold">{player.playerName}</td>
                      <td className="py-3 px-2">
                        <span className="font-bold text-green-600">{player.score}</span>
                      </td>
                      <td className="py-3 px-2 text-sm text-muted-foreground">{formatDate(player.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
