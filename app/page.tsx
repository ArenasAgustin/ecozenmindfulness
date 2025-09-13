"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Heart, Brain, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6 opacity-0 animate-fade-in-scale">
            <div className="relative">
              <img src="/logo.png" alt="EcoZend Logo" className="w-24 h-24 object-contain" />
            </div>
          </div>

          <h1 className="font-heading text-6xl md:text-7xl font-bold text-foreground mb-6 text-balance opacity-0 animate-fade-in-up delay-200">
            <span className="text-primary">EcoZend</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty opacity-0 animate-fade-in-up delay-400">
            Conecta con la naturaleza a través de plantas que hablan. Encuentra paz interior con tu compañero botánico
            personalizado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up delay-500">
            <Link href="/avatar">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full">
                <Leaf className="w-5 h-5 mr-2" />
                Comenzar Viaje
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm opacity-0 animate-fade-in-up delay-600">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4">Meditación Personalizada</h3>
              <p className="text-muted-foreground text-pretty">
                Cada planta ofrece técnicas únicas adaptadas a tu estado emocional y necesidades específicas.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm opacity-0 animate-fade-in-up delay-700">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4">Avatares Botánicos</h3>
              <p className="text-muted-foreground text-pretty">
                Elige entre una variedad de plantas sabias, cada una con su propia personalidad y sabiduría.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm opacity-0 animate-fade-in-up delay-800">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4">Bienestar Integral</h3>
              <p className="text-muted-foreground text-pretty">
                Aborda diferentes aspectos emocionales: estrés, ansiedad, tristeza, y más con compasión.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center opacity-0 animate-fade-in-scale delay-1000">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm">
            <CardContent className="p-12">
              <h2 className="font-heading text-4xl font-bold mb-6 text-balance">Tu Jardín Interior Te Espera</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Comienza tu práctica de mindfulness con la guía de plantas sabias que comprenden tu corazón.
              </p>
              <Link href="/avatar">
                <Button size="lg" className="text-lg px-12 py-6 rounded-full shadow-lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Elegir Mi Planta Guía
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
