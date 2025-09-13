# EcoZend 🌱

*Una experiencia de mindfulness personalizada con plantas como guías espirituales*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/arenasagustins-projects/v0-hackathon)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/P1RqHHVxLc3)

## 🌿 Descripción

EcoZend es una aplicación innovadora de mindfulness que combina la sabiduría de la naturaleza con tecnología de vanguardia. Los usuarios pueden elegir entre diferentes plantas como guías espirituales (Loto, Bambú, Ceibo y Cactus), seleccionar sus estados emocionales actuales, y recibir sesiones de meditación personalizadas con audio generado por IA.

## ✨ Características Principales

- **🌸 Plantas Guía**: Cuatro plantas únicas con características y personalidades distintas
- **🎭 Estados Emocionales**: Selección de hasta 2 características entre 10 opciones (estresado, triste, ansioso, cansado, enojado, confundido, gratitud, compasión, alegría, esperanza)
- **🎵 Audio Personalizado**: Generación de meditaciones guiadas usando ElevenLabs AI
- **🎶 Música Ambiental**: Cada planta tiene su propia música de fondo única
- **📱 Diseño Responsivo**: Interfaz optimizada para todos los dispositivos
- **🌙 Modo Oscuro**: Soporte completo para tema claro y oscuro

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 14 con App Router
- **UI**: Tailwind CSS + shadcn/ui
- **Audio IA**: ElevenLabs API
- **Iconos**: Lucide React
- **Deployment**: Vercel

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de ElevenLabs (para generación de audio)

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

\`\`\`env
ELEVENLABS_API_KEY=tu_api_key_de_elevenlabs
VOICE_ID_LOTO=voice_id_para_loto
VOICE_ID_BAMBU=voice_id_para_bambu  
VOICE_ID_CEIBO=voice_id_para_ceibo
VOICE_ID_CACTUS=voice_id_para_cactus
OPENROUTER_API_KEY=tu_api_key_de_openrouter
\`\`\`

### Comandos

\`\`\`bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
\`\`\`

## 🎯 Uso

1. **Selecciona tu Planta Guía**: Elige entre Loto, Bambú, Ceibo o Cactus
2. **Define tu Estado**: Selecciona hasta 2 características que describan cómo te sientes
3. **Inicia tu Sesión**: Presiona "Comenzar Sesión de Mindfulness"
4. **Disfruta**: Escucha tu meditación personalizada con música ambiental

## 🌱 Plantas Disponibles

- **🪷 Loto**: Símbolo de pureza y renacimiento espiritual
- **🎋 Bambú**: Representa flexibilidad y resistencia
- **🌳 Ceibo**: Árbol sagrado que simboliza la conexión con la tierra
- **🌵 Cactus**: Emblema de resistencia y adaptabilidad

## 🎨 Características de Diseño

- Paleta de colores naturales y relajantes
- Animaciones suaves y transiciones fluidas
- Tipografía optimizada para legibilidad
- Interfaz minimalista centrada en la experiencia del usuario

## 📱 Deployment

La aplicación está desplegada automáticamente en Vercel. Cualquier cambio en la rama principal se despliega automáticamente.

**URL de Producción**: [https://vercel.com/arenasagustins-projects/v0-hackathon](https://vercel.com/arenasagustins-projects/v0-hackathon)

## 🤝 Contribución

Este proyecto fue desarrollado como parte de un hackathon. Para continuar el desarrollo:

1. Visita el proyecto en v0: [https://v0.app/chat/projects/P1RqHHVxLc3](https://v0.app/chat/projects/P1RqHHVxLc3)
2. Los cambios se sincronizan automáticamente con este repositorio
3. Vercel despliega automáticamente desde este repositorio

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

*Desarrollado con 💚 para conectar a las personas con la naturaleza y el mindfulness*
