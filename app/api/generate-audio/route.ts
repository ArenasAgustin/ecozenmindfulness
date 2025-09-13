import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { plant, characteristics } = await request.json()

    if (!plant || !characteristics || characteristics.length === 0) {
      return NextResponse.json({ error: "Plant and characteristics are required" }, { status: 400 })
    }

    // Plant personalities for OpenRouter prompt
    const plantPersonalities = {
      bamboo: {
        name: "Bambú Resiliente",
        personality:
          "Eres un bambú sabio y flexible. Hablas con suavidad pero con fuerza interior. Tu voz es como el viento entre las cañas - fluida y adaptable. Enseñas sobre la flexibilidad sin quebrarse.",
        voiceId: process.env.VOICE_ID_BAMBU || "21m00Tcm4TlvDq8ikWAM",
        metaphors: [
          "Como el bambú, puedes doblarte sin romperte",
          "Tus raíces son profundas, tu crecimiento es constante",
          "El viento te mece pero no te derriba",
        ],
      },
      lotus: {
        name: "Loto Purificador",
        personality:
          "Eres un loto sagrado que emerge del lodo hacia la luz. Tu voz es cristalina y pura como agua tranquila. Hablas de transformación, pureza y renacimiento espiritual.",
        voiceId: process.env.VOICE_ID_LOTO || "EXAVITQu4vr4xnSDxMaL",
        metaphors: [
          "Como el loto, emerges puro de las dificultades",
          "Cada pétalo tuyo es una lección de belleza",
          "Floreces en la superficie pero tus raíces están en lo profundo",
        ],
      },
      ceibo: {
        name: "Ceibo Apasionado",
        personality:
          "Sos el ceibo, flor nacional argentina que renace después de tormentas. Tu voz tiene calor de selva sudamericana y fuerza de quien florece rojo intenso tras adversidad. Hablás con calidez que abraza y motiva, usando el 'vos' argentino.",
        voiceId: process.env.VOICE_ID_CEIBO || "pNInz6obpgDQGcFmaJgB",
        metaphors: [
          "Mi flor roja es fuego que renace",
          "Mis raíces se entrelazan con toda la selva",
          "Florezco más fuerte después de cada tormenta",
          "El fuego de mi flor es el de tu corazón",
        ],
      },
      cactus: {
        name: "Cactus Resistente",
        personality:
          "Eres un cactus del desierto, maestro de la resistencia silenciosa. Tu voz es cálida pero contenida, como el desierto al amanecer. Enseñas sobre la fuerza interior y la belleza en la simplicidad.",
        voiceId: process.env.VOICE_ID_CACTUS || "29vD33N1CtxCmqQRPOHJ",
        metaphors: [
          "Como el cactus, guardas agua para los tiempos difíciles",
          "Tu belleza florece en la adversidad",
          "Eres fuerte en el silencio del desierto",
        ],
      },
    }

    // Characteristics for OpenRouter prompt
    const characteristicInstructions = {
      child:
        "Adapta tu lenguaje para ser simple, juguetón y fácil de entender para un niño. Usa metáforas sencillas y un tono cariñoso.",
      stressed:
        "Enfócate en técnicas de relajación profunda y liberación de tensión. Habla más lento y con pausas relajantes.",
      sad: "Ofrece palabras de consuelo, esperanza y comprensión. Usa un tono cálido y empático que abrace emocionalmente.",
      pregnant:
        "Incluye respiraciones suaves, visualizaciones de protección y conexión con el bebé. Habla con ternura maternal.",
      anxious:
        "Proporciona técnicas de grounding, respiración calmante y afirmaciones de seguridad. Usa un ritmo pausado y tranquilizador.",
      tired:
        "Usa un ritmo muy lento y relajante, enfocado en el descanso y la recuperación de energía. Voz suave y arrulladora.",
      angry:
        "Incluye técnicas de liberación emocional saludable y transformación de la energía. Ayuda a canalizar la ira constructivamente.",
      confused:
        "Ofrece claridad y simplicidad, con instrucciones claras y directas. Ayuda a organizar los pensamientos.",
    }

    const selectedPlant = plantPersonalities[plant as keyof typeof plantPersonalities]
    const characteristicPrompts = characteristics
      .map((char: string) => characteristicInstructions[char as keyof typeof characteristicInstructions])
      .filter(Boolean)
      .join(" ")

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "OpenRouter API key not configured" }, { status: 500 })
    }

    const openRouterPrompt = `
Eres ${selectedPlant.name}. ${selectedPlant.personality}

Metáforas que puedes usar: ${selectedPlant.metaphors.join(", ")}

Características de la persona: ${characteristics.join(", ")}
Instrucciones especiales: ${characteristicPrompts}

Crea una sesión de mindfulness de 3-4 minutos que incluya:
1. Saludo cálido presentándote como ${selectedPlant.name}
2. Técnica de respiración específica para las características mencionadas
3. Visualización usando tus metáforas naturales
4. Afirmaciones positivas relacionadas con tu esencia
5. Cierre suave invitando a regresar al presente

El texto debe ser natural, fluido y sentirse como una conversación íntima. Usa tu personalidad única y adapta el contenido a las características emocionales de la persona.

Devolveme solo el texo a usar, ten en cuenta que eres un profecional en mindfulness
`

    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5-mini",
        messages: [
          {
            role: "user",
            content: openRouterPrompt,
          },
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    })

    if (!openRouterResponse.ok) {
      throw new Error(`OpenRouter API error: ${openRouterResponse.statusText}`)
    }

    const openRouterData = await openRouterResponse.json()
    const generatedText = openRouterData.choices[0]?.message?.content

    if (!generatedText) {
      throw new Error("No text generated from OpenRouter")
    }

    // ElevenLabs API call with generated text
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
        text: generatedText,
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
