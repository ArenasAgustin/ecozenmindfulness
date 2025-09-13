import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { plant, characteristics } = await request.json()

    if (!plant || !characteristics || characteristics.length === 0) {
      return NextResponse.json({ error: "Plant and characteristics are required" }, { status: 400 })
    }

    // Plant descriptions for audio generation
    const plantPrompts = {
      bamboo: {
        voice: "Voz suave y flexible como el viento entre bambúes",
        voiceId: process.env.VOICE_ID_BAMBU || "21m00Tcm4TlvDq8ikWAM", // Environment variable or default
        script: `Bienvenido a tu sesión de mindfulness con el Bambú Resiliente. 
        Imagina que estás en un bosque de bambú asiático, donde las cañas se mecen suavemente con el viento.
        Como el bambú, tú también puedes doblarte sin romperte. Respira profundamente y siente cómo tu flexibilidad interior te da fuerza.
        Con cada respiración, permites que los desafíos te moldeen sin quebrarte. Eres resiliente, eres adaptable, eres como el bambú que crece hacia el cielo.`,
      },
      lotus: {
        voice: "Voz cristalina y pura como agua tranquila",
        voiceId: process.env.VOICE_ID_LOTO || "EXAVITQu4vr4xnSDxMaL", // Environment variable or default
        script: `Te doy la bienvenida a tu sesión con el Loto Purificador.
        Visualiza un estanque sereno donde florece un hermoso loto. Como esta flor sagrada, tú emerges de las dificultades con pureza renovada.
        Respira lentamente y siente cómo cada exhalación libera lo que ya no necesitas. Con cada inhalación, renuevas tu claridad mental.
        Eres puro potencial, floreciendo desde tu interior hacia la luz. Permítete renacer en este momento de calma profunda.`,
      },
      ceibo: {
        voice: "Voz femenina de 32 años con suave acento argentino, cálida y melodiosa",
        voiceId: process.env.VOICE_ID_CEIBO || "pNInz6obpgDQGcFmaJgB", // Environment variable or default
        script: `Hola, soy Ceibo. Mi flor roja arde con la pasión de la vida que siempre renace. 
        Como florezco después de cada tormenta, vos también podés encontrar tu fuerza. 
        El fuego de mi flor es el mismo fuego de tu corazón cuando decide no rendirse jamás.
        Respirá conmigo y sentí cómo mis raíces se entrelazan con toda la selva, dándote la fuerza de la naturaleza argentina.
        Mi flor roja es fuego que renace, y vos también podés renacer más fuerte después de cada adversidad.`,
      },
      cactus: {
        voice: "Voz cálida y contenida como el desierto al amanecer",
        voiceId: process.env.VOICE_ID_CACTUS || "29vD33N1CtxCmqQRPOHJ", // Environment variable or default
        script: `Te saludo en tu sesión con el Cactus Resistente.
        Imagínate en un desierto sereno al amanecer, donde la belleza se encuentra en la simplicidad y la resistencia silenciosa.
        Como el cactus que florece en condiciones adversas, tú también tienes una fuerza interior extraordinaria.
        Respira el aire seco y puro, y siente cómo tu energía contenida es tu mayor fortaleza. Eres sobrio, eres resistente, eres hermoso en tu simplicidad.`,
      },
    }

    // Characteristics modifications
    const characteristicPrompts = {
      child: "Usa un lenguaje simple y juguetón, como si hablaras con un niño curioso",
      stressed: "Enfócate en técnicas de relajación y liberación de tensión",
      sad: "Ofrece palabras de consuelo y esperanza, con tonos cálidos y comprensivos",
      pregnant: "Incluye respiraciones suaves y visualizaciones de protección y nutrición",
      anxious: "Proporciona técnicas de grounding y respiración calmante",
      tired: "Usa un ritmo más lento y relajante, enfocado en el descanso",
      angry: "Incluye técnicas de liberación emocional y transformación de la energía",
      confused: "Ofrece claridad y simplicidad, con pasos claros y directos",
    }

    // Build the complete prompt
    const selectedPlant = plantPrompts[plant as keyof typeof plantPrompts]
    const characteristicInstructions = characteristics
      .map((char: string) => characteristicPrompts[char as keyof typeof characteristicPrompts])
      .join(". ")

    const fullScript = `${selectedPlant.script} 
    
    Instrucciones adicionales: ${characteristicInstructions}.
    
    Termina la sesión con una transición suave de regreso al presente, invitando a abrir los ojos lentamente.`

    // ElevenLabs API call
    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY
    const VOICE_ID = selectedPlant.voiceId

    if (!ELEVENLABS_API_KEY) {
      return NextResponse.json({ error: "ElevenLabs API key not configured" }, { status: 500 })
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: fullScript,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.2,
          use_speaker_boost: true,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`)
    }

    const audioBuffer = await response.arrayBuffer()

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
      },
    })
  } catch (error) {
    console.error("Error generating audio:", error)
    return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 })
  }
}
