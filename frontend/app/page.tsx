import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface FeatureCardProps {
  emoji: string
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ emoji, title, description }) => (
  <Card className="p-6 bg-[#1f2937] text-[#E2E8F0] hover:bg-[#1E3A8A] hover:shadow-lg transition-colors">
    <div className="text-4xl mb-4">{emoji}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-300">{description}</p>
  </Card>
)

const featureCardsData: FeatureCardProps[] = [
  {
    emoji: "⚔️",
    title: "Combate Estratégico",
    description: "Use ataques básicos, especiais e cura para derrotar seus inimigos"
  },
  {
    emoji: "🏆",
    title: "Sistema de Ranking",
    description: "Compete com outros jogadores e alcance o topo do ranking"
  },
  {
    emoji: "💥",
    title: "Ataques Especiais",
    description: "Atordoe inimigos com ataques especiais devastadores"
  }
]
interface NavigationButtonProps {
  href: string
  variant?: "default" | "outline"
  children: React.ReactNode
  size?: "default" | "lg"
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  href,
  variant = "default",
  children,
  size = "default"
}) => (
  <Button asChild variant={variant} size={size}>
    <Link href={href}>{children}</Link>
  </Button>
)

export default function HomePage() {
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
            {featureCardsData.map((feature, index) => (
              <FeatureCard
                key={index}
                emoji={feature.emoji}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
          <div className="space-y-4">
            <NavigationButton
              href="/game"
              size="lg"
              className="text-lg px-8 py-6"
            >
              🎮 Iniciar Jogo
            </NavigationButton>

            <div className="flex justify-center space-x-4">
              <NavigationButton href="/rules" variant="outline">
                📋 Ver Regras
              </NavigationButton>
              <NavigationButton href="/ranking" variant="outline">
                🏆 Ranking
              </NavigationButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}