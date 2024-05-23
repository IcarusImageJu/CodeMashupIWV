'use client'

import { useEffect, useRef } from "react"
import { useTheme } from "../../_providers/Theme"

const CanvasCrossed = ({className}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
  const {theme} = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (canvas && ctx) {
      // Ajuster la taille du canvas pour correspondre à la taille de son conteneur
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      const { width, height } = canvas
      console.log(width, height) // Cela devrait maintenant correspondre à la taille de l'écran

      // Remplissage du fond en noir
      ctx.fillStyle = 'transparent'
      ctx.fillRect(0, 0, width, height)

      // Fonction pour ajouter un pixel blanc de manière aléatoire
      const addRandomWhitePixel = () => {
        const x = Math.floor(Math.random() * (width - 1))
        const y = Math.floor(Math.random() * (height - 1))
        ctx.fillStyle = theme === 'dark' ? '#FFFFFF' : '#000000'
        ctx.fillRect(x, y, 11, 1)
        ctx.fillRect(x+5, y-5, 1, 11)
      }

      // Dessiner 1000000 pixels blancs
      for (let i = 0; i < 10; i++) {
        addRandomWhitePixel()
      }
    }
  }, [theme])

  return <canvas ref={canvasRef} className={className}></canvas>
}

export default CanvasCrossed