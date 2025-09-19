"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Particles from "react-particles"
import { loadFireworksPreset } from "tsparticles-preset-fireworks"
import type { Engine } from "tsparticles-engine"

interface ScoreModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (name: string) => void
  score: number
  isSubmitting: boolean
}

export default function ScoreModal({ isOpen, onClose, onSubmit, score, isSubmitting }: ScoreModalProps) {
  const [name, setName] = useState("")
  const [showFireworks, setShowFireworks] = useState(false)

  const particlesInit = async (engine: Engine) => {
    await loadFireworksPreset(engine)
  }

  useEffect(() => {
    if (isOpen) {
      setShowFireworks(true)
      const timer = setTimeout(() => setShowFireworks(false), 5000)
      return () => clearTimeout(timer)
    } else {
      setShowFireworks(false)
    }
  }, [isOpen])

  const handleSubmit = () => {
    if (name.trim() && name.trim().length <= 15) {
      onSubmit(name.trim())
    }
  }

  return (
    <>
      {showFireworks && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            preset: "fireworks",
            background: {
              color: {
                value: "transparent",
              },
            },
            particles: {
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 3,
                straight: false,
              },
            },
          }}
          className="fixed inset-0 w-full h-full pointer-events-none z-40"
        />
      )}

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-[#1f2937] ">
          <DialogHeader>
            <DialogTitle>🎉 Parabéns! Você venceu!</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">Pontuação: {score}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Digite seu nome para o ranking:</label>
              <Input
                type="text"
                placeholder="Seu nome (máx. 15 caracteres)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                maxLength={15}
                autoFocus
              />
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleSubmit}
                disabled={!name.trim() || isSubmitting}
                className="flex-1 bg-green-600 text-white hover:bg-green-400"
              >
                {isSubmitting ? "Salvando..." : "Salvar no Ranking"}
              </Button>
              <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                Pular
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}