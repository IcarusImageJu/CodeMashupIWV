'use client'

import { useCallback, useEffect, useRef } from 'react'

import { useTheme } from '../../_providers/Theme'

const CanvasCrossed = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (canvas && ctx) {
      // Ajuster la taille du canvas pour correspondre à la taille de son conteneur
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      const { width, height } = canvas

      ctx.fillStyle = 'transparent'
      ctx.fillRect(0, 0, width, height)

      // Fonction pour ajouter un pixel blanc de manière aléatoire
      const addRandomWhitePixel = () => {
        const x = Math.floor(Math.random() * (width - 1))
        const y = Math.floor(Math.random() * (height - 1))
        ctx.fillStyle = theme === 'dark' ? '#FFFFFF' : '#000000'
        ctx.fillRect(x, y, 11, 1)
        ctx.fillRect(x + 5, y - 5, 1, 11)
      }

      // Dessiner 10 pixels blancs
      for (let i = 0; i < 10; i++) {
        addRandomWhitePixel()
      }
    }
  }, [theme])

  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Cleanup pour éviter des écouteurs d'événements multiples
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [theme, resizeCanvas])

  return <canvas ref={canvasRef} className={className}></canvas>
}

export default CanvasCrossed
