"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, Volume2, X, Loader2 } from "lucide-react"

interface AudioModalProps {
  isOpen: boolean
  onClose: () => void
  audioUrl: string | null
  selectedPlant: string | null
  selectedCharacteristics: string[]
  isLoading?: boolean
}

const plants = {
  bamboo: {
    name: "Bambú Resiliente",
    image: "/bamboo-forest-zen.jpg",
    personality: "Flexible y adaptable",
    backgroundAudio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bamb_Resiliente_2025-09-13T185553-TVF8bJeugzyl2lp1ppadoMpSWE4UBA.mp3",
  },
  lotus: {
    name: "Loto Purificador",
    image: "/lotus-tranquil-water.jpg",
    personality: "Puro y renovador",
    backgroundAudio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Loto_Sereno_2025-09-13T190200-wrnxL1jLIssLaoQ3LckGLMZP8TASWD.mp3",
  },
  ceibo: {
    name: "Ceibo Renaciente",
    image: "/ceibo-red-flower.jpg",
    personality: "Apasionado y resiliente",
    backgroundAudio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Races_del_Ceibo_2025-09-13T193715-QVXVQTYGZVtHxqQMNSgpfEUFKTYGQa.mp3",
  },
  cactus: {
    name: "Cactus Resistente",
    image: "/desert-cactus-bloom.jpg",
    personality: "Sobrio y resistente",
    backgroundAudio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Espritu_del_Cactus_2025-09-13T192044-F1qscUn3CoNa1viCXHfS7aQuv5B9Wq.mp3",
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

export default function AudioModal({
  isOpen,
  onClose,
  audioUrl,
  selectedPlant,
  selectedCharacteristics,
  isLoading = false,
}: AudioModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState([80])
  const audioRef = useRef<HTMLAudioElement>(null)
  const backgroundAudioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (backgroundAudioRef.current) {
      if (isLoading) {
        // Lower volume during loading
        backgroundAudioRef.current.volume = (volume[0] / 100) * 0.1
        backgroundAudioRef.current.play()
      } else {
        // Normal volume when not loading
        backgroundAudioRef.current.volume = (volume[0] / 100) * 0.3
      }
    }
  }, [isLoading, volume])

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

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false)
      setCurrentTime(0)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause()
        backgroundAudioRef.current.currentTime = 0
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const togglePlayPause = () => {
    const audio = audioRef.current
    const backgroundAudio = backgroundAudioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      if (backgroundAudio) {
        backgroundAudio.pause()
      }
    } else {
      audio.play()
      if (backgroundAudio) {
        backgroundAudio.play()
      }
    }
    setIsPlaying(!isPlaying)
  }

  const resetAudio = () => {
    const audio = audioRef.current
    const backgroundAudio = backgroundAudioRef.current
    if (!audio) return

    audio.currentTime = 0
    setCurrentTime(0)
    setIsPlaying(true)
    audio.play()
    if (backgroundAudio) {
      backgroundAudio.currentTime = 0
      backgroundAudio.play()
    }
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
    if (backgroundAudioRef.current) {
      if (isLoading) {
        // Lower volume during loading
        backgroundAudioRef.current.volume = (value[0] / 100) * 0.1
      } else {
        // Normal background volume
        backgroundAudioRef.current.volume = (value[0] / 100) * 0.3
      }
    }
  }

  const currentPlant = selectedPlant ? plants[selectedPlant as keyof typeof plants] : null
  const characteristicNames = selectedCharacteristics
    .map((char) => characteristicLabels[char as keyof typeof characteristicLabels])
    .join(", ")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-0 duration-500">
      <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-heading text-2xl font-bold">Sesión de Mindfulness</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          <Card className="shadow-lg border-0">
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
              <CardTitle className="font-heading text-2xl mb-2">
                {currentPlant ? currentPlant.name : "Sesión Personalizada"}
              </CardTitle>
              <p className="text-muted-foreground text-pretty mb-2">
                {currentPlant ? currentPlant.personality : "Tu sesión de mindfulness personalizada"}
              </p>
              {characteristicNames && (
                <p className="text-sm text-muted-foreground">Adaptado para: {characteristicNames}</p>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {isLoading && (
                <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-0">
                  <CardContent className="p-6 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <div className="space-y-2">
                        <p className="font-heading text-lg">Generando tu sesión personalizada...</p>
                        <p className="text-sm text-muted-foreground">Preparando una experiencia única para ti</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!isLoading && (
                <>
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
                      className="rounded-full w-12 h-12 bg-transparent"
                      onClick={resetAudio}
                      disabled={!audioUrl}
                    >
                      <RotateCcw className="w-5 h-5" />
                    </Button>

                    <Button
                      size="lg"
                      className="rounded-full w-16 h-16 shadow-lg"
                      onClick={togglePlayPause}
                      disabled={!audioUrl}
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                    </Button>

                    <div className="flex items-center gap-3">
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                      <div className="w-16">
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
                      <CardContent className="p-4 text-center">
                        <p className="text-muted-foreground text-sm">
                          No hay audio generado. Intenta generar una nueva sesión.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}

              {/* Meditation Quote - Show always */}
              {currentPlant && (
                <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-0">
                  <CardContent className="p-4 text-center">
                    <p className="font-heading text-base italic text-pretty">
                      "Como las plantas crecen hacia la luz, tu mente puede crecer hacia la paz."
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">- {currentPlant.name}</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>

        {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
        {currentPlant && <audio ref={backgroundAudioRef} src={currentPlant.backgroundAudio} preload="metadata" loop />}
      </div>
    </div>
  )
}
