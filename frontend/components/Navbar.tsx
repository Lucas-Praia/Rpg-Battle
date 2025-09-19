"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/game", label: "Jogo", icon: "⚔️" },
    { href: "/rules", label: "Regras", icon: "📋" },
    { href: "/ranking", label: "Ranking", icon: "🏆" },
  ]

  return (
    <nav className="border-b bg-[#1f2937]">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">⚔️</span>
            <span className="font-bold text-xl text-white">RPG Battle</span>
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Button
                  key={item.href}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="hover:bg-gray-100 transition-colors"
                >
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-1 ${isActive
                      ? "text-black"
                      : "text-white hover:text-black"
                      }`}
                  >
                    <span>{item.icon}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
