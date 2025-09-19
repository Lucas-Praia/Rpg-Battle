interface BattleLogProps {
  entries: string[]
}

export default function BattleLog({ entries }: BattleLogProps) {
  return (
    <div className="bg-[#1f2937] p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">📜 Log da Batalha</h3>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {entries.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">A batalha está prestes a começar...</p>
        ) : (
          entries
            .slice()
            .reverse()
            .map((entry, index) => (
              <div key={index} className="p-3 rounded bg-muted text-sm">
                {entry}
              </div>
            ))
        )}
      </div>
    </div>
  )
}
