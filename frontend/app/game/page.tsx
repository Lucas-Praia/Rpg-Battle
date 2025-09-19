"use client"

import { useReducer, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { gameReducer, initialGameState } from "@/lib/state"
import { postScore } from "@/lib/api"
import { computeScore } from "@/lib/game"
import HealthBar from "@/components/HealthBar"
import ActionPanel from "@/components/ActionPanel"
import BattleLog from "@/components/BattleLog"
import ScoreModal from "@/components/ScoreModal"

export default function GamePage() {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState)
  const [playerName, setPlayerName] = useState("")
  const [gameStarted, setGameStarted] = useState(false)
  const [showScoreModal, setShowScoreModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (gameState.state === "ENEMY_TURN") {
      const timer = setTimeout(() => {
        dispatch({ type: "ENEMY_ACT" })
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [gameState.state])

  useEffect(() => {
    if (gameState.state === "ENDED" && gameState.playerHP > 0 && gameState.enemyHP <= 0) {
      setShowScoreModal(true)
    }
  }, [gameState.state, gameState.playerHP, gameState.enemyHP])

  const handleStartGame = () => {
    if (playerName.trim().length > 0 && playerName.trim().length <= 15) {
      setGameStarted(true)
      dispatch({ type: "RESET" })
    }
  }

  const handleSubmitScore = async (name: string) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      const score = computeScore(gameState.playerHP, gameState.playerTurns)
      await postScore({
        playerName: name,
        lifePoints: gameState.playerHP,
        turns: gameState.playerTurns,
      })

      toast({
        title: "Pontuação salva!",
        description: `Sua pontuação de ${score} foi registrada no ranking.`,
      })

      setShowScoreModal(false)
      window.location.href = "/ranking"
    } catch (error) {
      toast({
        title: "Erro ao salvar pontuação",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewGame = () => {
    setGameStarted(false)
    setPlayerName("")
    setShowScoreModal(false)
    dispatch({ type: "RESET" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4">
      <div className="container mx-auto max-w-6xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">⚔️ Batalha em Andamento</h1>
          <p className="text-muted-foreground">
            Jogador: {playerName} | Turno: {gameState.turn}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <HealthBar name="Jogador" hp={gameState.playerHP} max={100} />
          <HealthBar name="Inimigo" hp={gameState.enemyHP} max={100} stunned={gameState.stunnedEnemy} />
        </div>

        <ActionPanel
          onBasic={() => dispatch({ type: "PLAYER_BASIC" })}
          onSpecial={() => dispatch({ type: "PLAYER_SPECIAL" })}
          onHeal={() => dispatch({ type: "PLAYER_HEAL" })}
          onGiveUp={() => dispatch({ type: "PLAYER_GIVEUP" })}
          specialDisabled={gameState.specialCooldown > 0}
          specialCooldown={gameState.specialCooldown}
          disabled={gameState.state !== "PLAYER_TURN"}
        />

        <BattleLog entries={gameState.log} />

        {gameState.state === "ENDED" && (
          <Card className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">{gameState.playerHP > 0 ? "🎉 Vitória!" : "💀 Derrota!"}</h2>
            <Button onClick={handleNewGame} className="mr-4">
              Novo Jogo
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Menu Principal
            </Button>
          </Card>
        )}

        <ScoreModal
          isOpen={showScoreModal}
          onClose={() => setShowScoreModal(false)}
          onSubmit={handleSubmitScore}
          score={computeScore(gameState.playerHP, gameState.playerTurns)}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  )
}
