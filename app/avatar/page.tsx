"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Play, Loader2, Info } from "lucide-react"
import Link from "next/link"
import AudioModal from "@/components/audio-modal"
import PlantInfoModal from "@/components/plant-info-modal"

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
    id: "ceibo",
    name: "Ceibo Renaciente",
    image: "/ceibo-red-flower.jpg",
    personality: "Apasionado y resiliente",
    specialties: ["Renacimiento", "Fuerza motivadora", "Pasión de vida"],
    description:
      "Flor nacional argentina que renace después de tormentas. Con voz cálida y acento argentino, te abraza con calidez maternal y fuerza motivadora.",
    color: "bg-red-100 border-red-300",
    musicDescription:
      "Voz femenina de 32 años con suave acento argentino, cálida y melodiosa. Tono rico y resonante con intensidad emocional y calidez maternal.",
    tempo: "Pausado pero intenso",
    instruments: ["Voz argentina", "Calidez de selva", "Fuego del corazón"],
    voiceDescription: "Tono rico y resonante, expresivo pero controlado. Ritmo pausado pero con intensidad emocional.",
    metaphors: [
      "Mi flor roja es fuego que renace",
      "Mis raíces se entrelazan con toda la selva",
      "Florezco más fuerte después de cada tormenta",
      "El fuego de mi flor es el de tu corazón",
    ],
    preview:
      "Hola, soy Ceibo. Mi flor roja arde con la pasión de la vida que siempre renace. Como florezco después de cada tormenta, vos también podés encontrar tu fuerza. El fuego de mi flor es el mismo fuego de tu corazón cuando decide no rendirse jamás.",
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
  { id: "stressed", label: "Estresado/a", icon: "😰" },
  { id: "sad", label: "Triste", icon: "😢" },
  { id: "anxious", label: "Ansioso/a", icon: "😟" },
  { id: "tired", label: "Cansado/a", icon: "😴" },
  { id: "angry", label: "Enojado/a", icon: "😠" },
  { id: "confused", label: "Confundido/a", icon: "🤔" },
  { id: "gratitude", label: "Gratitud", icon: "🙏" },
  { id: "compassion", label: "Compasión", icon: "💝" },
  { id: "joy", label: "Alegría", icon: "😊" },
  { id: "hope", label: "Esperanza", icon: "🌟" },
]

export default function AvatarPage() {
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null)
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null)
  const [showPlantInfo, setShowPlantInfo] = useState(false)
  const [selectedPlantInfo, setSelectedPlantInfo] = useState<any>(null)
  const [showPlantError, setShowPlantError] = useState(false)
  const [showCharacteristicError, setShowCharacteristicError] = useState(false)

  const toggleCharacteristic = (id: string) => {
    setSelectedCharacteristics((prev) => {
      if (prev.includes(id)) {
        // Remove if already selected
        return prev.filter((c) => c !== id)
      } else {
        // Add only if less than 2 are selected
        if (prev.length < 2) {
          return [...prev, id]
        }
        return prev
      }
    })
  }

  const handlePlantInfo = (plant: any, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent plant selection when clicking info icon
    setSelectedPlantInfo(plant)
    setShowPlantInfo(true)
  }

  const canProceed = selectedPlant && selectedCharacteristics.length > 0

  const handleStartMeditation = async () => {
    if (!selectedPlant) {
      setShowPlantError(true)
      setTimeout(() => setShowPlantError(false), 3000) // Hide error after 3 seconds
      return
    }

    if (selectedCharacteristics.length === 0) {
      setShowCharacteristicError(true)
      setTimeout(() => setShowCharacteristicError(false), 3000) // Hide error after 3 seconds
      return
    }

    setIsGenerating(true)
    setShowModal(true)

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

      setGeneratedAudioUrl(audioUrl)
    } catch (error) {
      console.error("Error generating audio:", error)
      alert("Error generando el audio. Por favor intenta de nuevo.")
      setShowModal(false)
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
                } ${plant.color} relative`}
                onClick={() => setSelectedPlant(plant.id)}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 z-10 h-8 w-8 p-0 bg-white/80 hover:bg-gray-200"
                  onClick={(e) => handlePlantInfo(plant, e)}
                >
                  <Info className="w-4 h-4 text-black" />
                </Button>

                <CardHeader className="text-center pb-4">
                  <img
                    src={plant.image || "/placeholder.svg"}
                    alt={plant.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                  />
                  <CardTitle className="font-heading text-xl">{plant.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plant.personality}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Characteristics Selection */}
        <div className="mb-12">
          <h2 className="font-heading text-2xl font-semibold mb-6">¿Cómo te sientes hoy?</h2>
          <p className="text-muted-foreground mb-6">
            Selecciona hasta 2 características que describan tu estado actual ({selectedCharacteristics.length}/2)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {characteristics.map((char) => (
              <Button
                key={char.id}
                variant={selectedCharacteristics.includes(char.id) ? "default" : "outline"}
                className="h-20 flex flex-col gap-2 rounded-2xl"
                onClick={() => toggleCharacteristic(char.id)}
                disabled={selectedCharacteristics.length >= 2 && !selectedCharacteristics.includes(char.id)}
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
            className="text-lg px-12 py-6 rounded-full shadow-lg cursor-pointer" // Added cursor-pointer class
            disabled={isGenerating}
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

      {/* Error Notifications */}
      {showPlantError && (
        <div className="fixed bottom-4 left-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-left-5 duration-300">
          <p className="font-medium">Por favor selecciona una planta para continuar</p>
        </div>
      )}

      {showCharacteristicError && (
        <div className="fixed bottom-4 left-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-left-5 duration-300">
          <p className="font-medium">Por favor selecciona al menos una característica para continuar</p>
        </div>
      )}

      <AudioModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        audioUrl={generatedAudioUrl}
        selectedPlant={selectedPlant}
        selectedCharacteristics={selectedCharacteristics}
        isLoading={isGenerating} // Pass loading state to modal
      />
      <PlantInfoModal isOpen={showPlantInfo} onClose={() => setShowPlantInfo(false)} plant={selectedPlantInfo} />
    </div>
  )
}
