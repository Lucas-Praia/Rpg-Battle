interface HealthBarProps {
  name: string
  hp: number
  max: number
  stunned?: boolean
}

export default function HealthBar({ name, hp, max, stunned }: HealthBarProps) {
  const percentage = (hp / max) * 100

  const getColor = () => {
    if (percentage >= 50) return "bg-green-500"
    if (percentage >= 20) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="bg-card p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold">{name}</h3>
        {stunned && <span className="text-sm bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">😵 Atordoado</span>}
      </div>

      <div
        className="w-full bg-muted rounded-full h-6 overflow-hidden"
        role="progressbar"
        aria-valuenow={hp}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${name} tem ${hp} de ${max} pontos de vida`}
      >
        <div className={`h-full transition-all duration-500 ${getColor()}`} style={{ width: `${percentage}%` }} />
      </div>

      <div className="text-center mt-2 font-medium">
        {hp}/{max}
      </div>
    </div>
  )
}
