"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, ArrowLeft, Volume2 } from "lucide-react"
import Link from "next/link"

const plants = {
  bamboo: {
    name: "Bambú Resiliente",
    image: "/bamboo-forest-zen.jpg",
    personality: "Flexible y adaptable",
  },
  lotus: {
    name: "Loto Purificador",
    image: "/lotus-tranquil-water.jpg",
    personality: "Puro y renovador",
  },
  pine: {
    name: "Pino Enraizado",
    image: "/mountain-pine-forest.jpg",
    personality: "Estable y protector",
  },
  cactus: {
    name: "Cactus Resistente",
    image: "/desert-cactus-bloom.jpg",
    personality: "Sobrio y resistente",
  },
}

const characteristicLabels = {
  child: "Niño/a",
  stressed: "Estresado/a",
  sad: "Triste",
  pregnant: "Embarazada",
  anxious: "Ansioso/a",
  tired: "Cansado/a",
  angry: "Enojado/a",
  confused: "Confundido/a",
}

export default function MeditationPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState([80])
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null)
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const generatedAudioUrl = sessionStorage.getItem("generatedAudioUrl")
    const plantId = sessionStorage.getItem("selectedPlant")
    const characteristics = sessionStorage.getItem("selectedCharacteristics")

    if (generatedAudioUrl) {
      setAudioUrl(generatedAudioUrl)
    }
    if (plantId) {
      setSelectedPlant(plantId)
    }
    if (characteristics) {
      setSelectedCharacteristics(JSON.parse(characteristics))
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => setIsPlaying(false)
    const handleLoadedMetadata = () => setDuration(audio.duration)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
    }
  }, [audioUrl])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const resetAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = 0
    setCurrentTime(0)
    setIsPlaying(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value)
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100
    }
  }

  const currentPlant = selectedPlant ? plants[selectedPlant as keyof typeof plants] : null
  const characteristicNames = selectedCharacteristics
    .map((char) => characteristicLabels[char as keyof typeof characteristicLabels])
    .join(", ")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/avatar">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cambiar Avatar
            </Button>
          </Link>
          <h1 className="font-heading text-4xl font-bold text-foreground">Sesión de Mindfulness</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Audio Player */}
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center overflow-hidden">
                {currentPlant ? (
                  <img
                    src={currentPlant.image || "/placeholder.svg"}
                    alt={currentPlant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src="/peaceful-plant-meditation.jpg" alt="Planta meditando" className="w-24 h-24 rounded-full" />
                )}
              </div>
              <CardTitle className="font-heading text-3xl mb-2">
                {currentPlant ? currentPlant.name : "Sesión Personalizada"}
              </CardTitle>
              <p className="text-muted-foreground text-pretty mb-2">
                {currentPlant ? currentPlant.personality : "Tu sesión de mindfulness personalizada"}
              </p>
              {characteristicNames && (
                <p className="text-sm text-muted-foreground">Adaptado para: {characteristicNames}</p>
              )}
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
                    }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full w-14 h-14 bg-transparent"
                  onClick={resetAudio}
                  disabled={!audioUrl}
                >
                  <RotateCcw className="w-6 h-6" />
                </Button>

                <Button
                  size="lg"
                  className="rounded-full w-20 h-20 shadow-lg"
                  onClick={togglePlayPause}
                  disabled={!audioUrl}
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </Button>

                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-muted-foreground" />
                  <div className="w-20">
                    <Slider
                      value={volume}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Status Message */}
              {!audioUrl && (
                <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-0">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">
                      No hay audio generado. Regresa a la selección de avatar para crear tu sesión personalizada.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Meditation Quote */}
              {currentPlant && (
                <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-0">
                  <CardContent className="p-6 text-center">
                    <p className="font-heading text-lg italic text-pretty">
                      "Como las plantas crecen hacia la luz, tu mente puede crecer hacia la paz."
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">- {currentPlant.name}</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>

        {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
      </div>
    </div>
  )
}
