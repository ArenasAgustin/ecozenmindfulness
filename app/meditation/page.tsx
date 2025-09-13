"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, ArrowLeft, Volume2 } from "lucide-react"
import Link from "next/link"

const meditationSessions = [
  {
    id: "breathing",
    title: "Respiración Consciente",
    duration: 300, // 5 minutes
    description: "Una sesión suave de respiración guiada para calmar la mente",
    audioUrl: "/placeholder-audio.mp3", // Placeholder audio
  },
  {
    id: "nature",
    title: "Conexión con la Naturaleza",
    duration: 600, // 10 minutes
    description: "Visualización guiada en un jardín sereno",
    audioUrl: "/placeholder-audio.mp3",
  },
  {
    id: "stress",
    title: "Liberación del Estrés",
    duration: 480, // 8 minutes
    description: "Técnicas para soltar tensiones y encontrar paz",
    audioUrl: "/placeholder-audio.mp3",
  },
]

export default function MeditationPage() {
  const [selectedSession, setSelectedSession] = useState(meditationSessions[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState([80])
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [selectedSession])

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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Session Selection */}
          <div className="lg:col-span-1">
            <h2 className="font-heading text-2xl font-semibold mb-6">Elige tu sesión</h2>
            <div className="space-y-4">
              {meditationSessions.map((session) => (
                <Card
                  key={session.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedSession.id === session.id ? "ring-2 ring-primary shadow-lg" : ""
                  }`}
                  onClick={() => {
                    setSelectedSession(session)
                    resetAudio()
                  }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="font-heading text-lg">{session.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{formatTime(session.duration)}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-pretty">{session.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Audio Player */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <img src="/peaceful-sage-plant-meditating.jpg" alt="Planta meditando" className="w-24 h-24 rounded-full" />
                </div>
                <CardTitle className="font-heading text-3xl mb-2">{selectedSession.title}</CardTitle>
                <p className="text-muted-foreground text-pretty">{selectedSession.description}</p>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(selectedSession.duration)}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(currentTime / selectedSession.duration) * 100}%`,
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
                  >
                    <RotateCcw className="w-6 h-6" />
                  </Button>

                  <Button size="lg" className="rounded-full w-20 h-20 shadow-lg" onClick={togglePlayPause}>
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

                {/* Meditation Quote */}
                <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-0">
                  <CardContent className="p-6 text-center">
                    <p className="font-heading text-lg italic text-pretty">
                      "Como las plantas crecen hacia la luz, tu mente puede crecer hacia la paz."
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">- Salvia Sabia</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} src={selectedSession.audioUrl} preload="metadata" />
      </div>
    </div>
  )
}
