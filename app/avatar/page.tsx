"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const plants = [
  {
    id: "bamboo",
    name: "Bambú Resiliente",
    image: "/bamboo-forest-zen.jpg",
    personality: "Flexible y adaptable",
    specialties: ["Cambios de vida", "Resiliencia", "Crecimiento personal"],
    description:
      "Evoca bosques de bambú asiáticos con flauta shakuhachi y cuencos tibetanos. Te enseña a doblarte sin romperte, creciendo con serenidad y fortaleza.",
    color: "bg-emerald-100 border-emerald-300",
    musicDescription:
      "8-12 minutos de sonidos de viento entre cañas, agua corriendo y melodías de flauta japonesa que evocan crecimiento y flexibilidad.",
    tempo: "60-70 BPM",
    instruments: ["Flauta shakuhachi", "Cuencos tibetanos", "Chimes de bambú"],
  },
  {
    id: "lotus",
    name: "Loto Purificador",
    image: "/lotus-tranquil-water.jpg",
    personality: "Puro y renovador",
    specialties: ["Renacimiento", "Pureza mental", "Calma profunda"],
    description:
      "Soundscape de aguas tranquilas con arpa y piano minimalista. Como la flor que emerge del lodo, te ayuda a encontrar claridad y renovación.",
    color: "bg-pink-100 border-pink-300",
    musicDescription:
      "10-15 minutos de arpeggios como gotas, notas espaciadas de piano y campanas de cristal que evocan el florecimiento gradual.",
    tempo: "45-55 BPM",
    instruments: ["Arpa ligera", "Piano minimalista", "Campanas de agua"],
  },
  {
    id: "pine",
    name: "Pino Enraizado",
    image: "/mountain-pine-forest.jpg",
    personality: "Estable y protector",
    specialties: ["Estabilidad", "Fortaleza interior", "Conexión con la tierra"],
    description:
      "Ambiente de bosque de montaña con violonchelo y flauta de madera. Te conecta con tu fuerza interior y raíces profundas.",
    color: "bg-green-100 border-green-300",
    musicDescription:
      "8-12 minutos de drones graves, viento en pinos y melodías que transmiten estabilidad y arraigo profundo.",
    tempo: "50-60 BPM",
    instruments: ["Violonchelo pizzicato", "Contrabajo", "Flauta de madera"],
  },
  {
    id: "cactus",
    name: "Cactus Resistente",
    image: "/desert-cactus-bloom.jpg",
    personality: "Sobrio y resistente",
    specialties: ["Resistencia", "Energía contenida", "Supervivencia"],
    description:
      "Paisaje sonoro desértico con guitarra fingerpicking y handpan. Te enseña la belleza de la resistencia silenciosa y el florecimiento interno.",
    color: "bg-orange-100 border-orange-300",
    musicDescription:
      "8-10 minutos de patrones geométricos de guitarra, resonancia metálica cálida y silencios espaciosos del desierto.",
    tempo: "65-75 BPM",
    instruments: ["Guitarra acústica", "Handpan", "Shakers sutiles"],
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
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  const toggleCharacteristic = (id: string) => {
    setSelectedCharacteristics((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
  }

  const canProceed = selectedPlant && selectedCharacteristics.length > 0

  const handleStartMeditation = async () => {
    if (!canProceed) return

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plant: selectedPlant,
          characteristics: selectedCharacteristics,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate audio")
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      // Store the generated audio URL and plant info in sessionStorage
      sessionStorage.setItem("generatedAudioUrl", audioUrl)
      sessionStorage.setItem("selectedPlant", selectedPlant!)
      sessionStorage.setItem("selectedCharacteristics", JSON.stringify(selectedCharacteristics))

      router.push("/meditation")
    } catch (error) {
      console.error("Error generating audio:", error)
      alert("Error generando el audio. Por favor intenta de nuevo.")
    } finally {
      setIsGenerating(false)
    }
  }

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
                  {selectedPlant === plant.id && (
                    <div className="mt-4">
                      <h3 className="font-heading text-lg font-semibold mb-2">Características Musicales</h3>
                      <p className="text-sm mb-2 text-muted-foreground">{plant.musicDescription}</p>
                      <p className="text-sm mb-2 text-muted-foreground">Tempo: {plant.tempo}</p>
                      <p className="text-sm mb-2 text-muted-foreground">Instrumentos: {plant.instruments.join(", ")}</p>
                    </div>
                  )}
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
          <Button
            size="lg"
            className="text-lg px-12 py-6 rounded-full shadow-lg"
            disabled={!canProceed || isGenerating}
            onClick={handleStartMeditation}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generando Audio Personalizado...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Comenzar Sesión de Mindfulness
              </>
            )}
          </Button>
          {!canProceed && (
            <p className="text-sm text-muted-foreground mt-4">
              Selecciona una planta y al menos una característica para continuar
            </p>
          )}
          {isGenerating && (
            <p className="text-sm text-muted-foreground mt-4">Creando tu sesión personalizada con ElevenLabs...</p>
          )}
        </div>
      </div>
    </div>
  )
}
