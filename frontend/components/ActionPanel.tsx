"use client"

import { Button } from "@/components/ui/button"

interface ActionPanelProps {
  onBasic: () => void
  onSpecial: () => void
  onHeal: () => void
  onGiveUp: () => void
  specialDisabled: boolean
  specialCooldown: number
  disabled: boolean
}

export default function ActionPanel({
  onBasic,
  onSpecial,
  onHeal,
  onGiveUp,
  specialDisabled,
  specialCooldown,
  disabled,
}: ActionPanelProps) {
  return (
    <div className="bg-card p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold text-center mb-4">Ações</h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Button onClick={onBasic} disabled={disabled} className="bg-blue-600 hover:bg-blue-700 h-16">
          <div className="text-center">
            <div>⚔️ Ataque</div>
            <div className="text-xs">Básico</div>
          </div>
        </Button>

        <Button
          onClick={onSpecial}
          disabled={disabled || specialDisabled}
          className="bg-red-600 hover:bg-red-700 h-16"
          aria-disabled={specialDisabled}
        >
          <div className="text-center">
            <div>💥 Especial</div>
            <div className="text-xs">{specialCooldown > 0 ? `${specialCooldown} turnos` : "Disponível"}</div>
          </div>
        </Button>

        <Button onClick={onHeal} disabled={disabled} className="bg-green-600 hover:bg-green-700 h-16">
          <div className="text-center">
            <div>💚 Curar</div>
            <div className="text-xs">5-15 HP</div>
          </div>
        </Button>

        <Button onClick={onGiveUp} disabled={disabled} className="bg-purple-600 hover:bg-purple-700 h-16">
          <div className="text-center">
            <div>🏃 Desistir</div>
            <div className="text-xs">Sair</div>
          </div>
        </Button>
      </div>
    </div>
  )
}
