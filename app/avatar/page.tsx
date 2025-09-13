"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play } from "lucide-react"
import Link from "next/link"

const plants = [
  {
    id: "sage",
    name: "Salvia Sabia",
    image: "/wise-sage-plant-with-gentle-eyes.jpg",
    personality: "Sabia y tranquila",
    specialties: ["Ansiedad", "Estrés laboral", "Insomnio"],
    description: "Una planta ancestral que ha visto muchas estaciones. Su voz es suave y sus consejos profundos.",
    color: "bg-green-100 border-green-300",
  },
  {
    id: "sunflower",
    name: "Girasol Alegre",
    image: "/happy-sunflower-with-bright-smile.jpg",
    personality: "Optimista y energética",
    specialties: ["Tristeza", "Depresión", "Baja autoestima"],
    description: "Siempre mira hacia el sol y te ayudará a encontrar la luz en los momentos oscuros.",
    color: "bg-yellow-100 border-yellow-300",
  },
  {
    id: "lavender",
    name: "Lavanda Serena",
    image: "/peaceful-lavender-plant-with-calming-aura.jpg",
    personality: "Calmada y maternal",
    specialties: ["Embarazo", "Maternidad", "Relajación"],
    description: "Su aroma imaginario te tranquiliza. Perfecta para momentos de transición y cuidado personal.",
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: "bamboo",
    name: "Bambú Resiliente",
    image: "/strong-bamboo-plant-with-determined-expression.jpg",
    personality: "Fuerte y adaptable",
    specialties: ["Cambios de vida", "Fortaleza", "Crecimiento"],
    description: "Flexible pero inquebrantable. Te enseñará a doblarte sin romperte ante las adversidades.",
    color: "bg-emerald-100 border-emerald-300",
  },
]

const characteristics = [
  { id: "child", label: "Niño/a", icon: "🧒" },
  { id: "stressed", label: "Estresado/a", icon: "😰" },
  { id: "sad", label: "Triste", icon: "😢" },
  { id: "pregnant", label: "Embarazada", icon: "🤱" },
  { id: "anxious", label: "Ansioso/a", icon: "😟" },
  { id: "tired", label: "Cansado/a", icon: "😴" },
  { id: "angry", label: "Enojado/a", icon: "😠" },
  { id: "confused", label: "Confundido/a", icon: "🤔" },
]

export default function AvatarPage() {
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null)
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([])

  const toggleCharacteristic = (id: string) => {
    setSelectedCharacteristics((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
  }

  const canProceed = selectedPlant && selectedCharacteristics.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="font-heading text-4xl font-bold text-foreground">Elige Tu Compañero Botánico</h1>
        </div>

        {/* Plant Selection */}
        <div className="mb-12">
          <h2 className="font-heading text-2xl font-semibold mb-6">Selecciona tu planta guía</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plants.map((plant) => (
              <Card
                key={plant.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPlant === plant.id ? "ring-2 ring-primary shadow-lg scale-105" : "hover:scale-102"
                } ${plant.color}`}
                onClick={() => setSelectedPlant(plant.id)}
              >
                <CardHeader className="text-center pb-4">
                  <img
                    src={plant.image || "/placeholder.svg"}
                    alt={plant.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                  />
                  <CardTitle className="font-heading text-xl">{plant.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plant.personality}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4 text-pretty">{plant.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {plant.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Characteristics Selection */}
        <div className="mb-12">
          <h2 className="font-heading text-2xl font-semibold mb-6">¿Cómo te sientes hoy?</h2>
          <p className="text-muted-foreground mb-6">
            Selecciona una o más características que describan tu estado actual
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {characteristics.map((char) => (
              <Button
                key={char.id}
                variant={selectedCharacteristics.includes(char.id) ? "default" : "outline"}
                className="h-20 flex flex-col gap-2 rounded-2xl"
                onClick={() => toggleCharacteristic(char.id)}
              >
                <span className="text-2xl">{char.icon}</span>
                <span className="text-sm">{char.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Link href={canProceed ? "/meditation" : "#"}>
            <Button size="lg" className="text-lg px-12 py-6 rounded-full shadow-lg" disabled={!canProceed}>
              <Play className="w-5 h-5 mr-2" />
              Comenzar Sesión de Mindfulness
            </Button>
          </Link>
          {!canProceed && (
            <p className="text-sm text-muted-foreground mt-4">
              Selecciona una planta y al menos una característica para continuar
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
