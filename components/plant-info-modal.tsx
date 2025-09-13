"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect } from "react"

interface Plant {
  id: string
  name: string
  image: string
  personality: string
  specialties: string[]
  description: string
  color: string
  musicDescription: string
  tempo: string
  instruments: string[]
  voiceDescription?: string
  metaphors?: string[]
  preview?: string
}

interface PlantInfoModalProps {
  isOpen: boolean
  onClose: () => void
  plant: Plant | null
}

export default function PlantInfoModal({ isOpen, onClose, plant }: PlantInfoModalProps) {
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

  if (!plant) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="font-heading text-2xl flex items-center gap-4">
            <img
              src={plant.image || "/placeholder.svg"}
              alt={plant.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {plant.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {/* Personality & Description */}
          <Card className={plant.color}>
            <CardContent className="p-6">
              <h3 className="font-heading text-lg font-semibold mb-2">Personalidad</h3>
              <p className="text-muted-foreground mb-4">{plant.personality}</p>
              <p className="text-sm text-pretty">{plant.description}</p>
            </CardContent>
          </Card>

          {/* Specialties */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-3">Especialidades</h3>
            <div className="flex flex-wrap gap-2">
              {plant.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-sm">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Musical Characteristics */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-lg font-semibold mb-3">Características Musicales</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm mb-1">Descripción:</h4>
                  <p className="text-sm text-muted-foreground">{plant.musicDescription}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Tempo:</h4>
                  <p className="text-sm text-muted-foreground">{plant.tempo}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Instrumentos:</h4>
                  <p className="text-sm text-muted-foreground">{plant.instruments.join(", ")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ceibo specific content */}
          {plant.id === "ceibo" && (
            <>
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold mb-3">Características de Voz</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plant.voiceDescription}</p>

                  {plant.metaphors && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Metáforas:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {plant.metaphors.map((metaphor, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            <span className="italic">"{metaphor}"</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {plant.preview && (
                    <div className="p-4 bg-white rounded-lg border border-red-200">
                      <h4 className="font-semibold text-sm mb-2">Vista previa:</h4>
                      <p className="text-sm italic text-muted-foreground leading-relaxed">"{plant.preview}"</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
